import "./Navbar.css";
import { useContext, useEffect } from "react";
import { Context } from "../../services/Context";
import { useOutletContext, useNavigate } from "react-router-dom";
import type { User } from "../../types/vite-env";

function Navbar() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { user, setUser } = useOutletContext() as {
    user: User | null;
    setUser: (user: User | null) => void;
  };

  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  const { progress, setProgress } = context;
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    // Si un utilisateur est connecté, on récupère son progrès
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/progress/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          // Mettre à jour le `progress` dans le contexte
          setProgress(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du progrès :", error);
        });
    }
  }, [user, setProgress]); // Ajoute `user` et `setProgress` comme dépendances

  return (
    <>
      <header className="navbar-container">
        <p className="disclaimer-text">
          <strong>Disclaimer :</strong> Ce jeu est un projet de fan créé à des
          fins non commerciales et éducatives. Il s'inspire de l'univers de
          Dragon Ball, qui est une propriété de Toei Animation, Akira Toriyama,
          et leurs détenteurs de droits respectifs. Ce projet n'est en aucun cas
          affilié, approuvé ou sponsorisé par les créateurs ou les détenteurs
          des droits de Dragon Ball Z. Tous les droits sur les noms, personnages
          et marques appartiennent à leurs propriétaires respectifs.
        </p>
        <div className="progress-container">
          <p className="progress-username">{`Bienvenue ${progress?.username} !`}</p>
          <p className="progress-ennemy">{`Dernier ennemi vaincu : ${progress?.name}`}</p>
        </div>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Deconnexion
        </button>
      </header>
    </>
  );
}

export default Navbar;
