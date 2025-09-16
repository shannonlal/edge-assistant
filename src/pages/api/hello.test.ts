import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './hello';

// Mock utilities for Next.js API objects
const createMockRequest = (method = 'GET'): Partial<NextApiRequest> => {
  const mockRequest = {
    method,
    on: vi.fn(),
  };
  return mockRequest;
};

const createMockResponse = (): Partial<NextApiResponse> => {
  const mockResponse = {
    writeHead: vi.fn(),
    write: vi.fn(),
    setHeader: vi.fn(),
    status: vi.fn().mockReturnThis(),
    end: vi.fn(),
    on: vi.fn(),
  };
  return mockResponse;
};

describe('SSE Hello API Handler', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Use fake timers for deterministic testing
    vi.useFakeTimers();

    // Mock console.log to avoid test output noise
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Create fresh mocks for each test
    mockReq = createMockRequest();
    mockRes = createMockResponse();
  });

  afterEach(() => {
    // Clean up timers and mocks
    vi.useRealTimers();
    vi.clearAllMocks();
    consoleLogSpy.mockRestore();
  });

  describe('HTTP Method Validation', () => {
    it('should allow GET requests', () => {
      mockReq = createMockRequest('GET');

      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Should not call status or end for valid GET request
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.end).not.toHaveBeenCalled();

      // Should set up SSE headers
      expect(mockRes.writeHead).toHaveBeenCalledWith(
        200,
        expect.objectContaining({
          'Content-Type': 'text/event-stream',
        })
      );
    });

    it('should reject POST requests with 405', () => {
      mockReq = createMockRequest('POST');

      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(mockRes.setHeader).toHaveBeenCalledWith('Allow', ['GET']);
      expect(mockRes.status).toHaveBeenCalledWith(405);
      expect(mockRes.end).toHaveBeenCalledWith('Method POST Not Allowed');
    });

    it('should reject PUT requests with 405', () => {
      mockReq = createMockRequest('PUT');

      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(mockRes.setHeader).toHaveBeenCalledWith('Allow', ['GET']);
      expect(mockRes.status).toHaveBeenCalledWith(405);
      expect(mockRes.end).toHaveBeenCalledWith('Method PUT Not Allowed');
    });
  });

  describe('SSE Headers Configuration', () => {
    it('should set correct SSE headers', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
        'Access-Control-Allow-Methods': 'GET',
      });
    });
  });

  describe('Initial Data Send', () => {
    it('should send initial connection message immediately', () => {
      const mockDate = new Date('2024-01-01T00:00:00.000Z');
      vi.setSystemTime(mockDate);

      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      const expectedData = {
        message: 'Hello World - Connected!',
        timestamp: '2024-01-01T00:00:00.000Z',
      };

      expect(mockRes.write).toHaveBeenCalledWith(`data: ${JSON.stringify(expectedData)}\n\n`);
    });

    it('should log initial connection and data', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(consoleLogSpy).toHaveBeenCalledWith('SSE connection request received');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Sending initial data:',
        expect.objectContaining({
          message: 'Hello World - Connected!',
          timestamp: expect.any(String),
        })
      );
    });
  });

  describe('Periodic Data Updates', () => {
    it('should send periodic updates every 5 seconds', () => {
      const mockDate = new Date('2024-01-01T00:00:00.000Z');
      vi.setSystemTime(mockDate);

      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Clear the initial write call
      vi.clearAllMocks();

      // Advance time by 5 seconds
      vi.advanceTimersByTime(5000);

      const expectedData = {
        message: 'Hello World',
        timestamp: '2024-01-01T00:00:05.000Z', // Time advances by 5 seconds
      };

      expect(mockRes.write).toHaveBeenCalledWith(`data: ${JSON.stringify(expectedData)}\n\n`);
      expect(consoleLogSpy).toHaveBeenCalledWith('Sending periodic data:', expectedData);
    });

    it('should send multiple periodic updates', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Clear initial calls
      vi.clearAllMocks();

      // Advance time by 15 seconds (3 intervals)
      vi.advanceTimersByTime(15000);

      // Should have been called 3 times (at 5s, 10s, 15s)
      expect(mockRes.write).toHaveBeenCalledTimes(3);
    });
  });

  describe('Heartbeat Functionality', () => {
    it('should send heartbeat every 30 seconds', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Clear initial calls
      vi.clearAllMocks();

      // Advance time by 30 seconds
      vi.advanceTimersByTime(30000);

      expect(mockRes.write).toHaveBeenCalledWith(': heartbeat\n\n');
    });

    it('should send multiple heartbeats', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Clear initial calls
      vi.clearAllMocks();

      // Advance time by 90 seconds (3 heartbeat intervals)
      vi.advanceTimersByTime(90000);

      // Count heartbeat calls (filter out periodic data calls)
      const heartbeatCalls = (mockRes.write as ReturnType<typeof vi.fn>).mock.calls.filter(
        call => call[0] === ': heartbeat\n\n'
      );

      expect(heartbeatCalls).toHaveLength(3);
    });
  });

  describe('Connection Cleanup', () => {
    it('should set up event listeners for cleanup', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Should register event listeners
      expect(mockReq.on).toHaveBeenCalledWith('close', expect.any(Function));
      expect(mockReq.on).toHaveBeenCalledWith('end', expect.any(Function));
      expect(mockRes.on).toHaveBeenCalledWith('error', expect.any(Function));
    });

    it('should clean up intervals on request close', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Get the close event handler
      const closeHandler = (mockReq.on as ReturnType<typeof vi.fn>).mock.calls.find(
        call => call[0] === 'close'
      )?.[1];

      expect(closeHandler).toBeDefined();

      // Trigger the close event
      closeHandler();

      expect(consoleLogSpy).toHaveBeenCalledWith('Request closed, cleaning up interval');

      // Advance time to verify intervals are cleared
      vi.clearAllMocks();
      vi.advanceTimersByTime(10000);

      // Should not send any more data after cleanup
      expect(mockRes.write).not.toHaveBeenCalled();
    });

    it('should clean up intervals on request end', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Get the end event handler
      const endHandler = (mockReq.on as ReturnType<typeof vi.fn>).mock.calls.find(
        call => call[0] === 'end'
      )?.[1];

      expect(endHandler).toBeDefined();

      // Trigger the end event
      endHandler();

      expect(consoleLogSpy).toHaveBeenCalledWith('Request ended, cleaning up interval');
    });

    it('should handle response errors and clean up', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Get the error event handler
      const errorHandler = (mockRes.on as ReturnType<typeof vi.fn>).mock.calls.find(
        call => call[0] === 'error'
      )?.[1];

      expect(errorHandler).toBeDefined();

      // Trigger an error
      const testError = new Error('Connection error');
      errorHandler(testError);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Response error, cleaning up interval:',
        testError
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle write errors during periodic updates', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Clear initial successful calls
      vi.clearAllMocks();

      // Mock write to throw an error on the next call (periodic update)
      (mockRes.write as ReturnType<typeof vi.fn>).mockImplementationOnce(() => {
        throw new Error('Write failed');
      });

      // Advance time to trigger periodic update
      vi.advanceTimersByTime(5000);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Client disconnected, cleaning up interval:',
        expect.any(Error)
      );
    });

    it('should handle write errors during heartbeat', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Mock write to throw error on heartbeat
      (mockRes.write as ReturnType<typeof vi.fn>).mockImplementation(data => {
        if (data === ': heartbeat\n\n') {
          throw new Error('Heartbeat failed');
        }
      });

      // Clear initial calls
      vi.clearAllMocks();

      // Advance time to trigger heartbeat
      vi.advanceTimersByTime(30000);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Heartbeat failed, cleaning up:',
        expect.any(Error)
      );
    });
  });

  describe('Data Format Validation', () => {
    it('should format initial data correctly as SSE', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      const writeCall = (mockRes.write as ReturnType<typeof vi.fn>).mock.calls[0][0];

      // Should start with "data: " and end with "\n\n"
      expect(writeCall).toMatch(/^data: /);
      expect(writeCall).toMatch(/\n\n$/);

      // Should contain valid JSON
      const jsonPart = writeCall.replace(/^data: /, '').replace(/\n\n$/, '');
      const parsedData = JSON.parse(jsonPart);

      expect(parsedData).toEqual({
        message: 'Hello World - Connected!',
        timestamp: expect.any(String),
      });
    });

    it('should format periodic data correctly as SSE', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Clear initial call
      vi.clearAllMocks();

      // Trigger periodic update
      vi.advanceTimersByTime(5000);

      const writeCall = (mockRes.write as ReturnType<typeof vi.fn>).mock.calls[0][0];

      // Should follow SSE format
      expect(writeCall).toMatch(/^data: /);
      expect(writeCall).toMatch(/\n\n$/);

      // Should contain valid JSON with correct structure
      const jsonPart = writeCall.replace(/^data: /, '').replace(/\n\n$/, '');
      const parsedData = JSON.parse(jsonPart);

      expect(parsedData).toEqual({
        message: 'Hello World',
        timestamp: expect.any(String),
      });
    });

    it('should format heartbeat correctly as SSE comment', () => {
      handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Clear initial calls
      vi.clearAllMocks();

      // Trigger heartbeat
      vi.advanceTimersByTime(30000);

      // Find heartbeat call
      const heartbeatCall = (mockRes.write as ReturnType<typeof vi.fn>).mock.calls.find(
        call => call[0] === ': heartbeat\n\n'
      );

      expect(heartbeatCall).toBeDefined();
      expect(heartbeatCall![0]).toBe(': heartbeat\n\n');
    });
  });
});
