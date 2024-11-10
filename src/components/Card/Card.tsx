import { useContext } from "react";
import { Context } from "../options/Context";
import "./card.css";

function Card() {
    const context = useContext(Context);

    if (!context) {
        // Si le context est `undefined`, vous pouvez retourner un message d'erreur ou un comportement par défaut
        return <div>Error: Context is not available!</div>;
    }

    const { gifSrc, count, setCount } = context;

    const handleClickCount = () => {
        setCount(count + 1);
    };

    return (
        <div className="card-container">
            <img
                src={gifSrc[0]} // Affiche le GIF de Goku dans son état normal
                alt="Goku"
                width="390px"
                height="220px"
            />
            <button className="power-button" type="button" onClick={handleClickCount}>
                Power Level: {count}
            </button>
        </div>
    );
}

export default Card;