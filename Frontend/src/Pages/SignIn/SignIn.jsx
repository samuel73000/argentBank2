import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputPassword = document.getElementById("password").value;

    // Données à envoyer
    const data = {
      email,
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

  return (
    <section className="section-SignIn">
      <div className="container-SignIn">
        <div className="container-title-SignIn">
          <FontAwesomeIcon icon={faCircleUser} className="icon-SignIn" />
          <h1 className="title-SignIn">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="label-SignIn">
            Username
          </label>
          <input
            type="text"
            id="email"
            className="input-SignIn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="label-SignIn">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="input-SignIn"
          />
          {showPassword ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEye}
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}

          <div className="remember-me-container">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember" className="label-remember-SignIn">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn-submit-SignIn">
            Sign In
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </section>
  );
}
