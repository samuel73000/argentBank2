import { useState } from "react";
import "./Header.css";
import logo from "../../Assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {
  const userName = useSelector((state) => state.user.userName);
  const [hasToken, setHasToken] = useState(localStorage.getItem("token")); // Token local


  // Fonction pour gérer la déconnexion
  function SignOut() {
    localStorage.removeItem("token"); // Supprimer le token
    localStorage.removeItem("profilData"); // Supprimer le profil
    setHasToken(null); // Réinitialiser le token
  
  }

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
            <p className="userName-Header">{userName}</p>
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
