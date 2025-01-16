import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";


function Register() {

  const emailRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/account`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:
              (emailRef.current as HTMLInputElement).value,
            password,
          }),
        },
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        <form className="form-container" onSubmit={handleSubmit}>

          <h2>Inscription</h2>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" ref={emailRef}/>

          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" onChange={handlePasswordChange} value={password}/>

          <button className="submit" type="submit">
            Inscription
          </button>
        </form>
    </>
  );
}

export default Register;
