import { useContext, useEffect, useState } from "react";
import { Context } from "../../services/Context";

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
    ennemyLife,
    setEnnemyLife,
    soundEffectList,
    attackMultiplier,
    effectVolume,
    ennemyDefeated,
  } = context;

  const lightAttack = 1 * attackMultiplier;
  const strongAttack = 5 * attackMultiplier;

  //Ennemy's life initialisation
  useEffect(() => {
    if (ennemy[ennemyIndex]) {
      setEnnemyLife(ennemy[ennemyIndex].life);
    }
  }, [ennemyIndex, ennemy, setEnnemyLife]);

  //Health bar color based on ennemy's life
  const getHealthBarClass = () => {
    const healthPercentage = (ennemyLife / ennemy[ennemyIndex]?.life) * 100;
    if (healthPercentage > 50) return "health-bar";
    if (healthPercentage > 20) return "health-bar medium";
    return "health-bar low";
  };

  const handleClickLightAttack = () => {
    soundEffectList[0].play(effectVolume);
    if (ennemyLife > lightAttack) {
      setEnnemyLife(Math.max(ennemyLife - lightAttack, 0));
      // Verify if the ennemy's life do not go below 0
    } else {
      ennemyDefeated();
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClickStrongAttack = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setProgress(0);

    // disable the button for 3 seconds and display a progress bar
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

    soundEffectList[1].play(effectVolume);
    if (ennemyLife > strongAttack) {
      setEnnemyLife(Math.max(ennemyLife - strongAttack, 0));
    } else {
      ennemyDefeated();
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
      <p className="ennemy-info">Points de Vie : {ennemyLife}</p>
      <button
        type="button"
        className="button-attack"
        onClick={handleClickLightAttack}
        title={`inflige ${lightAttack} points de dégâts`}
      >
        Attaque légère
      </button>
      <button
        type="button"
        className="button-attack"
        onClick={handleClickStrongAttack}
        disabled={isButtonDisabled}
        title={`inflige ${strongAttack} points de dégâts`}
        style={{ position: "relative", overflow: "hidden" }}
      >
        Attaque lourde
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </button>
    </div>
  );
}

export default EnnemyCard;
