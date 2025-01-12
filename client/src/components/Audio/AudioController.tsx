import "./AudioController.css";

interface AudioControllerProps {
  currentAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isMusicPlaying: boolean;
  setIsMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  musicVolume: number;
  setMusicVolume: React.Dispatch<React.SetStateAction<number>>;
}

const AudioController: React.FC<AudioControllerProps> = ({
  currentAudioRef,
  isMusicPlaying,
  setIsMusicPlaying,
  musicVolume,
  setMusicVolume,
}) => {
  const handleMusic = () => {
    if (isMusicPlaying && currentAudioRef.current) {
      currentAudioRef.current.pause();
      setIsMusicPlaying(false);
    } else if (currentAudioRef.current) {
      currentAudioRef.current.play();
      setIsMusicPlaying(true);
    }
  };

  const handleMusicVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);
    setMusicVolume(volume);
    if (currentAudioRef.current) {
      currentAudioRef.current.volume = volume / 100;
    }
  };

  return (
    <footer className="audio-container">
      <button className="musique" type="button" onClick={handleMusic}>
        Musique : {isMusicPlaying ? "Pause" : "Play"}
      </button>
      <label htmlFor="music-range">Volume de la musique :</label>
      <input
        type="range"
        id="music-range"
        min="0"
        max="100"
        value={musicVolume}
        onChange={handleMusicVolume}
      />
    </footer>
  );
};

export default AudioController;
