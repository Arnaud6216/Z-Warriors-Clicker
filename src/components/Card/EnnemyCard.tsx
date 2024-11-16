import { useState, useEffect, useContext } from "react";
import { Context } from "../options/Context";

const ennemyList = [
    { imgSrc: "src/assets/vegeta.webp", name: "Vegeta", life: 10 },
    { imgSrc: "src/assets/freezer.webp", name: "Freezer", life: 200 },
    { imgSrc: "src/assets/cell.webp", name: "Cell", life: 500 },
];

function EnnemyCard() {
    const [ennemyIndex, setEnnemyIndex] = useState(0);
    const [ennemyLife, setEnnemyLife] = useState(ennemyList[ennemyIndex].life);

    const context = useContext(Context);
    if (!context) {
        throw new Error("EnnemyCard doit être utilisé dans un fournisseur de contexte");
    }

    const { attackMultiplier } = context;

    // Réinitialise la vie de l'ennemi à chaque changement d'index
    useEffect(() => {
        setEnnemyLife(ennemyList[ennemyIndex].life);
    }, [ennemyIndex]);

    const getHealthBarClass = () => {
        const healthPercentage = (ennemyLife / ennemyList[ennemyIndex].life) * 100;
        if (healthPercentage > 50) return "health-bar";
        if (healthPercentage > 20) return "health-bar medium";
        return "health-bar low";
    };

    const handleClickAttack = () => {
        const damage = 1 * attackMultiplier;
        if (ennemyLife > damage) {
            setEnnemyLife((prevLife) => Math.max(prevLife - damage, 0));
        } else {
            alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
            setEnnemyIndex((prevIndex) => (prevIndex + 1) % ennemyList.length);
        }
    };

    return (
        <div className="card-container">
            <img
                src={ennemyList[ennemyIndex].imgSrc}
                alt="ennemy"
                width="390px"
                height="220px"
            />
            <h2 className="ennemy-title">{ennemyList[ennemyIndex].name}</h2>
            <div className="health-bar-container">
                <div
                    className={getHealthBarClass()}
                    style={{
                        width: `${(ennemyLife / ennemyList[ennemyIndex].life) * 100}%`,
                    }}
                ></div>
            </div>
            <p>Points de Vie : {ennemyLife}</p>
            <button
                className="button-attack"
                type="button"
                onClick={handleClickAttack}
            >
                Attack!
            </button>
        </div>
    );
}

export default EnnemyCard;