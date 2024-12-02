import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState(""); // State pour les erreurs
  const navigate = useNavigate(); // Hook pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputUser = document.getElementById("email").value;
    const inputPassword = document.getElementById("password").value;

    // Données à envoyer
    const data = {
      email: inputUser,
      password: inputPassword,
    };

    try {
      // Requête POST
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        // Stocker le token dans localStorage
        localStorage.setItem("token", result.body.token);

        // Rediriger vers la page utilisateur
        navigate("/User");

        // Délayer l'actualisation de la page après la redirection
        // peut etre ENLEVER SEITIME ET WINDOWS LOCATION UNE FOIS REDUX MIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        setTimeout(() => {
          window.location.reload(); // Recharger la page après la redirection
        }, 10); // Délai de 100ms pour permettre à la redirection de se produire avant le rechargement
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Erreur lors de la requête:", error);
    }
  };

  return (
    <section className='section-SignIn'>
      <div className='container-SignIn'>
        <div className='container-title-SignIn'>
          <FontAwesomeIcon icon={faCircleUser} className='icon-SignIn' />
          <h1 className='title-SignIn'>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email' className='label-SignIn'>
            Username
          </label>
          <input type='text' id='email' className='input-SignIn' />
          <label htmlFor='password' className='label-SignIn'>
            Password
          </label>
          <input type='password' id='password' className='input-SignIn' />
          <input type='checkbox' id='remenber' />
          <label htmlFor='remenber' className='label-remenber-SignIn'>
            Remember me
          </label>
          <button type='submit' className='btn-submit-SignIn'>
            Sign In
          </button>
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </section>
  );
}
