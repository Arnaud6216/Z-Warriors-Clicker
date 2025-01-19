import { useEffect, useRef, useState } from "react";
import "./AudioController.css";

const AudioController: React.FC = () => {

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
          setIsMusicPlaying(false);
        }
      });
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value);
    setMusicVolume(volume);

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);

  useEffect(() => {
    if (audioRef.current) {

      audioRef.current.pause();
      audioRef.current = new Audio(musicList[currentTrackIndex]);
      audioRef.current.volume = musicVolume / 100;
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

  return (
    <footer className="audio-container">
      <button className="musique" type="button" onClick={handleMusic}>
        {isMusicPlaying ? "Pause" : "Play"}
      </button>
      <label htmlFor="music-range">Volume de la musique :</label>
      <input
        type="range"
        id="music-range"
        min="0"
        max="100"
        value={musicVolume}
        onChange={handleVolumeChange}
      />
    </footer>
  );
};

export default AudioController;