import { useEffect, useRef, useState } from "react";
import "./AudioController.css";
import { useContext } from "react";
import audioIcon from "../../assets/audio.png";
import gohanAngerTrack from "../../assets/music/Gohan-anger.mp3";
import gokuSsj1ThemeTrack from "../../assets/music/Goku-ssj1-theme.mp3";
import gokuSsj3ThemeTrack from "../../assets/music/Goku-ssj3-theme.mp3";
import gokuSsj4ThemeTrack from "../../assets/music/Goku-ssj4-theme.mp3";
import solidStateScouterTrack from "../../assets/music/Solid-state-scouter.mp3";
import weGottaPowerTrack from "../../assets/music/We-gotta-power.mp3";
import changeTrack from "../../assets/music/change.mp3";
import { Context } from "../../services/Context";

// Drop a track in client/src/assets/music/boss/ named after the ennemy
// (lowercase, no spaces/accents, e.g. "Freezer" -> freezer.mp3, "C 17" -> c17.mp3)
// to give that ennemy a dedicated battle theme. Files picked up automatically,
// no code change needed.
const bossTrackModules = import.meta.glob("../../assets/music/boss/*.mp3", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const bossTracks: Record<string, string> = {};
for (const path in bossTrackModules) {
  const fileName =
    path
      .split("/")
      .pop()
      ?.replace(/\.mp3$/, "") ?? "";
  bossTracks[fileName] = bossTrackModules[path];
}

const normalizeEnnemyName = (name: string) =>
  name
    .normalize("NFD")
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: diacritics regex
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();

const musicList = [
  weGottaPowerTrack,
  solidStateScouterTrack,
  gohanAngerTrack,
  changeTrack,
  gokuSsj1ThemeTrack,
  gokuSsj3ThemeTrack,
  gokuSsj4ThemeTrack,
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const AudioController: React.FC = () => {
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available!</div>;
  }

  const { effectVolume, setEffectVolume, ennemy, ennemyIndex } = context;

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isBossTrackPlayingRef = useRef(false);
  const [visible, setVisible] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [containerHeight, setContainerHeight] = useState("");

  const shuffledPlaylistRef = useRef<string[]>([]);
  if (shuffledPlaylistRef.current.length === 0) {
    shuffledPlaylistRef.current = shuffleArray(musicList);
  }

  // Plays `src`, replacing whatever is currently playing, and calls `onEnded`
  // once (not on every "ended" event of a stale, already-replaced track).
  const startTrack = (src: string, onEnded: () => void) => {
    audioRef.current?.pause();
    const audio = new Audio(src);
    audio.volume = musicVolume / 100;
    audioRef.current = audio;
    audio.play();
    setIsMusicPlaying(true);
    audio.addEventListener("ended", onEnded, { once: true });
    return audio;
  };

  const advanceToNextTrack = () => {
    setCurrentTrackIndex((previousIndex) => {
      if (previousIndex < musicList.length - 1) {
        return previousIndex + 1;
      }
      shuffledPlaylistRef.current = shuffleArray(musicList);
      return 0;
    });
  };

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
      startTrack(
        shuffledPlaylistRef.current[currentTrackIndex],
        advanceToNextTrack,
      );
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only start new track when track index changes
  useEffect(() => {
    // Skip on first render: startTrack already handles the very first play.
    if (audioRef.current) {
      startTrack(
        shuffledPlaylistRef.current[currentTrackIndex],
        advanceToNextTrack,
      );
    }
  }, [currentTrackIndex]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only evaluate boss track replacement on enemy change
  useEffect(() => {
    // Don't force music to start before the player has pressed Play once.
    if (!audioRef.current) return;

    const currentEnnemy = ennemy[ennemyIndex];
    const bossTrackSrc =
      currentEnnemy && bossTracks[normalizeEnnemyName(currentEnnemy.name)];

    if (bossTrackSrc) {
      isBossTrackPlayingRef.current = true;
      startTrack(bossTrackSrc, () => {
        isBossTrackPlayingRef.current = false;
        // Resume the previous track from the very beginning once the boss theme ends.
        startTrack(
          shuffledPlaylistRef.current[currentTrackIndex],
          advanceToNextTrack,
        );
      });
    } else if (isBossTrackPlayingRef.current) {
      isBossTrackPlayingRef.current = false;
      startTrack(
        shuffledPlaylistRef.current[currentTrackIndex],
        advanceToNextTrack,
      );
    }
  }, [ennemyIndex]);

  // The Audio object lives outside React's DOM tree, so unmounting this
  // component (e.g. on logout) wouldn't otherwise stop playback.
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

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
        src={audioIcon}
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
