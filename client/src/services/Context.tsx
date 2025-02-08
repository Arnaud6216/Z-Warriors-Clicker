import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Ennemy } from "../types/vite-env";
import type { Progress } from "../../../server/src/types/express";
import { useOutletContext } from "react-router";

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
  ennemyDefeated: () => void;
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
    // Fetch ennemy data to initialise the first ennemy
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
    //get progress by the connected user
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

  const ennemyDefeated = async () => {
    //when the ennemy's life is below 0
    const nextIndex = (ennemyIndex + 1) % ennemy.length;
    const currentEnnemy = ennemy[ennemyIndex];
    const nextEnnemy = ennemy[nextIndex];
    //alert the user that he has defeated the ennemy and pass to the next one
    alert(`Tu as battu ${currentEnnemy?.name} !`);
    setEnnemyIndex(nextIndex);

    //update the progress to
    if (user && progress) {
      if (nextEnnemy.id > progress.ennemy_id) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/progress/${user.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ennemy_id: nextEnnemy.id,
              }),
            },
          );

          const updatedProgress = await response.json();

          setProgress(updatedProgress);

          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/progress/${user?.id}`,
            );

            const progressData = await response.json();

            setProgress(progressData);
          } catch (error) {
            console.error(
              "Erreur lors de la récupération de la progression :",
              error,
            );
          }
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour ou récupération du progrès :",
            error,
          );
        }
      }
    }
  };

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
        ennemyDefeated,
      }}
    >
      {children}
    </Context.Provider>
  );
};
