// import { useState, useEffect } from 'react';

// const useApi = (url, method = 'GET', token = null, body = null) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const options = {
//           method: method,  // La méthode HTTP dynamique
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),  // Si un token est fourni, l'ajouter
//           },
//           ...(body && { body: JSON.stringify(body) }),  // Si un corps est fourni, l'ajouter
//         };

//         const response = await fetch(url, options);

//         if (!response.ok) {
//           throw new Error(`Erreur: ${response.statusText}`);
//         }

//         const result = await response.json();
//         setData(result.body);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url, method, token, body]);  // Déclenche le hook lorsque ces paramètres changent

//   return { data, loading, error };
// };

// export default useApi;
