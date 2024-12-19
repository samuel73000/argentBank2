import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false); // State pour afficher/masquer le mot de passe
  const [errorMessage, setErrorMessage] = useState(""); // State pour les erreurs
  const [email, setEmail] = useState(""); // State pour stocker l'email
  const [rememberMe, setRememberMe] = useState(false); // State pour "Remember Me"
  const navigate = useNavigate(); // Hook pour la redirection

  // Charger l'email depuis le localStorage si disponible
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();

    const inputPassword = document.getElementById("password").value;

    // Données à envoyer
    const dataSignIn = {
      email,
      password: inputPassword,
    };

    try {
      // Requête POST pour ce connecter
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSignIn),
      });

      if (response.ok) {
        const result = await response.json();
        // Stocker le token dans localStorage
        localStorage.setItem("token", result.body.token);

        // Sauvegarder ou supprimer l'email selon le choix "Remember Me"
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Rediriger vers la page utilisateur
        navigate("/User");

        // Recharger la page après la redirection
        setTimeout(() => {
          window.location.reload();
        }, 10);
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Erreur lors de la requête:", error);
    }
  };

  ////////////////// partie sign-up///////////////////

  const [modalSignUp, setModalSignUp] = useState(false);

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    const inputPassword = document.getElementById("password").value;
    const inputEmail = document.getElementById("email").value;
    const inputFirstName = document.getElementById("firstName").value;
    const inputLastName = document.getElementById("lastName").value;
    const inputUserName = document.getElementById("userName").value;
    // Données à envoyer
    const dataSignUp = {
      email: inputEmail,
      password: inputPassword,
      firstName: inputFirstName,
      lastName: inputLastName,
      userName: inputUserName,
    };
    try {
      // Requête POST pour ce connecter
      const response = await fetch("http://localhost:3001/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSignUp),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setErrorMessage("");
        // ferme la modal SignUp
        setModalSignUp(false);
      } else {
        setErrorMessage("A field is empty or incorrect. Please try again..");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Erreur lors de la requête:", error);
    }
  };

  return modalSignUp ? (
    ////////// partie sign-up///////////
    <section className='section-SignIn'>
      <div className='container-SignIn'>
        <div className='container-title-SignIn'>
          <FontAwesomeIcon icon={faCircleUser} className='icon-SignIn' />
          <h1 className='title-SignIn'>Sign Up</h1>
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <form onSubmit={handleSubmitSignUp}>
          <label htmlFor='email' className='label-SignIn'>
            email
          </label>
          <input type='text' id='email' className='input-SignIn' />
          <label htmlFor='password' className='label-SignIn'>
            Password
          </label>
          <input type='password' id='password' className='input-SignIn' />
          <label htmlFor='FirstName' className='label-SignIn'>
            First name
          </label>
          <input type='text' id='firstName' className='input-SignIn' />
          <label htmlFor='LastName' className='label-SignIn'>
            Last name
          </label>
          <input type='text' id='lastName' className='input-SignIn' />
          <label htmlFor='UserName' className='label-SignIn'>
            User name
          </label>
          <input type='text' id='userName' className='input-SignIn' />
          <button type='submit' className='btn-submit-SignIn'>
            Confirm
          </button>
          <button
            className='btn-submit-SignIn'
            onClick={() => setModalSignUp(!modalSignUp)}>
            Cancel
          </button>
        </form>
      </div>
    </section>
  ) : (
    /////////// partie sign-in//////////////
    <section className='section-SignIn'>
      <div className='container-SignIn'>
        <div className='container-title-SignIn'>
          <FontAwesomeIcon icon={faCircleUser} className='icon-SignIn' />
          <h1 className='title-SignIn'>Sign In</h1>
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <form onSubmit={handleSubmitSignIn}>
          <label htmlFor='email' className='label-SignIn'>
            Username
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
            type={showPassword ? "text" : "password"}
            id='password'
            className='input-SignIn'
          />
          {showPassword ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className='toggle-password-icon'
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEye}
              className='toggle-password-icon'
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
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
            className='btn-submit-SignIn'
            onClick={() => setModalSignUp(!modalSignUp)}>
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
