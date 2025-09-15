import React, { useState, useEffect, useRef, useCallback } from 'react';

interface HelloWorldData {
  message: string;
  timestamp: string;
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

export const HelloWorld: React.FC = () => {
  const [helloData, setHelloData] = useState<HelloWorldData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [retryCount, setRetryCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 10;
  const baseDelay = 1000; // 1 second
  const maxDelay = 30000; // 30 seconds

  // Calculate exponential backoff delay
  const getRetryDelay = useCallback((retryAttempt: number): number => {
    const delay = Math.min(baseDelay * Math.pow(2, retryAttempt), maxDelay);
    // Add jitter to prevent thundering herd
    return delay + Math.random() * 1000;
  }, []);

  // Connect to SSE endpoint
  const connect = useCallback(() => {
    // Clean up existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    setConnectionStatus('connecting');
    setError(null);

    try {
      const eventSource = new EventSource('/api/hello');
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE connection opened');
        setConnectionStatus('connected');
        setRetryCount(0);
        setError(null);
      };

      eventSource.onmessage = event => {
        console.log('Raw SSE event received:', event);
        console.log('Event data:', event.data);
        try {
          const data: HelloWorldData = JSON.parse(event.data);
          console.log('Parsed data:', data);
          setHelloData(data);
          setLastUpdateTime(new Date().toISOString());
          setConnectionStatus('connected');
          console.log('Message Received and State Updated', data);
          setError(null);
        } catch (parseError) {
          console.error('Failed to parse SSE data:', parseError);
          console.error('Raw event data was:', event.data);
          setError('Failed to parse server data');
        }
      };

      eventSource.onerror = event => {
        console.error('SSE connection error:', event);
        eventSource.close();

        if (retryCount < maxRetries) {
          setConnectionStatus('reconnecting');
          const delay = getRetryDelay(retryCount);

          console.log(`Reconnecting in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);

          reconnectTimeoutRef.current = setTimeout(() => {
            setRetryCount(prev => prev + 1);
            connect();
          }, delay);
        } else {
          setConnectionStatus('disconnected');
          setError(`Connection failed after ${maxRetries} attempts`);
        }
      };
    } catch (connectionError) {
      console.error('Failed to create EventSource:', connectionError);
      setConnectionStatus('disconnected');
      setError('Failed to establish connection');
    }
  }, [retryCount, getRetryDelay, maxRetries]);

  // Manual reconnect function
  const reconnect = useCallback(() => {
    setRetryCount(0);
    connect();
  }, [connect]);

  // Initialize connection on mount
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  // Connection status indicator component
  const ConnectionIndicator = () => {
    const getStatusColor = () => {
      switch (connectionStatus) {
        case 'connected':
          return 'bg-green-500';
        case 'connecting':
        case 'reconnecting':
          return 'bg-yellow-500';
        case 'disconnected':
          return 'bg-red-500';
        default:
          return 'bg-gray-500';
      }
    };

    const getStatusText = () => {
      switch (connectionStatus) {
        case 'connected':
          return 'Live';
        case 'connecting':
          return 'Connecting...';
        case 'reconnecting':
          return `Reconnecting... (${retryCount}/${maxRetries})`;
        case 'disconnected':
          return 'Disconnected';
        default:
          return 'Unknown';
      }
    };

    return (
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-3 h-3 rounded-full ${getStatusColor()} ${
            connectionStatus === 'connecting' || connectionStatus === 'reconnecting'
              ? 'animate-pulse'
              : ''
          }`}
        ></div>
        <span className="text-sm font-medium">{getStatusText()}</span>
        {connectionStatus === 'disconnected' && (
          <button
            onClick={reconnect}
            className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hello World Endpoint (SSE)</h2>

      <ConnectionIndicator />

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
          {lastUpdateTime && (
            <div className="text-sm mt-1">
              Last successful update: {new Date(lastUpdateTime).toLocaleString()}
            </div>
          )}
        </div>
      )}

      {helloData ? (
        <div className="space-y-2">
          <p className="text-lg mb-2">
            <strong>Message:</strong> {helloData.message}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Timestamp:</strong> {new Date(helloData.timestamp).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Updates automatically every 5 seconds</p>
        </div>
      ) : (
        connectionStatus === 'connecting' && (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span>Establishing connection...</span>
          </div>
        )
      )}
    </div>
  );
};
