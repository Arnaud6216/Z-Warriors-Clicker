import { useContext, useEffect, useState } from "react";
import { Context } from "../options/Context";
import Option from "../options/Option";
import "./tech.css";

function Tech() {
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
		setAttackMultiplier,
		ennemyLife,
		setEnnemyLife,
		ennemyList,
		ennemyIndex,
		setEnnemyIndex,
		setGifSize,
	} = context;

	const [style, setStyle] = useState("tech-option");
	const [saiyenState, setSaiyenState] = useState(0);
	const [kamehamehaStyle, setKamehamehaStyle] = useState("kamehameha");
	const [kamehamehaMultiplier, setKamehamehaMultiplier] = useState(2);
	const [spiritBombStyle, setSpiritBombStyle] = useState("spirit-bomb");
	const [SpiritBombVisible, setSpiritBombVisible] = useState("spirit-bomb-img");
	const [spiritCount, setSpiritCount] = useState(0);
	const kamehamehaCost = 40;
	const spiritBombCost = 200;

	useEffect(() => {
		setStyle(
			count >= concentrationCost ? "tech-option-available" : "tech-option",
		);
		setKamehamehaStyle(
			count >= kamehamehaCost ? "kamehameha-available" : "kamehameha",
		);

		setSpiritBombStyle(
			count >= spiritBombCost ? "spirit-bomb-available" : "spirit-bomb",
		);
	}, [count, concentrationCost]);

	const handleClickKi = () => {
		if (count >= concentrationCost) {
			setCount(count - concentrationCost);
			setConcentrationCount(concentrationCount + 1);
			setConcentrationCost(concentrationCost + 5);
		}
	};

	const handleClickKamehameha = () => {
		if (count >= kamehamehaCost) {
			setCount(count - kamehamehaCost);
			const damage = 50 * (kamehamehaMultiplier / 2);
			if (ennemyLife > damage) {
				setEnnemyLife(Math.max(ennemyLife - damage, 0));
			} else {
				alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
				setEnnemyIndex((ennemyIndex + 1) % ennemyList.length);
			}
		}
	};

	const handleClickSpirit = () => {
		setSpiritBombVisible("spirit-bomb-img-visible");

		if (count >= spiritBombCost) {
			setCount(count - spiritBombCost);

			setTimeout(() => {
				handleSpirit();

				setSpiritCount((prevSpiritCount) => {
					const damage = prevSpiritCount;

					if (ennemyLife > damage) {
						setEnnemyLife(Math.max(ennemyLife - damage, 0));
					} else {
						alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
						setEnnemyIndex((ennemyIndex + 1) % ennemyList.length);
					}
					return 0;
				});

				setSpiritBombVisible("spirit-bomb-img");
			}, 5000);
		}
	};

	const handleSpirit = () => {
		setSpiritCount((prevSpiritCount) => prevSpiritCount + 1);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(
				(prevCount: number) =>
					prevCount + concentrationCount * concentrationIncrement,
			);
		}, 1000);

		return () => clearInterval(interval);
	}, [concentrationCount, concentrationIncrement, setCount]);

	const handleClickSsj = () => {
		if (count >= 50 && gif !== 1) {
			setGifSize("player-img-transition");
			setGif(1);

			setTimeout(() => {
				setGif(2);
				setGifSize("player-img-end");
			}, 10500);

			setCount(count - 50);
		}
		setSaiyenState(1);
		setAttackMultiplier(5);
		setKamehamehaMultiplier(4);
	};

	const handleClickSsj2 = () => {
		if (count >= 100 && gif !== 3) {
			setGif(3);
			setGifSize("player-img-transition");

			setTimeout(() => {
				setGif(4);
				setGifSize("player-img-end");
			}, 3000);

			setCount(count - 100);
		}
		setSaiyenState(2);
		setAttackMultiplier(10);
		setKamehamehaMultiplier(6);
	};

	const handleClickSsj3 = () => {
		if (count >= 150 && gif !== 5) {
			setGif(5);
			setGifSize("player-img-transition");

			setTimeout(() => {
				setGif(6);
				setGifSize("player-img-end");
			}, 12000);

			setCount(count - 150);
		}
		setSaiyenState(3);
		setAttackMultiplier(15);
		setKamehamehaMultiplier(8);
	};

	return (
		<>
			<img
				src="./src/assets/spirit-bomb.png"
				className={SpiritBombVisible}
				alt="spirit bomb"
				onClick={handleSpirit}
				onKeyUp={handleSpirit}
			/>
			<p className="spirit-count">Clique sur la Spirit bomb ! {spiritCount}</p>
			<div className="tech-container">
				<ul>
					<Option
						label="Concentration du KI"
						isAvailable={count >= concentrationCost}
						onClick={handleClickKi}
						className={style}
					/>

					<Option
						label="Kamehameha"
						isAvailable={count >= 40}
						onClick={handleClickKamehameha}
						className={kamehamehaStyle}
					/>

					<Option
						label="Spirit Bomb"
						isAvailable={count >= 200}
						onClick={handleClickSpirit}
						className={spiritBombStyle}
					/>

					{count >= 50 && saiyenState === 0 && (
						<Option
							label="Super Saiyen"
							isAvailable={count >= 50}
							onClick={handleClickSsj}
							className="saiyan-option"
						/>
					)}
					{count >= 100 && saiyenState === 1 && (
						<Option
							label="Super Saiyen 2"
							isAvailable={count >= 100}
							onClick={handleClickSsj2}
							className="saiyan-option"
						/>
					)}
					{count >= 150 && saiyenState === 2 && (
						<Option
							label="Super Saiyen 3"
							isAvailable={count >= 150}
							onClick={handleClickSsj3}
							className="saiyan-option"
						/>
					)}
				</ul>
			</div>
		</>
	);
}

export default Tech;
