import { useContext, useEffect } from "react";
import { Context } from "../options/Context";

function EnnemyCard() {
	const context = useContext(Context);

	if (!context) {
		throw new Error(
			"EnnemyCard doit être utilisé dans un fournisseur de contexte",
		);
	}

	const {
		attackMultiplier,
		ennemyIndex,
		setEnnemyIndex,
		ennemyLife,
		setEnnemyLife,
		ennemyList,
	} = context;

	// Réinitialise la vie de l'ennemi à chaque changement d'index
	useEffect(() => {
		setEnnemyLife(ennemyList[ennemyIndex].life);
	}, [ennemyIndex, setEnnemyLife]); // il manque la dépendance ennemyList mais si elle est ajoutée la vie de l'ennemi va se reset toujours au max

	const getHealthBarClass = () => {
		const healthPercentage = (ennemyLife / ennemyList[ennemyIndex].life) * 100;
		if (healthPercentage > 50) return "health-bar";
		if (healthPercentage > 20) return "health-bar medium";
		return "health-bar low";
	};

	const handleClickAttack = () => {
		const damage = 1 * attackMultiplier;
		if (ennemyLife > damage) {
			setEnnemyLife(Math.max(ennemyLife - damage, 0));
		} else {
			alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
			setEnnemyIndex((ennemyIndex + 1) % ennemyList.length);
		}
	};

	return (
		<div className="ennemy-container">
			<img
				src={ennemyList[ennemyIndex].imgSrc}
				alt="ennemy"
				width="390px"
				height="220px"
				className="character-gif"
			/>
			<h2 className="ennemy-title">{ennemyList[ennemyIndex].name}</h2>
			<div className="health-bar-container">
				<div
					className={getHealthBarClass()}
					style={{
						width: `${(ennemyLife / ennemyList[ennemyIndex].life) * 100}%`,
					}}
				/>
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
