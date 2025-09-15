import type { NextApiRequest, NextApiResponse } from 'next';

type HelloWorldData = {
  message: string;
  timestamp: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  console.log('SSE connection request received');

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
    'Access-Control-Allow-Methods': 'GET',
  });

  // Send initial connection event immediately
  const initialData: HelloWorldData = {
    message: 'Hello World - Connected!',
    timestamp: new Date().toISOString(),
  };

  console.log('Sending initial data:', initialData);
  res.write(`data: ${JSON.stringify(initialData)}\n\n`);

  // Set up interval to send updates every 5 seconds
  const interval = setInterval(() => {
    const data: HelloWorldData = {
      message: 'Hello World',
      timestamp: new Date().toISOString(),
    };

    try {
      console.log('Sending periodic data:', data);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (error) {
      // Client disconnected, clean up
      console.log('Client disconnected, cleaning up interval:', error);
      clearInterval(interval);
    }
  }, 5000);

  // Clean up on client disconnect
  req.on('close', () => {
    console.log('Request closed, cleaning up interval');
    clearInterval(interval);
  });

  req.on('end', () => {
    console.log('Request ended, cleaning up interval');
    clearInterval(interval);
  });

  // Handle connection errors
  res.on('error', error => {
    console.log('Response error, cleaning up interval:', error);
    clearInterval(interval);
  });

  // Keep connection alive with heartbeat
  const heartbeat = setInterval(() => {
    try {
      res.write(': heartbeat\n\n');
    } catch (error) {
      console.log('Heartbeat failed, cleaning up:', error);
      clearInterval(heartbeat);
      clearInterval(interval);
    }
  }, 30000); // Send heartbeat every 30 seconds

  // Clean up heartbeat on disconnect
  req.on('close', () => {
    clearInterval(heartbeat);
  });
}
