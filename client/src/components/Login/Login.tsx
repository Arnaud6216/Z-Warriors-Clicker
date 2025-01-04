import "./Registration.css";

interface RegistrationProps {
  setIsLogged: (isLogged: boolean) => void;
}

function Registration({ setIsLogged }: RegistrationProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const elements = form.elements as HTMLFormControlsCollection;
    const username = (elements.namedItem("username") as HTMLInputElement).value;
    const password = (elements.namedItem("password") as HTMLInputElement).value;

    if (username === "admin" && password === "admin") {
      setIsLogged(true);
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="username">Nom de compte</label>
        <input type="text" id="username" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" />
        <button className="submit" type="submit">
          Connexion
        </button>
      </form>
    </>
  );
}

export default Registration;
