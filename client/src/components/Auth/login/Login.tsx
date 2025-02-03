import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { User } from "../../../types/vite-env";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setUser } = useOutletContext() as {
    setUser: (user: User | null) => void;
  };

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setErrorMessage("L'email et le mot de passe sont requis.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      if (response.status === 200) {
        const user = await response.json();

        setUser(user);
        navigate("/game");
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.error || "Erreur inconnue lors de la connexion.",
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Erreur lors de la connexion, veuillez réessayer.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input ref={emailRef} type="email" id="email" />

      <label htmlFor="password">Mot de passe</label>
      <input type="password" id="password" ref={passwordRef} />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button type="submit">Se connecter</button>

      <p>Pas de compte ?</p>
      <button type="button" onClick={handleRegister}>
        Inscrivez vous
      </button>
    </form>
  );
}

export default Login;
