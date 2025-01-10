import { useEffect, useState } from "react";
import "./User.css";
import TransactionUser from "../../Components/TransactionUser/TransactionUser";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../../Redux/Features/UserSlice";
import useApi from "../../Hooks/UseApi";

export default function User() {
  const token = localStorage.getItem("token"); // Récupérer le token dans le localStorage
  const [editName, setEditName] = useState(false);
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.user.userName);// recupere le nom de l'utilisateur dans le store
  const [userNamePut, setUserNamePut] = useState(userName || "");

  //////// Hook pour récupérer les données utilisateur (GET)
  const { data: userData, loading } = useApi(
    "http://localhost:3001/api/v1/user/profile",
    token,
    "GET"
  );

  useEffect(() => {
    if (userData) {
      dispatch(setUserName(userData.userName)); // on mais a jour le store avec le nom de l'utilisateur
    }
  }, [userData, dispatch]);

  //////// Hook pour mettre à jour les données utilisateur (PUT)
  const [putData, setPutData] = useState(null);
  const { data: updateResponse, loading: loadingPut } = useApi(
    putData?.url,
    putData?.token,
    "PUT",
    putData?.body
  );

  const handleInputChange = (e) => {
    setUserNamePut(e.target.value);
  };

  const handleSave = () => {
    if (!token) {
      console.error("Token manquant !");
      return;
    }

    setPutData({
      url: "http://localhost:3001/api/v1/user/profile",
      token: token,
      body: { userName: userNamePut },
    });

    setEditName(false);
  };

  useEffect(() => {
    if (updateResponse) {
      console.log("Mise à jour réussie :", updateResponse);
      dispatch(setUserName(userNamePut));
    }
  }, [updateResponse, dispatch, userNamePut]);

  if (loading || loadingPut) return <p>Chargement...</p>;
  if (!userData) return <p>Aucune donnée disponible.</p>;
  return (
    <section className="section-user">
      {editName ? (
        <div className="container-title-input-btn-user">
          <h1 className="title-user">
            Welcome back <br />
          </h1>
          <div className="container-input-user">
            <input
              type="text"
              className="input-edit-user"
              placeholder={userName}
              value={userNamePut}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="input-edit-user"
              placeholder={userData?.firstName}
              disabled
            />
            <input
              type="text"
              className="input-edit-user"
              placeholder={userData?.lastName}
              disabled
            />
          </div>
          <div className="container-btn-user">
            <button
              className="btn-edit-user"
              type="submit"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn-edit-user"
              onClick={() => setEditName(!editName)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="title-user">
            Welcome back <br />
            <span>{userData?.firstName}</span> <span>{userData?.lastName}</span>!
          </h1>
          <button
            className="btn-edit-user"
            onClick={() => setEditName(!editName)}
          >
            Edit Name
          </button>
        </div>
      )}

      <div className="container-transaction-user">
        <TransactionUser
          texte1="Argent Bank Checking (x8349)"
          texte2="Available Balance"
          title="$2,082.79"
        />
        <TransactionUser
          texte1="Argent Bank Savings (x6712)"
          texte2="Available Balance"
          title="$10,928.42"
        />
        <TransactionUser
          texte1="Argent Bank Credit Card (x8349)"
          texte2="Current Balance"
          title="$184.30"
        />
      </div>
    </section>
  );
}






















