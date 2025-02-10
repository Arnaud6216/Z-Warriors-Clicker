import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (!email || !passwordValue || !username) {
      setRegisterMessage("Tous les champs sont requis.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/account`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password: passwordValue,
          }),
        },
      );

      if (response.status === 201) {
        setRegisterMessage("Inscription réussie, redirection...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setRegisterMessage("Erreur lors de l'inscription.");
        console.info(response);
      }
    } catch (err) {
      setRegisterMessage("Une erreur s'est produite.");
      console.error(err);
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="inscription-title">Inscription</h2>

        {registerMessage && (
          <p style={{ color: "rgb(216, 121, 13)" }}>{registerMessage}</p>
        )}

        <label htmlFor="username">Pseudo</label>
        <input type="text" id="username" name="username" ref={usernameRef} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" ref={emailRef} />

        <label htmlFor="password">Mot de passe</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
        />

        <button className="submit" type="submit">
          Inscription
        </button>
        <p>Déjà inscrit ?</p>
        <button type="button" onClick={() => navigate("/login")}>
          Connexion
        </button>
      </form>
    </>
  );
}

export default Register;
