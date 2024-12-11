import "./Header.css";
import logo from "../../Assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react"; // Import des hooks React

export default function Header() {
  // État pour suivre si un token est présent dans le localStorage
  const [hasToken, setHasToken] = useState(localStorage.getItem("token"));

  // Fonction pour gérer la déconnexion
  function SignOut() {
    localStorage.removeItem("token"); // Supprimer le token du localStorage
    setHasToken(null); // Mettre à jour l'état pour forcer le rerendu
  }

  return (
    <header className='container-header'>
      <Link to='/'>
        <div>
          <img src={logo} alt='logo du site' className='header-logo' />
        </div>
      </Link>

      {hasToken ? (
        <div className='container-header-sign-out'>
          <FontAwesomeIcon icon={faCircleUser} className='font-header' />
          <Link to='/User'>
            <p className='userName-Header'>Tony</p>
          </Link>
          <FontAwesomeIcon icon={faRightToBracket} />
          <Link to='/'>
            <p></p>
            <p className='link-header' onClick={SignOut} >
              Sign Out
            </p>
          </Link>
        </div>
      ) : (
        <div className='container-header-sign'>
          <FontAwesomeIcon icon={faCircleUser} className='font-header' />
          <Link to='/Sign-In'>
            <p className='link-header'>Sign In</p>
          </Link>
        </div>
      )}
    </header>
  );
}
