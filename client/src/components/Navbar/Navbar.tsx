import "./Navbar.css";
import { useContext } from "react";
import { Context } from "../../services/Context";
import { useOutletContext, useNavigate } from "react-router-dom";
import type { User } from "../../types/vite-env";

function Navbar() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { setUser } = useOutletContext() as {
    setUser: (user: User | null) => void;
  };

  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  const { progress } = context;
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <header className="navbar-container">
        <section className="progress-container">
          <p className="progress-username">{`Bienvenue ${progress?.username} !`}</p>
          <p className="progress-ennemy">{`Dernier ennemi affronté : ${progress?.name}`}</p>
        </section>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Deconnexion
        </button>
      </header>
    </>
  );
}

export default Navbar;
