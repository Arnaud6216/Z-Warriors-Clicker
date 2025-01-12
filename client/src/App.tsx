import { useRef, useState } from "react";
import "./App.css";
import EnnemyCard from "./components/Card/EnnemyCard";
import Card from "./components/Card/PlayerCard";
import Homepage from "./components/Homepage/Homepage";
import Registration from "./components/Registration/Registration";
import Tech from "./components/Tech/Tech";
import { Provider } from "./components/options/Context";
import AudioController from "./components/Audio/AudioController";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("/");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50); // Ajout d'un état pour le volume de la musique

  const musicList = [
    "src/assets/music/We-gotta-power.mp3",
    "src/assets/music/Solid-state-scouter.mp3",
    "src/assets/music/Gohan-anger.mp3",
    "src/assets/music/change.mp3",
    "src/assets/music/Goku-ssj1-theme.mp3",
    "src/assets/music/Goku-ssj3-theme.mp3",
    "src/assets/music/Goku-ssj4-theme.mp3",
  ];

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackIndex = useRef(0);

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

  const handleStartGame = () => {
    setCurrentLocation("/game");
    playMusic(0); // Lance la musique lorsque le jeu commence
  };

  return (
    <>
      {!isLogged ? (
        <Registration setIsLogged={setIsLogged} />
      ) : (
        <>
          {currentLocation === "/" && (
            <Homepage handleStartGame={handleStartGame} />
          )}
          {currentLocation === "/game" && (
            <Provider>
              <Card />
              <Tech />
              <EnnemyCard />
              <AudioController
                currentAudioRef={currentAudioRef}
                isMusicPlaying={isMusicPlaying}
                setIsMusicPlaying={setIsMusicPlaying}
                setMusicVolume={setMusicVolume} // Passer la fonction pour changer le volume de la musique
                musicVolume={musicVolume} // Passer la valeur actuelle du volume
              />
            </Provider>
          )}
        </>
      )}
    </>
  );
}

export default App;
