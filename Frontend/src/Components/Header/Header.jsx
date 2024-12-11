import { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../Assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header() {
  const [hasToken, setHasToken] = useState(localStorage.getItem("token")); // Token local
  const [profilData, setProfilData] = useState(
    JSON.parse(localStorage.getItem("profilData"))
  ); // Profil utilisateur

  // Fonction pour gérer la déconnexion
  function SignOut() {
    localStorage.removeItem("token"); // Supprimer le token
    localStorage.removeItem("profilData"); // Supprimer le profil
    setHasToken(null); // Réinitialiser le token
    setProfilData(null); // Réinitialiser le profil
  }

  useEffect(() => {
    if (hasToken) {
      const data = JSON.parse(localStorage.getItem("profilData"));
      setProfilData(data);
    } else {
      setProfilData(null);
    }
  }, [hasToken]); // Mise à jour lorsque hasToken change

  return (
    <header className="container-header">
      <Link to="/">
        <div>
          <img src={logo} alt="logo du site" className="header-logo" />
        </div>
      </Link>

      {hasToken ? (
        <div className="container-header-sign-out">
          <FontAwesomeIcon icon={faCircleUser} className="font-header" />
          <Link to="/User">
            <p className="userName-Header">{profilData?.firstName}</p>
          </Link>
          <FontAwesomeIcon icon={faRightToBracket} />
          <Link to="/">
            <p className="link-header" onClick={SignOut}>
              Sign Out
            </p>
          </Link>
        </div>
      ) : (
        <div className="container-header-sign">
          <FontAwesomeIcon icon={faCircleUser} className="font-header" />
          <Link to="/Sign-In">
            <p className="link-header">Sign In</p>
          </Link>
        </div>
      )}
    </header>
  );
}
