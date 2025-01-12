import { useState } from "react";
import "./Registration.css";

interface RegistrationProps {
  setIsLogged: (isLogged: boolean) => void;
}

function Registration({ setIsLogged }: RegistrationProps) {
  const [isRegister, setIsRegister] = useState(true);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const elements = form.elements as HTMLFormControlsCollection;
    const username = (elements.namedItem("username") as HTMLInputElement).value;
    const password = (elements.namedItem("password") as HTMLInputElement).value;

    if (username === "admin" && password === "admin") {
      setIsLogged(true);
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const elements = form.elements as HTMLFormControlsCollection;
    const username = (elements.namedItem("username") as HTMLInputElement).value;
    const password = (elements.namedItem("password") as HTMLInputElement).value;

    // Logique d'inscription (simulé ici, connectez-le à une API réelle)
    if (username && password) {
      alert(`Compte créé pour ${username} !`);
      setIsRegister(true);
    }
  };

  return (
    <>
      {isRegister ? (
        <form className="form-container" onSubmit={handleLogin}>
          <h2>Connexion</h2>
          <label htmlFor="username">Nom de compte</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" />
          <button className="submit" type="submit">
            Connexion
          </button>
          <p>Pas encore de compte ? </p>
          <button
            type="button"
            className="link-button"
            onClick={() => setIsRegister(false)}
          >
            Inscrivez-vous
          </button>
        </form>
      ) : (
        <form className="form-container" onSubmit={handleRegister}>
          <h2>Inscription</h2>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="username">Nom de compte</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" />
          <button className="submit" type="submit">
            Inscription
          </button>
          <p>Vous avez déjà un compte ? </p>
          <button
            type="button"
            className="link-button"
            onClick={() => setIsRegister(true)}
          >
            Connectez-vous
          </button>
        </form>
      )}
    </>
  );
}

export default Registration;
