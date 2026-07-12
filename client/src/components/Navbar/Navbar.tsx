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
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <header className="navbar-container">
        <article className="progress-container">
          <p className="progress-username">{`Bienvenue ${progress?.username} !`}</p>
          <p className="progress-ennemy">{`Dernier ennemi affronté : ${progress?.name}`}</p>
        </article>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Deconnexion
        </button>
      </header>
    </>
  );
}

export default Navbar;
