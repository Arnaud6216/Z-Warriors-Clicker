import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const { user } = useOutletContext() as {
    user: { id: number; username: string; email: string; password: string };
  };

  const navigate = useNavigate();

  const handleStartGame = () => {
    if (user == null) {
      navigate("/login");
    } else {
      navigate("/game");
    }
  };

  return (
    <>
      {user ? (
        <div className="home-container">
          <h1>Z Warriors Clicker</h1>
          <p className="home-paragraph">
            Bienvenue dans Z Warriors Clicker, un jeu où votre objectif est de
            cliquer pour devenir plus puissant et vaincre des ennemis de plus en
            plus forts !
          </p>
          <p className="home-paragraph">
            Cliquez sur le <strong>bouton</strong> pour augmenter votre niveau
            de puissance. Transformez-vous en super saiyen, utilisez des
            techniques comme le <strong>Kamehameha</strong> et la{" "}
            <strong>Spirit Bomb</strong>, adaptez-vous pour battre vos ennemis.
          </p>
          <p className="home-paragraph">
            Cliquez sur le bouton "Commencer le jeu" pour débuter l'aventure.
          </p>

          <button
            type="button"
            className="start-button"
            onClick={handleStartGame}
          >
            Commencer le jeu
          </button>
        </div>
      ) : (
        <main className="user-disconnected">
          <img
            className="goku-approve"
            src="./src/assets/connexion.jpeg"
            alt="Goku approval"
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

export default Homepage;
