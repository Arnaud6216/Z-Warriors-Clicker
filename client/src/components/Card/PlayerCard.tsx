import { useContext, useState } from "react";
import { Context } from "../../services/Context";
import "./card.css";

function Card() {
  const context = useContext(Context);
  const [animation, setAnimation] = useState("power-button");

  if (!context) {
    return <div>Error: Context is not available!</div>;
  }

  const {
    gifSrc,
    count,
    setCount,
    gifSize,
    attackMultiplier,
    concentrationCount,
  } = context;

  const handleClickCount = () => {
    setCount(count + 1);
    setTimeout(() => {
      setAnimation("power-button power-button-animation");
    }, 100);
    setAnimation("power-button");
  };

  const test = () => {
    setCount(count + 200);
  };

  return (
    <div className="player-container">
      <img src={gifSrc[0]} alt="Goku" className={`${gifSize} character-gif`} />
      <h2 className="player-title">Goku</h2>
      <div className="info-container">
        <h3>Puissance : {count}</h3>
        <p className="player-info">
          Attaque : <strong>x{attackMultiplier}</strong>{" "}
        </p>
        <p className="player-info">
          Puissance par seconde : <strong>+{concentrationCount}</strong>
        </p>
      </div>
      <div className="power-button-container">
        <button
          className={animation}
          type="button"
          onClick={handleClickCount}
        />
      </div>
      <button type="button" onClick={test}>
        (dev) +200
      </button>
    </div>
  );
}

export default Card;
