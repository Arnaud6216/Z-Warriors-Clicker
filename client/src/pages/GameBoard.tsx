import { useRef, useState } from "react";
import AudioController from "../components/Audio/AudioController";
import EnnemyCard from "../components/Card/EnnemyCard";
import PlayerCard from "../components/Card/PlayerCard";
import Tech from "../components/Tech/Tech";

function Gameboard() {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackIndex = useRef(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);

  const musicList = [
    "src/assets/music/We-gotta-power.mp3",
    "src/assets/music/Solid-state-scouter.mp3",
    "src/assets/music/Gohan-anger.mp3",
    "src/assets/music/change.mp3",
    "src/assets/music/Goku-ssj1-theme.mp3",
    "src/assets/music/Goku-ssj3-theme.mp3",
    "src/assets/music/Goku-ssj4-theme.mp3",
  ];

  const playMusic = (index: number) => {
    if (index >= musicList.length) {
      currentAudioRef.current = null;
      setIsMusicPlaying(false);
      return;
    }

    const music = new Audio(musicList[index]);
    currentAudioRef.current = music;
    currentTrackIndex.current = index;

    // Appliquer le volume actuel de la musique
    music.volume = musicVolume / 100;

    music.play();
    setIsMusicPlaying(true);

    music.addEventListener("ended", () => {
      playMusic(index + 1);
    });
  };

  return (
    <>
      <PlayerCard />
      <Tech />
      <EnnemyCard />
      <AudioController
        currentAudioRef={currentAudioRef}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        setMusicVolume={setMusicVolume} // Passer la fonction pour changer le volume de la musique
        musicVolume={musicVolume} // Passer la valeur actuelle du volume
      />
    </>
  );
}

export default Gameboard;
