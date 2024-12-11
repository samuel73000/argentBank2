import { useEffect, useState } from "react";
import "./User.css";
import TransactionUser from "../../Components/TransactionUser/TransactionUser";

export default function User() {
  const [profilData, setProfilData] = useState(JSON.parse(localStorage.getItem("profilData"))); // État pour le profil utilisateur
  const hasToken = localStorage.getItem("token"); // Récupérer le token dans le localStorage

  const [editName , setEditName] = useState(false)

  // call API
  useEffect(() => {
    const fetchData = async () => {
      if (!hasToken) {
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${hasToken}`, // On envoie le token
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          // Mettre à jour localStorage et l'état profilData
          localStorage.setItem("profilData", JSON.stringify(result.body));
          setProfilData(result.body);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    };
    fetchData();
  }, [hasToken]);


  return (
    <section className='section-user'>
      <div className='container-title-user'>
        <h1 className='title-user'>
          Welcome back <br />
          <span>{profilData?.firstName}</span>{" "}
          <span>{profilData?.lastName}</span>!
        </h1>
        <button className='btn-edit-user' onClick={() => setEditName(!editName)}>Edit Name</button>
        {editName &&
           <div>

           </div>
          }
      </div>

      <div className='container-transaction-user'>
        <TransactionUser
          texte1='Argent Bank Checking (x8349)'
          texte2='Available Balance'
          title='$2,082.79'
        />
        <TransactionUser
          texte1='Argent Bank Savings (x6712)'
          texte2='Available Balance'
          title='$10,928.42'
        />
        <TransactionUser
          texte1='Argent Bank Credit Card (x8349)'
          texte2='Current Balance'
          title='$184.30'
        />
      </div>
    </section>
  );
}
