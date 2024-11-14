import { useState, useEffect } from "react";

const ennemyList = [
	{
		name: "Vegeta",
		life: 10,
	},
	{
		name: "Freezer",
		life: 200,
	},
	{
		name: "Cell",
		life: 300,
	},
];

function EnnemyCard() {
	const [ennemyIndex, setEnnemyIndex] = useState(0);
	const [ennemyLife, setEnnemyLife] = useState(ennemyList[ennemyIndex].life);

	// Utilise useEffect pour réinitialiser la vie quand l'ennemi change
	useEffect(() => {
		setEnnemyLife(ennemyList[ennemyIndex].life);
	}, [ennemyIndex]);

	const handleClickAttack = () => {
		if (ennemyLife > 1) {
			setEnnemyLife(ennemyLife - 1);
		} else {
			alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
			setEnnemyIndex((prevIndex) => prevIndex + 1);
		}
	};

	return (
		<div className="card-container">
			<img src="" alt="ennemy" width="390px" height="220px" />
			<h1 className="ennemy-title">{ennemyList[ennemyIndex].name}</h1>
			<p className="ennemy-pv">Point de Vie : {ennemyLife}</p>
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
