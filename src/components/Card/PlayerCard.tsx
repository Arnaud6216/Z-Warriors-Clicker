import { useContext } from "react";
import { Context } from "../options/Context";
import "./card.css";

function Card() {
	const context = useContext(Context);

	if (!context) {
		return <div>Error: Context is not available!</div>;
	}

	const { gifSrc, count, setCount, gifSize } = context;

	const handleClickCount = () => {
		setCount(count + 1);
	};

	const test = () => {
		setCount(count + 200);
	};

	return (
		<div className="player-container">
			<img
				src={gifSrc[0]} // Affiche le GIF de Goku dans son état normal
				alt="Goku"
				className={gifSize}
			/>
			<h2 className="player-title">Goku</h2>
			<button className="power-button" type="button" onClick={handleClickCount}>
				Power Level: {count}
			</button>
			<button onClick={test}>test</button>
		</div>
	);
}

export default Card;
