import { useContext, useEffect, useState } from "react";
import { Context } from "../options/Context";
import Option from "../options/Option";
import "./spec.css";

function Spec() {
	const context = useContext(Context);

	if (!context) {
		return <div>Error: Context is not available!</div>;
	}

	const {
		count,
		setCount,
		concentrationCount,
		setConcentrationCount,
		concentrationCost,
		setConcentrationCost,
		concentrationIncrement,
		gif,
		setGif,
		gifSrc,
	} = context;

	const [style, setStyle] = useState("spec-option");
	const [saiyenState, setSaiyenState] = useState(0);

	// Changer le style du bouton de concentration en fonction du coût
	useEffect(() => {
		setStyle(
			count >= concentrationCost ? "spec-option-available" : "spec-option",
		);
	}, [count, concentrationCost]);

	// Gérer le clic pour augmenter la concentration du KI
	const handleClickKi = () => {
		if (count >= concentrationCost) {
			setCount(count - concentrationCost);
			setConcentrationCount(concentrationCount + 1);
			setConcentrationCost(concentrationCost + 5);
		}
	};

	// Incrémenter `count` en fonction de `concentrationCount` toutes les secondes
	useEffect(() => {
		const interval = setInterval(() => {
			setCount(
				(prevCount) => prevCount + concentrationCount * concentrationIncrement,
			);
		}, 1000);

		return () => clearInterval(interval);
	}, [concentrationCount, concentrationIncrement, setCount]);

	// Gestion du changement de gif lors du clic sur Super Saiyen
	const handleClickSsj = () => {
		if (count >= 50 && gif !== 1) {
			// Vérifie si le gif n'est pas déjà en état 1
			setGif(1); // Change le gif à 1 (transition en Super Saiyen)

			// Change le gif à 2 après 12 secondes (forme complète Super Saiyen)
			setTimeout(() => {
				setGif(2);
			}, 10500);

			// Décrémente le count pour le coût de la transformation
			setCount(count - 50);
		}
		setSaiyenState(1);
	};

	return (
		<div className="spec-container">
			<ul>
				<Option
					label="Concentration du KI"
					isAvailable={count >= concentrationCost}
					onClick={handleClickKi}
					className={style}
				/>
				{count >= 50 && saiyenState === 0 && (
					<Option
						label="Super Saiyen"
						isAvailable={count >= 50}
						onClick={handleClickSsj}
						className={count >= 50 ? "spec-option-available" : "spec-option"}
					/>
				)}
			</ul>
		</div>
	);
}

export default Spec;
