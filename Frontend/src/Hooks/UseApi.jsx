import { useState, useEffect } from "react";

const useApi = (url, token, method, body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Créer les headers de manière conditionnelle
        const headers = {
          "Content-Type": "application/json",
        };

        // Ajouter le token dans les headers uniquement s'il est défini
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
          method,
          headers,
          ...(body && { body: JSON.stringify(body) }), // Ajouter le body si défini
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

    fetchData(); // Lancer la requête
  }, [url, token, method, body]); // Déclencher l'effet si ces valeurs changent

  return { data, loading, error };
};

export default useApi;
