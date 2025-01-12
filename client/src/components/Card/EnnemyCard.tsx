import { useContext, useEffect, useState } from "react";
import { Context } from "../options/Context";

function EnnemyCard() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "EnnemyCard doit être utilisé dans un fournisseur de contexte",
    );
  }

  const {
    ennemy,
    ennemyIndex,
    setEnnemyIndex,
    ennemyLife,
    setEnnemyLife,
    soundEffectList,
  } = context;

  useEffect(() => {
    if (ennemy[ennemyIndex]) {
      setEnnemyLife(ennemy[ennemyIndex].life);
    }
  }, [ennemyIndex, ennemy, setEnnemyLife]);

  const getHealthBarClass = () => {
    const healthPercentage = (ennemyLife / ennemy[ennemyIndex]?.life) * 100;
    if (healthPercentage > 50) return "health-bar";
    if (healthPercentage > 20) return "health-bar medium";
    return "health-bar low";
  };

  const handleClickLightAttack = () => {
    soundEffectList[0].play();
    const damage = 1;
    if (ennemyLife > damage) {
      setEnnemyLife(Math.max(ennemyLife - damage, 0));
    } else {
      alert(`Tu as battu ${ennemy[ennemyIndex]?.name} !`);
      setEnnemyIndex((ennemyIndex + 1) % ennemy.length);
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClickStrongAttack = () => {
    if (isButtonDisabled) return;

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

    soundEffectList[1].play();
    const damage = 7;
    if (ennemyLife > damage) {
      setEnnemyLife(Math.max(ennemyLife - damage, 0));
    } else {
      alert(`Tu as battu ${ennemy[ennemyIndex]?.name} !`);
      setEnnemyIndex((ennemyIndex + 1) % ennemy.length);
    }
  };

  if (!ennemy[ennemyIndex]) {
    return <p>Chargement des ennemis...</p>;
  }

  return (
    <div className="ennemy-container">
      <img
        src={ennemy[ennemyIndex]?.img_src}
        alt="ennemy"
        width="390px"
        height="220px"
        className="ennemy-gif"
      />
      <h2 className="ennemy-title">{ennemy[ennemyIndex]?.name}</h2>
      <div className="health-bar-container">
        <div
          className={getHealthBarClass()}
          style={{
            width: `${(ennemyLife / ennemy[ennemyIndex]?.life) * 100}%`,
          }}
        />
      </div>
      <p>Points de Vie : {ennemyLife}</p>
      <button
        type="button"
        className="button-attack"
        onClick={handleClickLightAttack}
      >
        Attaque légère
      </button>
      <button
        type="button"
        className="button-attack"
        onClick={handleClickStrongAttack}
        disabled={isButtonDisabled}
        style={{ position: "relative", overflow: "hidden" }}
      >
        Attaque lourde
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </button>
    </div>
  );
}

export default EnnemyCard;
