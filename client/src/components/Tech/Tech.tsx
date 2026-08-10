import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../services/Context";
import Option from "../options/Option";
import "./tech.css";
import kamehamehaSound from "../../assets/music/kamehameha.mp3";
import spiritBombImg from "../../assets/spirit-bomb.png";

function Tech() {
  const context = useContext(Context);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const {
    count,
    setCount,
    concentrationCount,
    setConcentrationCount,
    concentrationCost,
    setConcentrationCost,
    concentrationIncrement,
    gif,
    setGif,
    setAttackMultiplier,
    setEnnemyLife,
    setGifSize,
    ennemyDefeated,
    isEnnemyKO,
    isKaiokenActive,
    setIsKaiokenActive,
    toggleKaioken,
    isTransforming,
    soundEffectList,
    effectVolume,
    isKamehamehaChanneling,
    setIsKamehamehaChanneling,
  } = context;

  const [techButtonStyle, setTechButtonStyle] = useState("tech-option");
  const [saiyenState, setSaiyenState] = useState(0);
  const [kamehamehaStyle, setKamehamehaStyle] = useState("kamehameha");
  const [spiritBombStyle, setSpiritBombStyle] = useState("spirit-bomb");
  const [SpiritBombVisible, setSpiritBombVisible] = useState("spirit-bomb-img");
  const [spiritCount, setSpiritCount] = useState(50);
  const [spiritMultiplier, setSpiritMultiplier] = useState(3);
  const [isSpiritBombReloading, setIsSpiritBombReloading] = useState(false);
  const [spiritBombCooldown, setSpiritBombCooldown] = useState(0);
  const [spiritBombTimerText, setSpiritBombTimerText] = useState("");

  const [kamehamehaDamage, setKamehamehaDamage] = useState(350);
  const [isKamehamehaReloading, setIsKamehamehaReloading] = useState(false);

  const [kamehamehaDuration, setKamehamehaDuration] = useState(4500); // 4.5s fallback
  const kamehamehaReloadDuration = 20000; // 20s reload time
  const spiritBombReloadDuration = 270000; // 4m 30s reload time
  const [kamehamehaCooldown, setKamehamehaCooldown] = useState(0);
  const kamehamehaIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load Kamehameha audio duration dynamically on mount
  useEffect(() => {
    const audio = new Audio(kamehamehaSound);
    const handleLoadedMetadata = () => {
      setKamehamehaDuration(audio.duration * 1000);
    };
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (kamehamehaIntervalRef.current) {
        clearInterval(kamehamehaIntervalRef.current);
      }
    };
  }, []);

  const superSaiyen1 = 1000;
  const superSaiyen2 = 5000;
  const superSaiyen3 = 15000;

  const kamehamehaCost = 150;
  const spiritBombCost = 500;

  useEffect(() => {
    // display the available style if the player has enough points
    setTechButtonStyle(
      count >= concentrationCost ? "tech-option-available" : "tech-option",
    );
    setKamehamehaStyle(
      count >= kamehamehaCost &&
        !isKamehamehaChanneling &&
        !isKamehamehaReloading
        ? "kamehameha-available"
        : "kamehameha",
    );
    setSpiritBombStyle(
      count >= spiritBombCost &&
        !isSpiritBombReloading &&
        SpiritBombVisible !== "spirit-bomb-img-visible"
        ? "spirit-bomb-available"
        : "spirit-bomb",
    );
  }, [
    count,
    concentrationCost,
    SpiritBombVisible,
    isKamehamehaChanneling,
    isKamehamehaReloading,
    isSpiritBombReloading,
  ]);

  const handleClickKi = () => {
    if (isEnnemyKO || isTransforming) return;
    if (count >= concentrationCost) {
      setCount(count - concentrationCost);
      setConcentrationCount(concentrationCount + 1);
      setConcentrationCost(concentrationCost + 5);
    }
  };

  const handleClickKamehameha = () => {
    if (
      isEnnemyKO ||
      isTransforming ||
      isKamehamehaChanneling ||
      isKamehamehaReloading
    )
      return;
    if (count >= kamehamehaCost) {
      setCount(count - kamehamehaCost);

      // Snapshot damage at cast time
      const damageToApply = kamehamehaDamage * (isKaiokenActive ? 3 : 1);

      // Play the sound (index 4 in soundEffectList is kamehameha)
      soundEffectList[4].play(effectVolume);

      // Block Kamehameha button and start channeling (100% -> 0%)
      setIsKamehamehaChanneling(true);
      setKamehamehaCooldown(100);

      let remainingTime = kamehamehaDuration;
      const intervalTime = 100;
      kamehamehaIntervalRef.current = setInterval(() => {
        remainingTime -= intervalTime;
        setKamehamehaCooldown(
          Math.max((remainingTime / kamehamehaDuration) * 100, 0),
        );
        if (remainingTime <= 0) {
          if (kamehamehaIntervalRef.current) {
            clearInterval(kamehamehaIntervalRef.current);
          }

          // Unblock screen immediately when attack hits, enter reload phase
          setIsKamehamehaChanneling(false);
          setIsKamehamehaReloading(true);

          // Trigger impact shake animation on enemy card
          const enemyCard = document.querySelector(".ennemy-container");
          if (enemyCard) {
            enemyCard.classList.add("kamehameha-impact");
            setTimeout(() => {
              enemyCard.classList.remove("kamehameha-impact");
            }, 800);
          }

          // Apply damage at the end of the channeling (when the Kamehameha hits)
          setEnnemyLife((prevLife) => {
            if (prevLife > damageToApply) {
              return Math.max(prevLife - damageToApply, 0);
            }
            ennemyDefeated();
            return 0;
          });

          // Phase 2: Reverse Cooldown / Reloading (0% -> 100%) - screen is free!
          let reloadTime = 0;
          kamehamehaIntervalRef.current = setInterval(() => {
            reloadTime += intervalTime;
            setKamehamehaCooldown(
              Math.min((reloadTime / kamehamehaReloadDuration) * 100, 100),
            );

            if (reloadTime >= kamehamehaReloadDuration) {
              if (kamehamehaIntervalRef.current) {
                clearInterval(kamehamehaIntervalRef.current);
              }
              setIsKamehamehaReloading(false);
              setKamehamehaCooldown(0);
            }
          }, intervalTime);
        }
      }, intervalTime);
    }
  };

  const [showSpiritPrompt, setShowSpiritPrompt] = useState(false);
  const [isSpiritBombCharging, setIsSpiritBombCharging] = useState(false);
  const [spiritChargeTimeLeft, setSpiritChargeTimeLeft] = useState(5.0);
  const [spiritClickCount, setSpiritClickCount] = useState(0);
  const spiritChargeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (spiritChargeIntervalRef.current) {
        clearInterval(spiritChargeIntervalRef.current);
      }
    };
  }, []);

  const handleClickSpirit = () => {
    if (
      isEnnemyKO ||
      isTransforming ||
      isSpiritBombReloading ||
      isSpiritBombCharging ||
      showSpiritPrompt ||
      SpiritBombVisible === "spirit-bomb-img-visible"
    )
      return;
    if (count < spiritBombCost) return;

    setCount(count - spiritBombCost);
    // Display instruction modal before starting the 5s timer
    setShowSpiritPrompt(true);
  };

  const startSpiritBombCharge = () => {
    setShowSpiritPrompt(false);
    setSpiritCount(50);
    setSpiritClickCount(0);
    setSpiritChargeTimeLeft(5.0);
    setIsSpiritBombCharging(true);
    setSpiritBombVisible("spirit-bomb-img-visible");

    if (soundEffectList[2]) {
      soundEffectList[2].play(effectVolume);
    }

    const duration = 5000;
    const startTime = Date.now();

    spiritChargeIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingMs = Math.max(0, duration - elapsed);
      setSpiritChargeTimeLeft(remainingMs / 1000);

      if (elapsed >= duration) {
        if (spiritChargeIntervalRef.current) {
          clearInterval(spiritChargeIntervalRef.current);
        }

        if (soundEffectList[3]) {
          soundEffectList[3].play(effectVolume);
        }

        const enemyCard = document.querySelector(".ennemy-container");
        if (enemyCard) {
          enemyCard.classList.add("kamehameha-impact");
          setTimeout(() => {
            enemyCard.classList.remove("kamehameha-impact");
          }, 800);
        }

        setSpiritCount((prevSpiritCount) => {
          const damage =
            prevSpiritCount * spiritMultiplier * (isKaiokenActive ? 3 : 1);

          setEnnemyLife((prevLife) => {
            if (prevLife > damage) {
              return Math.max(prevLife - damage, 0);
            }
            ennemyDefeated();
            return 0;
          });
          return 50;
        });

        setIsSpiritBombCharging(false);
        setSpiritBombVisible("spirit-bomb-img");
        setIsSpiritBombReloading(true);
        setSpiritBombCooldown(0);

        let elapsedReloadTime = 0;
        const intervalTime = 1000;
        const reloadInterval = setInterval(() => {
          elapsedReloadTime += intervalTime;
          const remainingMsReload =
            spiritBombReloadDuration - elapsedReloadTime;
          const remainingSec = Math.max(
            0,
            Math.ceil(remainingMsReload / 1000),
          );
          const minutes = Math.floor(remainingSec / 60);
          const seconds = remainingSec % 60;
          const formattedSec = seconds < 10 ? `0${seconds}` : `${seconds}`;

          setSpiritBombTimerText(`${minutes}m ${formattedSec}s`);
          setSpiritBombCooldown(
            Math.min(
              (elapsedReloadTime / spiritBombReloadDuration) * 100,
              100,
            ),
          );

          if (elapsedReloadTime >= spiritBombReloadDuration) {
            clearInterval(reloadInterval);
            setIsSpiritBombReloading(false);
            setSpiritBombCooldown(0);
            setSpiritBombTimerText("");
          }
        }, intervalTime);
      }
    }, 50);
  };

  const handleSpirit = () => {
    if (isEnnemyKO || isTransforming || !isSpiritBombCharging) return;
    setSpiritCount((prevSpiritCount) => prevSpiritCount + 5);
    setSpiritClickCount((prevCount) => prevCount + 1);

    if (soundEffectList[2]) {
      soundEffectList[2].play(effectVolume * 0.7);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount: number) => {
        let nextCount = prevCount + concentrationCount * concentrationIncrement;
        if (isKaiokenActive) {
          nextCount -= 15;
          if (nextCount <= 0) {
            nextCount = 0;
            setIsKaiokenActive(false);
          }
        }
        return nextCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    concentrationCount,
    concentrationIncrement,
    isKaiokenActive,
    setIsKaiokenActive,
    setCount,
  ]);

  // gif[0] = normal state
  // gif[1] = super saiyen transformation
  // gif[2] = super saiyen state
  // gif[3] = super saiyen 2 transformation
  // gif[4] = super saiyen 2 state
  // gif[5] = super saiyen 3 transformation
  // gif[6] = super saiyen 3 state
  // Transformation logic : if the player has enough points and is not already in a transformation, the gif will change to the
  // transformation gif and then to the state gif after the transformation gif duration
  const handleClickSsj = () => {
    if (isEnnemyKO || isTransforming) return;
    if (count >= superSaiyen1 && ![1, 2, 3].includes(gif)) {
      setGifSize("player-img-transition");
      setGif(1);

      setTimeout(() => {
        setGif(2);
        setGifSize("player-img-end");
      }, 10500);

      setCount(count - superSaiyen1);
    }
    setSaiyenState(1);
    setAttackMultiplier(5);
    setKamehamehaDamage(1000);
    setSpiritMultiplier(8);
  };

  const handleClickSsj2 = () => {
    if (isEnnemyKO || isTransforming) return;
    if (count >= superSaiyen2 && ![1, 3, 5].includes(gif)) {
      setGif(3);
      setGifSize("player-img-transition");

      setTimeout(() => {
        setGif(4);
        setGifSize("player-img-end");
      }, 3000);

      setCount(count - superSaiyen2);
    }
    setSaiyenState(2);
    setAttackMultiplier(10);
    setKamehamehaDamage(2500);
    setSpiritMultiplier(15);
  };

  const handleClickSsj3 = () => {
    if (isEnnemyKO || isTransforming) return;
    if (count >= superSaiyen3 && ![1, 3, 5].includes(gif)) {
      setGif(5);
      setGifSize("player-img-transition");

      setTimeout(() => {
        setGif(6);
        setGifSize("player-img-end");
      }, 12000);

      setCount(count - superSaiyen3);
    }
    setSaiyenState(3);
    setAttackMultiplier(15);
    setKamehamehaDamage(5000);
    setSpiritMultiplier(25);
  };

  return (
    <>
      {/* Explanation Modal BEFORE starting the 5s countdown */}
      {showSpiritPrompt && (
        <div className="spirit-prompt-modal-backdrop">
          <div className="spirit-prompt-modal">
            <h3 className="spirit-prompt-title">⚡ SPIRIT BOMB</h3>
            <p className="spirit-prompt-text">
              Cliquez le plus vite possible sur la Spirit Bomb pendant 5
              secondes pour concentrer son énergie et décupler ses dégâts !
            </p>
            <button
              type="button"
              className="spirit-prompt-btn"
              onClick={startSpiritBombCharge}
            >
              LANCER LA CHARGE !
            </button>
          </div>
        </div>
      )}

      {/* 5-Second Timer Badge during charge */}
      {isSpiritBombCharging && (
        <div className="spirit-timer-badge">
          ⏱️ TEMPS : {spiritChargeTimeLeft.toFixed(1)}s
        </div>
      )}

      {/* Spirit Bomb Orb Container - rendered ONLY when active */}
      {SpiritBombVisible === "spirit-bomb-img-visible" && (
        <aside className="spirit-container charging">
          <div
            className="spirit-bomb-wrapper"
            style={{
              transform: isSpiritBombCharging
                ? `scale(${Math.min(0.85 + spiritClickCount * 0.08, 4.2)})`
                : `scale(${spiritCount * 0.002})`,
            }}
          >
            <img
              src={spiritBombImg}
              className={SpiritBombVisible}
              alt="spirit bomb"
              onClick={handleSpirit}
              onKeyUp={handleSpirit}
            />
          </div>
        </aside>
      )}
      <section className="tech-container">
        <ul>
          <Option
            label={`Concentration du KI - Coût : ${concentrationCost}`}
            isAvailable={count >= concentrationCost}
            onClick={handleClickKi}
            className={techButtonStyle}
            title="Augmente le KI de 1 par seconde"
          />

          <Option
            label={`Kamehameha - Coût : ${kamehamehaCost}`}
            isAvailable={
              count >= kamehamehaCost &&
              !isKamehamehaChanneling &&
              !isKamehamehaReloading
            }
            onClick={handleClickKamehameha}
            className={kamehamehaStyle}
            title={`Inflige ${kamehamehaDamage * (isKaiokenActive ? 3 : 1)} points de dégâts.`}
            progress={kamehamehaCooldown}
            progressClassName="kamehameha-progress-bar"
          />

          <Option
            label={
              isSpiritBombReloading
                ? `Spirit Bomb (Recharge: ${spiritBombTimerText})`
                : `Spirit Bomb - Coût : ${spiritBombCost}`
            }
            isAvailable={
              count >= spiritBombCost &&
              !isSpiritBombReloading &&
              SpiritBombVisible !== "spirit-bomb-img-visible"
            }
            onClick={handleClickSpirit}
            className={spiritBombStyle}
            title={
              isSpiritBombReloading
                ? `Technique en rechargement (temps restant : ${spiritBombTimerText}).`
                : "Inflige des dégâts massifs en fonction de la taille de la Spirit Bomb (smash click). Multipliés par la transformation et le Kaioken."
            }
            progress={isSpiritBombReloading ? spiritBombCooldown : undefined}
            progressClassName="kamehameha-progress-bar"
          />

          {gif === 0 && (
            <Option
              label={isKaiokenActive ? "Kaioken" : "Kaioken Coût: 50"}
              isAvailable={count >= 50 || isKaiokenActive}
              onClick={toggleKaioken}
              className={isKaiokenActive ? "kaioken-active" : "kaioken"}
              title="Multiplie tous les dégâts infligés par 3, mais consomme 15 points de puissance par seconde."
            />
          )}

          {count >= superSaiyen1 && saiyenState === 0 && (
            <Option
              label="Super Saiyen"
              isAvailable={count >= superSaiyen1}
              onClick={handleClickSsj}
              className="saiyan-option"
              title="Augmente les dégats d'attaque de 5 et multiplie les techniques"
            />
          )}
          {count >= superSaiyen2 && saiyenState === 1 && (
            <Option
              label="Super Saiyen 2"
              isAvailable={count >= superSaiyen2}
              onClick={handleClickSsj2}
              className="saiyan-option"
              title="Augmente les dégats d'attaque de 10 et multiplie les techniques"
            />
          )}
          {count >= superSaiyen3 && saiyenState === 2 && (
            <Option
              label="Super Saiyen 3"
              isAvailable={count >= superSaiyen3}
              onClick={handleClickSsj3}
              className="saiyan-option"
              title="Augmente les dégats d'attaque de 15 et multiplie les techniques"
            />
          )}
        </ul>
      </section>
    </>
  );
}

export default Tech;
