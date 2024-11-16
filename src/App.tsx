import { useState } from "react";
import "./App.css";
import EnnemyCard from "./components/Card/EnnemyCard";
import Card from "./components/Card/PlayerCard";
import Spec from "./components/Spec/Spec";
import { Provider } from "./components/options/Context";

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const handleStartGame = () => {
        setIsGameStarted(true); 
    };

    return (
     <>
            {!isGameStarted ? (
                <div className="home-container">
                    <h1>Dragon Ball Z: Clicker Power</h1>
                    <p className="home-paragraph">
                        Bienvenue dans Dragon Ball Z: Clicker Power, un jeu où votre objectif est de cliquer pour devenir plus puissant et vaincre des ennemis de plus en plus puissants !
                    </p>
					<p className="home-paragraph">
					Cliquez sur le <strong>bouton</strong> pour augmenter votre niveau de puissance. Transformez vous en super saiyen, utilisez des techniques comme le <strong>Kamehameha</strong> et la <strong>Spirit Bomb</strong> pour devenir plus puissant et battre vos ennemis.
					</p>
                    <p className="home-paragraph">
                        Cliquez sur le bouton "Commencer le jeu" pour débuter l'aventure.
                    </p>
                    <button className="start-button" onClick={handleStartGame}>
                        Commencer le jeu
                    </button>
                </div>
            ) : (
				<Provider>
                    
                        <Card />
                        <Spec />
                        <EnnemyCard />
                  
                </Provider>
            )}
			</>
    );
}

export default App;