import "./Header.css";
import logo from "../../Assets/argentBankLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="container-header">
       <Link to="/">
      <div>
        <img src={logo} alt='logo du site' className="header-logo" />
      </div>
      </Link>
      <Link to="/Sign-In">
      <div className="container-header-sign">
        <FontAwesomeIcon icon={faCircleUser} className="font-header"/>
        <p className="link-header">Sign In</p>
      </div>
      </Link>
    </header>
  );
}
