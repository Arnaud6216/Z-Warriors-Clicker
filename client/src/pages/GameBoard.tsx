import AudioController from "../components/Audio/AudioController";
import EnnemyCard from "../components/Card/EnnemyCard";
import PlayerCard from "../components/Card/PlayerCard";
import Tech from "../components/Tech/Tech";

function Gameboard() {


  return (
    <>
      <PlayerCard />
      <Tech />
      <AudioController />
      <EnnemyCard />
    </>
  );
}

export default Gameboard;
