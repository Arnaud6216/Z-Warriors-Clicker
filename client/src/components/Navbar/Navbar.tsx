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
        <p className="disclaimer-text">
          <strong>Disclaimer :</strong> Ce jeu est un projet de fan, non
          commercial, inspiré de Dragon Ball. Il n'est en aucun cas affilié ou
          approuvé par les créateurs ou détenteurs de droits de Dragon Ball Z.
          Tous les droits appartiennent à leurs propriétaires respectifs.
        </p>
        <div className="progress-container">
          <p className="progress-username">{`Bienvenue ${progress?.username} !`}</p>
          <p className="progress-ennemy">{`Dernier ennemi affronté : ${progress?.name}`}</p>
        </div>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Deconnexion
        </button>
      </header>
    </>
  );
}

export default Navbar;
