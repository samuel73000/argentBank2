import "./Header.css";
import logo from "../../Assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Import des hooks React

export default function Header() {
  // État pour suivre si un token est présent dans le localStorage
  const [hasToken, setHasToken] = useState(localStorage.getItem("token"));

  // Fonction pour gérer la déconnexion
  function SignOut() {
    localStorage.removeItem("token"); // Supprimer le token du localStorage
    setHasToken(null); // Mettre à jour l'état pour forcer le rerendu
  }

  // useEffect pour réagir à tout changement dans le localStorage
  useEffect(() => {
    setHasToken(localStorage.getItem("token"));
  }, []); // Cette dépendance vide [] signifie que l'effet est exécuté une seule fois au montage du composant

  return (
    <header className="container-header">
      <Link to="/">
        <div>
          <img src={logo} alt="logo du site" className="header-logo" onClick={SignOut} />
        </div>
      </Link>

      <div className="container-header-sign">
        <FontAwesomeIcon icon={faCircleUser} className="font-header" />
        {hasToken ? (
          <Link to="/">
            <p className="link-header" onClick={SignOut}>
              Sign Out
            </p>
          </Link>
        ) : (
          <Link to="/Sign-In">
            <p className="link-header">Sign In</p>
          </Link>
        )}
      </div>
    </header>
  );
}



