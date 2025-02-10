import AudioController from "../components/Audio/AudioController";
import EnnemyCard from "../components/Card/EnnemyCard";
import PlayerCard from "../components/Card/PlayerCard";
import Navbar from "../components/Navbar/Navbar";
import Tech from "../components/Tech/Tech";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./Gameboard.css";
import type { User } from "../types/vite-env";

function Gameboard() {
  const navigate = useNavigate();
  const { user } = useOutletContext() as {
    user: User;
  };

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <PlayerCard />
          <Tech />
          <AudioController />
          <EnnemyCard />
        </>
      ) : (
        <main className="user-disconnected">
          <img
            className="goku-approve"
            src="./src/assets/connexion.jpeg"
            alt=""
          />
          <p>Connecte toi pour pouvoir jouer !</p>
          <button type="button" onClick={() => navigate("/login")}>
            Connexion
          </button>
        </main>
      )}
    </>
  );
}

export default Gameboard;
