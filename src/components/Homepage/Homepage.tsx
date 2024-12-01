import { Link } from "react-router-dom";

type HomepageProps = {
    handleStartGame: () => void;
};

function Homepage({handleStartGame}: HomepageProps) {
    return ( 
        <div className="home-container">
            <h1>Dragon Ball Z: Clicker Power</h1>
            <p className="home-paragraph">
                Bienvenue dans Dragon Ball Z: Clicker Power, un jeu où votre
                objectif est de cliquer pour devenir plus puissant et vaincre des
                ennemis de plus en plus forts !
            </p>
            <p className="home-paragraph">
                Cliquez sur le <strong>bouton</strong> pour augmenter votre niveau
                de puissance. Transformez vous en super saiyen, utilisez des
                techniques comme le <strong>Kamehameha</strong> et la{" "}
                <strong>Spirit Bomb</strong>, adaptez vous pour battre vos ennemis.
            </p>
            <p className="home-paragraph">
                Cliquez sur le bouton "Commencer le jeu" pour débuter l'aventure.
            </p>
            <Link to="/game">
            <button
                type="button"
                className="start-button"
                onClick={handleStartGame}
                >
                Commencer le jeu
            </button>
                </Link>
        </div>
           );
}

export default Homepage;