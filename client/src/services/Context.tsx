import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useOutletContext } from "react-router-dom";

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
  soundEffectList: { play: (volume: number) => void }[];
  ennemy: Ennemy[];
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  effectVolume: number;
  setEffectVolume: (volume: number) => void;
  progress: Progress | null;
  setProgress: (progress: Progress | null) => void;
}

interface Ennemy {
  id: number;
  name: string;
  img_src: string;
  life: number;
}

interface Progress {
  id: number;
  account_id: number;
  ennemy_id: number;
  username: string;
  name: string;
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
  const { user } = useOutletContext<{ user: { id: number; name: string } }>();
  const [progress, setProgress] = useState(null as Progress | null);

  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/progress/${user.id}`)
        .then((response) => response.json())
        .then((data) => setProgress(data))
        .catch((error) => {
          console.error("Erreur lors de la récupération des progrès :", error);
        });
    }
  }, [user]);

  const soundEffectList = [
    {
      name: "lightAttack",
      play: (volume = 1) => {
        const audio = new Audio("src/assets/music/lightAttack.mp3");
        audio.volume = Math.max(0, Math.min(volume, 1)); // Clamp volume
        audio.play().catch((err) => {
          console.error("Erreur lors de la lecture du son lightAttack :", err);
        });
      },
    },
    {
      name: "heavyAttack",
      play: (volume = 1) => {
        const audio = new Audio("src/assets/music/heavyAttack.mp3");
        audio.volume = Math.max(0, Math.min(volume, 1));
        audio.play().catch((err) => {
          console.error("Erreur lors de la lecture du son heavyAttack :", err);
        });
      },
    },
    {
      name: "kamehameha",
      play: (volume = 1) => {
        const audio = new Audio("src/assets/music/kamehameha.mp3");
        audio.volume = Math.max(0, Math.min(volume, 1));
        audio.play().catch((err) => {
          console.error("Erreur lors de la lecture du son kamehameha :", err);
        });
      },
    },
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
  const [effectVolume, setEffectVolume] = useState(0.5);

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
        effectVolume,
        setEffectVolume,
        progress,
        setProgress,
      }}
    >
      {children}
    </Context.Provider>
  );
};
