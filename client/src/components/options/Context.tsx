import { createContext, useEffect, useState } from "react";
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
  gifSize: string;
  setGifSize: (size: string) => void;
  ennemyStyle: string;
  setEnnemyStyle: (style: string) => void;
  soundEffectList: { play: () => void }[];
  ennemy: Ennemy[];
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  soundEffectVolume: number;
  setSoundEffectVolume: (volume: number) => void;
}

interface Ennemy {
  id: number;
  name: string;
  img_src: string;
  life: number;
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

  const [ennemy, setEnnemy] = useState([] as Ennemy[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ennemy`)
      .then((response) => response.json())
      .then((data: Ennemy[]) => {
        setEnnemy(data);
        if (data.length > 0) {
          setEnnemyLife(data[0].life);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des ennemis :", error);
      });
  }, []);

  const soundEffectList = [
    { play: () => new Audio("src/assets/music/lightAttack.mp3").play() },
    { play: () => new Audio("src/assets/music/heavyAttack.mp3").play() },
    { play: () => new Audio("src/assets/music/kamehameha.mp3").play() },
  ];

  const [count, setCount] = useState<number>(0);
  const [concentrationCount, setConcentrationCount] = useState<number>(0);
  const [concentrationCost, setConcentrationCost] = useState<number>(20);
  const [gif, setGif] = useState<number>(0);
  const [attackMultiplier, setAttackMultiplier] = useState<number>(1);
  const concentrationIncrement = 1;
  const [ennemyIndex, setEnnemyIndex] = useState(0);
  const [ennemyLife, setEnnemyLife] = useState<number>(0);
  const [gifSize, setGifSize] = useState("player-img");
  const [ennemyStyle, setEnnemyStyle] = useState("");
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [soundEffectVolume, setSoundEffectVolume] = useState(0.5);

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
        gifSize,
        setGifSize,
        ennemyStyle,
        setEnnemyStyle,
        soundEffectList,
        ennemy,
        musicVolume,
        setMusicVolume,
        soundEffectVolume,
        setSoundEffectVolume,
      }}
    >
      {children}
    </Context.Provider>
  );
};
