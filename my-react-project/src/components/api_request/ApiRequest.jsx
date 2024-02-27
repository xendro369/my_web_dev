// ApiRequest.jsx
import React, { useState } from 'react';

const ApiRequest = ({ url, method, body, onSuccess, onError, children }) => {
  const [loading, setLoading] = useState(false);

  const handleApiRequest = async () => {
    try {
      setLoading(true);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data);
      } else {
        onError(data);
      }
    } catch (error) {
      console.error('Error during API request:', error);
      onError({ status: false, message: 'An error occurred during the request.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleApiRequest}
      disabled={loading}
      className="w-full py-2 px-4 text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default ApiRequest;
