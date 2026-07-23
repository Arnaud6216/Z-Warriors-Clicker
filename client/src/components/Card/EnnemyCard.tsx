import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../services/Context";
import "./card.css";

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
    isEnnemyKO,
    isKaiokenActive,
    isTransforming,
    count,
    setCount,
  } = context;

  const currentEnnemyName = ennemy[ennemyIndex]
    ? ennemy[ennemyIndex].name
        .normalize("NFD")
        // biome-ignore lint/suspicious/noMisleadingCharacterClass: diacritics regex
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase()
    : "";
  const isBoss = ["freezer", "cell", "buu"].includes(currentEnnemyName);

  const lightAttack = 1 * attackMultiplier * (isKaiokenActive ? 3 : 1);
  const strongAttack = 5 * attackMultiplier * (isKaiokenActive ? 3 : 1);

  const [kikohaShots, setKikohaShots] = useState(0);
  const [isKikohaCooldown, setIsKikohaCooldown] = useState(false);
  const [kikohaProgress, setKikohaProgress] = useState(0);
  const kikohaIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isHeavyKikohaDisabled, setIsHeavyKikohaDisabled] = useState(false);
  const [heavyKikohaProgress, setHeavyKikohaProgress] = useState(0);
  const heavyKikohaIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const strongAttackIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showError = (msg: string) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    setErrorMessage(msg);
    setErrorKey((prev) => prev + 1);
    errorTimeoutRef.current = setTimeout(() => {
      setErrorMessage(null);
    }, 2500);
  };

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (kikohaIntervalRef.current) {
        clearInterval(kikohaIntervalRef.current);
      }
      if (heavyKikohaIntervalRef.current) {
        clearInterval(heavyKikohaIntervalRef.current);
      }
      if (strongAttackIntervalRef.current) {
        clearInterval(strongAttackIntervalRef.current);
      }
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const handleClickKikoha = () => {
    if (isEnnemyKO || isTransforming || isKikohaCooldown) return;

    if (count < 5) {
      showError("Puissance insuffisante pour un Kikoha !");
      return;
    }
    setCount(count - 5);

    // Play light attack sound
    soundEffectList[2].play(effectVolume);

    // Calculate Kikoha damage (3 * attackMultiplier)
    const damage = Math.floor(3 * attackMultiplier * (isKaiokenActive ? 3 : 1));
    if (ennemyLife > damage) {
      setEnnemyLife(Math.max(ennemyLife - damage, 0));
    } else {
      ennemyDefeated();
    }

    const nextShots = kikohaShots + 1;
    setKikohaShots(nextShots);
    setKikohaProgress(nextShots * 20);

    if (nextShots >= 5) {
      setIsKikohaCooldown(true);
      let remainingTime = 10000; // 10 seconds cooldown
      const intervalTime = 100;
      kikohaIntervalRef.current = setInterval(() => {
        remainingTime -= intervalTime;
        setKikohaProgress((remainingTime / 10000) * 100);
        if (remainingTime <= 0) {
          if (kikohaIntervalRef.current) {
            clearInterval(kikohaIntervalRef.current);
          }
          setIsKikohaCooldown(false);
          setKikohaShots(0);
          setKikohaProgress(0);
        }
      }, intervalTime);
    }
  };

  const handleClickHeavyKikoha = () => {
    if (isHeavyKikohaDisabled || isEnnemyKO || isTransforming) return;

    if (count < 20) {
      showError("Puissance insuffisante pour un Kikoha puissant !");
      return;
    }
    setCount(count - 20);

    // Play strong attack sound
    soundEffectList[3].play(effectVolume);

    // Calculate strong energy blast damage (8 * attackMultiplier)
    const damage = Math.floor(8 * attackMultiplier * (isKaiokenActive ? 3 : 1));
    if (ennemyLife > damage) {
      setEnnemyLife(Math.max(ennemyLife - damage, 0));
    } else {
      ennemyDefeated();
    }

    setIsHeavyKikohaDisabled(true);
    setHeavyKikohaProgress(0);

    let remainingTime = 6000; // 6 seconds cooldown
    const intervalTime = 100;
    heavyKikohaIntervalRef.current = setInterval(() => {
      remainingTime -= intervalTime;
      setHeavyKikohaProgress(((6000 - remainingTime) / 6000) * 100);
      if (remainingTime <= 0) {
        if (heavyKikohaIntervalRef.current) {
          clearInterval(heavyKikohaIntervalRef.current);
        }
        setIsHeavyKikohaDisabled(false);
        setHeavyKikohaProgress(0);
      }
    }, intervalTime);
  };

  //Ennemy's life initialisation
  useEffect(() => {
    if (ennemy[ennemyIndex]) {
      setEnnemyLife(ennemy[ennemyIndex].life);
    }
  }, [ennemyIndex, ennemy, setEnnemyLife]);

  //Health bar color based on ennemy's life
  const getHealthBarClass = () => {
    const healthPercentage = (ennemyLife / ennemy[ennemyIndex]?.life) * 100;
    if (isBoss) {
      if (healthPercentage > 50) return "health-bar boss-health";
      if (healthPercentage > 20) return "health-bar boss-health medium";
      return "health-bar boss-health low";
    }
    if (healthPercentage > 50) return "health-bar";
    if (healthPercentage > 20) return "health-bar medium";
    return "health-bar low";
  };

  const handleClickLightAttack = () => {
    if (isEnnemyKO || isTransforming) return;
    soundEffectList[0].play(effectVolume);
    if (ennemyLife > lightAttack) {
      setEnnemyLife(Math.max(ennemyLife - lightAttack, 0));
      // Verify if the ennemy's life do not go below 0
    } else {
      ennemyDefeated();
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [barProgress, setBarProgress] = useState(0);

  const handleClickStrongAttack = () => {
    if (isButtonDisabled || isEnnemyKO || isTransforming) return;
    setIsButtonDisabled(true);
    setBarProgress(0);

    // disable the button for 3 seconds and display a progress bar using a single interval
    let remainingTime = 3000;
    const intervalTime = 100;
    strongAttackIntervalRef.current = setInterval(() => {
      remainingTime -= intervalTime;
      setBarProgress(((3000 - remainingTime) / 3000) * 100);
      if (remainingTime <= 0) {
        if (strongAttackIntervalRef.current) {
          clearInterval(strongAttackIntervalRef.current);
        }
        setIsButtonDisabled(false);
        setBarProgress(0);
      }
    }, intervalTime);

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
    <section className={`ennemy-container ${isBoss ? "boss-card" : ""}`}>
      {isBoss && (
        <div className="boss-badge">
          <span>BOSS</span>
        </div>
      )}
      <img
        src={ennemy[ennemyIndex]?.img_src}
        alt="ennemy"
        width="390px"
        height="220px"
        className={`ennemy-gif ${isEnnemyKO ? "ko" : ""}`}
      />
      <h2 className="ennemy-title">{ennemy[ennemyIndex]?.name}</h2>
      <aside className="health-bar-container">
        <div
          className={getHealthBarClass()}
          style={{
            width: `${(ennemyLife / ennemy[ennemyIndex]?.life) * 100}%`,
          }}
        />
      </aside>
      <p className="ennemy-info">Points de Vie : {ennemyLife}</p>
      <div className="ennemy-attacks-container">
        <div className="physical-attacks-group">
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
            disabled={isButtonDisabled || isEnnemyKO || isTransforming}
            title={`inflige ${strongAttack} points de dégâts`}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <span style={{ position: "relative", zIndex: 2 }}>
              Attaque lourde
            </span>
            <div
              className="progress-bar"
              style={{ width: `${barProgress}%` }}
            />
          </button>
        </div>
        <div className="ki-attacks-group">
          <button
            type="button"
            className="button-attack button-kikoha"
            onClick={handleClickKikoha}
            disabled={isKikohaCooldown || isEnnemyKO || isTransforming}
            title={`Tire un Kikoha (Dégâts: ${Math.floor(3 * attackMultiplier * (isKaiokenActive ? 3 : 1))}) - Coût: 5 Puissance`}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <span style={{ position: "relative", zIndex: 2 }}>
              Kikoha
            </span>
            <div
              className="kikoha-progress-bar"
              style={{ width: `${kikohaProgress}%` }}
            />
          </button>
          <button
            type="button"
            className="button-attack button-kikoha"
            onClick={handleClickHeavyKikoha}
            disabled={isHeavyKikohaDisabled || isEnnemyKO || isTransforming}
            title={`Tire un Kikoha lourd (Dégâts: ${Math.floor(8 * attackMultiplier * (isKaiokenActive ? 3 : 1))}) - Coût: 20 Puissance`}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <span style={{ position: "relative", zIndex: 2 }}>
              Kikoha puissant
            </span>
            <div
              className="heavy-kikoha-progress-bar"
              style={{ width: `${heavyKikohaProgress}%` }}
            />
          </button>
        </div>
      </div>
      {errorMessage && (
        <p key={errorKey} className="ennemy-error-message">
          {errorMessage}
        </p>
      )}
    </section>
  );
}

export default EnnemyCard;
