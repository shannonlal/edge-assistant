import type { NextApiRequest, NextApiResponse } from 'next';

type HelloWorldResponse = {
  message: string;
  timestamp: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<HelloWorldResponse>) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    // Return Hello World message with current timestamp
    res.status(200).json({
      message: 'Hello World',
      timestamp: new Date().toISOString(),
    });
  } else {
    // Handle any non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
