import { useState, useEffect } from "react";

const useApi = (url, token, method, body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Token is missing");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDg2YzdkZjJmNTI2MDNkY2UxNGM5OSIsImlhdCI6MTczNjQ2MjkxNSwiZXhwIjoxNzM2NTQ5MzE1fQ.xLJT2lSs5aTqsbRxV_LJQISWqNPGT7Uxt_ahdJ3-AVE",
          },
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

    fetchData();
  }, [url, token, method, body]);

  return { data, loading, error };
};

export default useApi;







