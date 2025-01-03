import { useContext, useEffect, useState } from "react";
import { Context } from "../options/Context";
import { useRef } from "react";

function EnnemyCard() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "EnnemyCard doit être utilisé dans un fournisseur de contexte",
    );
  }

  const {
    attackMultiplier,
    ennemyIndex,
    setEnnemyIndex,
    ennemyLife,
    setEnnemyLife,
    ennemyList,
    ennemyStyle,
    soundEffectList,
  } = context;

  const ennemyListRef = useRef(ennemyList);

  useEffect(() => {
    setEnnemyLife(ennemyListRef.current[ennemyIndex].life);
  }, [ennemyIndex, setEnnemyLife]); // il manque la dépendance ennemyList mais si elle est ajoutée la vie de l'ennemi va se reset toujours au max

  const getHealthBarClass = () => {
    const healthPercentage = (ennemyLife / ennemyList[ennemyIndex].life) * 100;
    if (healthPercentage > 50) return "health-bar";
    if (healthPercentage > 20) return "health-bar medium";
    return "health-bar low";
  };

  const handleClickLightAttack = () => {
    soundEffectList[0].play();
    const damage = 1 * attackMultiplier;
    if (ennemyLife > damage) {
      setEnnemyLife(Math.max(ennemyLife - damage, 0));
    } else {
      alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
      setEnnemyIndex((ennemyIndex + 1) % ennemyList.length);
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClickStrongAttack = () => {
    if (isButtonDisabled) return;
    soundEffectList[1].play();

    setIsButtonDisabled(true);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 100 / 30;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => {
      setIsButtonDisabled(false);
      setProgress(0);
    }, 3400);

    const damage = 1 * attackMultiplier + 6;
    if (ennemyLife > damage) {
      setEnnemyLife(Math.max(ennemyLife - damage, 0));
    } else {
      alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
      setEnnemyIndex((ennemyIndex + 1) % ennemyList.length);
    }
  };

  return (
    <div className="ennemy-container">
      <img
        src={ennemyList[ennemyIndex].imgSrc}
        alt="ennemy"
        width="390px"
        height="220px"
        className={`ennemy-gif ${ennemyStyle}`}
      />
      <h2 className="ennemy-title">{ennemyList[ennemyIndex].name}</h2>
      <div className="health-bar-container">
        <div
          className={getHealthBarClass()}
          style={{
            width: `${(ennemyLife / ennemyList[ennemyIndex].life) * 100}%`,
          }}
        />
      </div>
      <p>Points de Vie : {ennemyLife}</p>
      <button
        className="button-attack"
        type="button"
        onClick={handleClickLightAttack}
      >
        Attaque légère
      </button>
      <button
        className="button-attack"
        onClick={handleClickStrongAttack}
        disabled={isButtonDisabled}
        style={{ position: "relative", overflow: "hidden" }}
        type="button"
      >
        Attaque lourde
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </button>
    </div>
  );
}

export default EnnemyCard;
