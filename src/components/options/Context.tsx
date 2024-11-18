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

	const [count, setCount] = useState<number>(0);
	const [concentrationCount, setConcentrationCount] = useState<number>(0);
	const [concentrationCost, setConcentrationCost] = useState<number>(20);
	const [gif, setGif] = useState<number>(0); // 0 - normal, 1 - Super Saiyen transition, 2 - Super Saiyen 1
	const [attackMultiplier, setAttackMultiplier] = useState<number>(1);
	const concentrationIncrement = 1;

	return (
		<Context.Provider
			value={{
				gifSrc: [
					gifSrc[gif],
					gifSrc[gif === 1 ? 1 : gif === 2 ? 2 : 0],
					gifSrc[2],
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
			}}
		>
			{children}
		</Context.Provider>
	);
};
