import { useEffect, useState } from "react";
import "./User.css";
import TransactionUser from "../../Components/TransactionUser/TransactionUser";

export default function User() {
  const [profilData, setProfilData] = useState(
    JSON.parse(localStorage.getItem("profilData"))
  ); // État pour le profil utilisateur
  const hasToken = localStorage.getItem("token"); // Récupérer le token dans le localStorage

  const [editName, setEditName] = useState(false);

  /////////////////// call API recuparation de data
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

  // console.log(profilData);
  // console.log(editName)




 /////////////// call API changement de UserName

//  on recupere la valeur de l'input userName 
  const [userName, setUserName] = useState(profilData?.userName || ""); // Initialiser avec profilData si disponible

  const handleInputChange = (e) => {
    setUserName(e.target.value); // on detecte si l'input userName a chnager 
  };
 
  const fetchPutUser = async () => {
    if (!hasToken) {
      console.error("Token manquant !");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${hasToken}`, 
          },
          body: JSON.stringify({
            userName: userName, // on envoie la nouvelle valeur de userName 
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Réponse réussie :", result);
        setEditName(!editName);
      } else {
        console.error(
          "Erreur dans la réponse :",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <section className='section-user'>
      {editName ? (
        <div className='container-title-input-btn-user'>
          <h1 className='title-user'>
            Welcome back <br />
          </h1>
          <div className='container-input-user'>
            <input
              type='text'
              className='input-edit-user'
              placeholder={profilData?.userName}
              value={userName} // Valeur de l'input liée à l'état
              onChange={handleInputChange} // Mettre à jour l'état à chaque changement
            />
            <input
              type='text'
              className='input-edit-user'
              placeholder={profilData?.firstName}
              disabled
            />
            <input
              type='text'
              className='input-edit-user'
              placeholder={profilData?.lastName}
              disabled
            />
          </div>
          <div className='container-btn-user'>
            <button
              className='btn-edit-user'
              type='submit'
              onClick={fetchPutUser}>
              Save
            </button>
            <button
              className='btn-edit-user'
              onClick={() => setEditName(!editName)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className='title-user'>
            Welcome back <br />
            <span>{profilData?.firstName}</span>{" "}
            <span>{profilData?.lastName}</span>!
          </h1>
          <button
            className='btn-edit-user'
            onClick={() => setEditName(!editName)}>
            Edit Name
          </button>
        </div>
      )}

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
