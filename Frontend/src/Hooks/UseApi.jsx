/* eslint-disable */

import { useState, useEffect } from "react";

const useApi = (url, token, method, body = null, executeImmediately = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldExecute, setShouldExecute] = useState(executeImmediately);

  const execute = async () => {
    setLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(url, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const result = await response.json();
    
      setData(result.body);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldExecute) {
      execute();
    }
  }, [shouldExecute]);

  return { data, loading, error, execute };
};

export default useApi;







