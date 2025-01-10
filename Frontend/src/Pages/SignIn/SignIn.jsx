import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../Hooks/UseApi";

export default function SignIn() {
  // States pour la gestion des formulaires
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);

  const navigate = useNavigate();

  // Charger l'email depuis le localStorage si disponible
  useState(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // API Hooks
  const { data: signInData } = useApi(
    "http://localhost:3001/api/v1/user/login",
    null,
    "POST",
    {
      email,
      password,
    }
  );

  const { data: signUpData } = useApi(
    "http://localhost:3001/api/v1/user/signup",
    null,
    "POST",
    {
      email,
      password,
      firstName,
      lastName,
      userName,
    }
  );

  // Soumission du formulaire Sign In
  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    if (signInData) {
      localStorage.setItem("token", signInData.token);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/User");
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  };

  // Soumission du formulaire Sign Up
  const handleSubmitSignUp = (e) => {
    e.preventDefault();

    if (signUpData) {
      setModalSignUp(false);
    }
  };

  return modalSignUp ? (
    ////////// Partie Sign Up //////////
    <section className='section-SignIn'>
      <div className='container-SignIn'>
        <div className='container-title-SignIn'>
          <FontAwesomeIcon icon={faCircleUser} className='icon-SignIn' />
          <h1 className='title-SignIn'>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmitSignUp}>
          <label htmlFor='email' className='label-SignIn'>
            Email
          </label>
          <input
            type='text'
            id='email'
            className='input-SignIn'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password' className='label-SignIn'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='input-SignIn'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor='firstName' className='label-SignIn'>
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            className='input-SignIn'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor='lastName' className='label-SignIn'>
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            className='input-SignIn'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor='userName' className='label-SignIn'>
            User Name
          </label>
          <input
            type='text'
            id='userName'
            className='input-SignIn'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <button type='submit' className='btn-submit-SignIn'>
            Confirm
          </button>
          <button
            type='button'
            className='btn-submit-SignIn'
            onClick={() => setModalSignUp(false)}>
            Cancel
          </button>
        </form>
      </div>
    </section>
  ) : (
    ////////// Partie Sign In //////////
    <section className='section-SignIn'>
      <div className='container-SignIn'>
        <div className='container-title-SignIn'>
          <FontAwesomeIcon icon={faCircleUser} className='icon-SignIn' />
          <h1 className='title-SignIn'>Sign In</h1>
        </div>
        <form onSubmit={handleSubmitSignIn}>
          <label htmlFor='email' className='label-SignIn'>
            User Name
          </label>
          <input
            type='text'
            id='email'
            className='input-SignIn'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password' className='label-SignIn'>
            Password
          </label>
          <div className='input-password-container'>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              className='input-SignIn'
              value={password} // Utiliser l'état password pour la valeur
              onChange={(e) => setPassword(e.target.value)} // Gérer le changement de mot de passe
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className='toggle-password-icon'
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className='remember-me-container'>
            <input
              type='checkbox'
              id='remember'
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor='remember' className='label-remember-SignIn'>
              Remember me
            </label>
          </div>

          <button type='submit' className='btn-submit-SignIn'>
            Sign In
          </button>
          <button
            type='button'
            className='btn-submit-SignIn'
            onClick={() => setModalSignUp(true)}>
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
