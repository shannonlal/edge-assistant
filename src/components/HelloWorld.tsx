import React, { useState, useEffect } from 'react';

interface HelloWorldData {
  message: string;
  timestamp: string;
}

export const HelloWorld: React.FC = () => {
  const [helloData, setHelloData] = useState<HelloWorldData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHelloWorld = async () => {
      try {
        const response = await fetch('/api/hello');

        if (!response.ok) {
          throw new Error('Failed to fetch Hello World data');
        }

        const data: HelloWorldData = await response.json();
        setHelloData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchHelloWorld();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hello World Endpoint</h2>
      {helloData && (
        <div>
          <p className="text-lg mb-2">Message: {helloData.message}</p>
          <p className="text-sm text-gray-600">
            Timestamp: {new Date(helloData.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
