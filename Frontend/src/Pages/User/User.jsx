import { useEffect, useState } from "react";
import "./User.css";
import TransactionUser from "../../Components/TransactionUser/TransactionUser";
import { useDispatch } from "react-redux";
import { setUserName } from "../../Redux/Features/UserSlice";
import { useSelector } from "react-redux";
import useApi from "../../Hooks/UseApi";

export default function User() {
  const hasToken = localStorage.getItem("token"); // Récupérer le token dans le localStorage

  const [editName, setEditName] = useState(false);
  const dispatch = useDispatch();

  
  //  on recupere la valeur du userName daans le store pour l'afficher dans l'input
  const userName = useSelector((state) => state.user.userName);
  //  on recupere la valeur de l'input userName pour la mettre à jour dans le store
  const [userNamePut, setUserNamePut] = useState(userName || ""); 



  //////// Utilise le hook personnalisé pour l'appel API
  const { data, loading, error } = useApi(
    "http://localhost:3001/api/v1/user/profile",
    hasToken
  );

  useEffect(() => {
    if (data) {
      dispatch(setUserName(data.userName)); // Mettre à jour le store Redux avec le nom d'utilisateur
    }
  }, [data, dispatch]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  console.log(data);



  /////////////// call API changement de UserName

  const handleInputChange = (e) => {
    setUserNamePut(e.target.value);
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
          body: JSON.stringify({ userName: userNamePut }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Mise à jour réussie :", result);

        setEditName(false); // Fermer l'édition
        dispatch(setUserName(userNamePut)); // Mettre à jour le store Redux
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;


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
              placeholder={userName}
              value={userNamePut} // Valeur de l'input liée à l'état
              onChange={handleInputChange} // Mettre à jour l'état à chaque changement
            />
            <input
              type='text'
              className='input-edit-user'
              placeholder={data.firstName}
              disabled
            />
            <input
              type='text'
              className='input-edit-user'
              placeholder={data.lastName}
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
            <span>{data?.firstName}</span> <span>{data?.lastName}</span>!
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
