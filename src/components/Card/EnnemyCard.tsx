import { useState, useEffect, useContext } from "react";
import { Context } from "../options/Context";

const ennemyList = [
	{
		imgSrc: "src/assets/vegeta.gif",
		name: "Vegeta",
		life: 10,
	},
	{
		imgSrc: "src/assets/freezer.gif",
		name: "Freezer",
		life: 200,
	},
	{
		imgSrc: "src/assets/cell.gif",
		name: "Cell",
		life: 500,
	},
];

function EnnemyCard() {
	const [ennemyIndex, setEnnemyIndex] = useState(0);
	const [ennemyLife, setEnnemyLife] = useState(ennemyList[ennemyIndex].life);
	
	// Récupère le contexte
	const context = useContext(Context);
	if (!context) {
		throw new Error("EnnemyCard doit être utilisé dans un fournisseur de contexte");
	}

	const { attackMultiplier } = context;

	// Réinitialise la vie de l'ennemi quand l'index change
	useEffect(() => {
		setEnnemyLife(ennemyList[ennemyIndex].life);
	}, [ennemyIndex]);

	const handleClickAttack = () => {
		// Réduit les points de vie en fonction de attackMultiplier, mais ne descend pas en dessous de zéro
		const damage = 1 * attackMultiplier;
		if (ennemyLife > damage) {
			setEnnemyLife(ennemyLife - damage);
		} else {
			alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
			setEnnemyIndex((prevIndex) => (prevIndex + 1) % ennemyList.length);  // Boucle à travers la liste des ennemis
		}
	};

	return (
		<div className="card-container">
			<img src={ennemyList[ennemyIndex].imgSrc} alt="ennemy" width="390px" height="220px" />
			<h1 className="ennemy-title">{ennemyList[ennemyIndex].name}</h1>
			<p className="ennemy-pv">Points de Vie : {ennemyLife}</p>
			<button
				className="button-attack"
				type="button"
				onClick={handleClickAttack}
			>
				Attack !
			</button>
		</div>
	);
}

export default EnnemyCard;