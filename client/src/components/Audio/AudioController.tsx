import { useEffect, useRef, useState } from "react";
import "./AudioController.css";
import { useContext } from "react";
import { Context } from "../../services/Context";

const AudioController: React.FC = () => {
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available!</div>;
  }

  const { effectVolume, setEffectVolume } = context;

  const musicList = [
    "src/assets/music/We-gotta-power.mp3",
    "src/assets/music/Solid-state-scouter.mp3",
    "src/assets/music/Gohan-anger.mp3",
    "src/assets/music/change.mp3",
    "src/assets/music/Goku-ssj1-theme.mp3",
    "src/assets/music/Goku-ssj3-theme.mp3",
    "src/assets/music/Goku-ssj4-theme.mp3",
  ];

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [visible, setVisible] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [containerHeight, setContainerHeight] = useState("");

  const handleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    } else {
      const audio = new Audio(musicList[currentTrackIndex]);
      audio.volume = musicVolume / 100;
      audioRef.current = audio;
      audio.play();
      setIsMusicPlaying(true);

      audio.addEventListener("ended", () => {
        if (currentTrackIndex < musicList.length - 1) {
          setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
          setCurrentTrackIndex(0);
        }
      });
    }
  };

  const handleMusicVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value);
    setMusicVolume(volume);

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const handleEffectVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value);
    setEffectVolume(volume / 100);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = new Audio(musicList[currentTrackIndex]);
      audioRef.current.play();
      setIsMusicPlaying(true);

      audioRef.current.addEventListener("ended", () => {
        if (currentTrackIndex < musicList.length - 1) {
          setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
          setIsMusicPlaying(false);
        }
      });
    }
  }, [currentTrackIndex]);

  const handleHideAudio = () => {
    if (isVisible) {
      setVisible("invisible");
      setContainerHeight("hidden");
      setIsVisible(false);
    } else {
      setVisible("");
      setContainerHeight("");
      setIsVisible(true);
    }
  };

  return (
    <footer className={`audio-container ${containerHeight}`}>
      <img
        className="arrow-img"
        src="./src/assets/audio.png"
        alt=""
        onClick={handleHideAudio}
        onKeyDown={handleHideAudio}
        title="Afficher / Cacher le menu"
      />
      <button
        className={`playmusic-button ${visible}`}
        type="button"
        onClick={handleMusic}
      >
        {isMusicPlaying ? "Pause" : "Play"}
      </button>

      <fieldset className="audio-range">
        <label className={visible} htmlFor="music-range">
          Musique
        </label>
        <input
          className={visible}
          type="range"
          id="music-range"
          min="0"
          max="100"
          value={musicVolume}
          onChange={handleMusicVolume}
        />
      </fieldset>

      <fieldset className="audio-range">
        <label className={visible} htmlFor="effect-range">
          Effets
        </label>
        <input
          className={visible}
          type="range"
          id="effect-range"
          min="0"
          max="100"
          value={effectVolume * 100}
          onChange={handleEffectVolume}
        />
      </fieldset>
    </footer>
  );
};

export default AudioController;
