import { createContext, useState } from "react";
import type { ReactNode } from "react";
interface ContextType {
	gifSrc: string[];
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	concentrationCount: number;
	setConcentrationCount: (count: number) => void;
	concentrationCost: number;
	setConcentrationCost: (cost: number) => void;
	concentrationIncrement: number;
	gif: number;
	setGif: (gif: number) => void;
	attackMultiplier: number;
	setAttackMultiplier: (attackMultiplier: number) => void;
	ennemyIndex: number;
	setEnnemyIndex: (index: number) => void;
	ennemyLife: number;
	setEnnemyLife: (life: number) => void;
	ennemyList: { imgSrc: string; name: string; life: number }[];
	gifSize: string;
	setGifSize: (size: string) => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
	children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
	const gifSrc = [
		"src/assets/base.webp",
		"src/assets/ssj1-transition.webp",
		"src/assets/ssj1.webp",
		"src/assets/ssj2-transition.webp",
		"src/assets/ssj2.webp",
		"src/assets/ssj3-transition.webp",
		"src/assets/ssj3.webp",
	];

	const ennemyList = [
		{ imgSrc: "src/assets/nappa.webp", name: "Nappa", life: 50 },
		{ imgSrc: "src/assets/vegeta.webp", name: "Vegeta", life: 100 },
		{ imgSrc: "src/assets/guldo.webp", name: "Guldo", life: 150 },
		{ imgSrc: "src/assets/burter.webp", name: "Burter", life: 160 },
		{ imgSrc: "src/assets/jeice.webp", name: "Jeice", life: 170 },
		{ imgSrc: "src/assets/recome.webp", name: "Recome", life: 180 },
		{ imgSrc: "src/assets/ginyu.webp", name: "Ginyu", life: 200 },
		{ imgSrc: "src/assets/freezer.webp", name: "Freezer", life: 400 },
		{ imgSrc: "src/assets/cell.webp", name: "Cell", life: 800 },
		{ imgSrc: "src/assets/buu.webp", name: "Buu", life: 1500 },
	];

	const [count, setCount] = useState<number>(0);
	const [concentrationCount, setConcentrationCount] = useState<number>(0);
	const [concentrationCost, setConcentrationCost] = useState<number>(20);
	const [gif, setGif] = useState<number>(0); // 0 - normal, 1 - Super Saiyen transition, 2 - Super Saiyen 1
	const [attackMultiplier, setAttackMultiplier] = useState<number>(1);
	const concentrationIncrement = 1;
	const [ennemyIndex, setEnnemyIndex] = useState(0);
	const [ennemyLife, setEnnemyLife] = useState(ennemyList[ennemyIndex].life);
	const [gifSize, setGifSize] = useState("player-img");

	return (
		<Context.Provider
			value={{
				gifSrc: [
					gifSrc[gif],
					gifSrc[gif === 1 ? 1 : gif === 2 ? 2 : gif === 3 ? 3 : 0],
					gifSrc[3],
				], // Dynamically select gifSrc based on `gif`
				count,
				setCount,
				concentrationCount,
				setConcentrationCount,
				concentrationCost,
				setConcentrationCost,
				concentrationIncrement,
				gif,
				setGif,
				attackMultiplier,
				setAttackMultiplier,
				ennemyIndex,
				setEnnemyIndex,
				ennemyLife,
				setEnnemyLife,
				ennemyList,
				gifSize,
				setGifSize,
			}}
		>
			{children}
		</Context.Provider>
	);
};
