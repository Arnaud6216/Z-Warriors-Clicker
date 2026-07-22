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
    ennemyLife,
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
    ennemyIndex,
  } = context;

  const [techButtonStyle, setTechButtonStyle] = useState("tech-option");
  const [saiyenState, setSaiyenState] = useState(0);
  const [kamehamehaStyle, setKamehamehaStyle] = useState("kamehameha");
  const [spiritBombStyle, setSpiritBombStyle] = useState("spirit-bomb");
  const [SpiritBombVisible, setSpiritBombVisible] = useState("spirit-bomb-img");
  const [spiritCount, setSpiritCount] = useState(50);
  const [spiritMultiplier, setSpiritMultiplier] = useState(3);
  const [isSpiritBombUsed, setIsSpiritBombUsed] = useState(false);

  const [kamehamehaDamage, setKamehamehaDamage] = useState(150);

  const [kamehamehaDuration, setKamehamehaDuration] = useState(4500); // 4.5s fallback
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
  const superSaiyen2 = 3000;
  const superSaiyen3 = 5000;

  const kamehamehaCost = 150;
  const spiritBombBaseCost = 500;
  const spiritBombRechargeCost = 4000;

  const currentSpiritBombCost = isSpiritBombUsed
    ? spiritBombRechargeCost
    : spiritBombBaseCost;

  useEffect(() => {
    // display the available style if the player has enough points
    setTechButtonStyle(
      count >= concentrationCost ? "tech-option-available" : "tech-option",
    );
    setKamehamehaStyle(
      count >= kamehamehaCost ? "kamehameha-available" : "kamehameha",
    );
    setSpiritBombStyle(
      count >= currentSpiritBombCost &&
        SpiritBombVisible !== "spirit-bomb-img-visible"
        ? "spirit-bomb-available"
        : "spirit-bomb",
    );
  }, [count, concentrationCost, currentSpiritBombCost, SpiritBombVisible]);

  useEffect(() => {
    if (!isEnnemyKO && ennemyIndex >= 0) {
      setIsSpiritBombUsed(false);
    }
  }, [ennemyIndex, isEnnemyKO]);

  const handleClickKi = () => {
    if (isEnnemyKO || isTransforming) return;
    if (count >= concentrationCost) {
      setCount(count - concentrationCost);
      setConcentrationCount(concentrationCount + 1);
      setConcentrationCost(concentrationCost + 5);
    }
  };

  const handleClickKamehameha = () => {
    if (isEnnemyKO || isTransforming || isKamehamehaChanneling) return;
    if (count >= kamehamehaCost) {
      setCount(count - kamehamehaCost);

      // Snapshot damage at cast time
      const damageToApply = kamehamehaDamage * (isKaiokenActive ? 3 : 1);

      // Play the sound (index 4 in soundEffectList is kamehameha)
      soundEffectList[4].play(effectVolume);

      // Block button and start cooldown progress
      setIsKamehamehaChanneling(true);
      setKamehamehaCooldown(100);

      let remainingTime = kamehamehaDuration;
      const intervalTime = 100;
      kamehamehaIntervalRef.current = setInterval(() => {
        remainingTime -= intervalTime;
        setKamehamehaCooldown((remainingTime / kamehamehaDuration) * 100);
        if (remainingTime <= 0) {
          if (kamehamehaIntervalRef.current) {
            clearInterval(kamehamehaIntervalRef.current);
          }
          setIsKamehamehaChanneling(false);
          setKamehamehaCooldown(0);

          // Trigger impact shake animation on enemy card
          const enemyCard = document.querySelector(".ennemy-container");
          if (enemyCard) {
            enemyCard.classList.add("kamehameha-impact");
            setTimeout(() => {
              enemyCard.classList.remove("kamehameha-impact");
            }, 800);
          }

          // Apply damage at the end of the cooldown (when the Kamehameha hits)
          setEnnemyLife((prevLife) => {
            if (prevLife > damageToApply) {
              return Math.max(prevLife - damageToApply, 0);
            }
            ennemyDefeated();
            return 0;
          });
        }
      }, intervalTime);
    }
  };

  const handleClickSpirit = () => {
    if (
      isEnnemyKO ||
      isTransforming ||
      SpiritBombVisible === "spirit-bomb-img-visible"
    )
      return;
    if (count < currentSpiritBombCost) return;

    setCount(count - currentSpiritBombCost);
    setIsSpiritBombUsed(true);
    // display the spirit bomb : player has 5 seconds to smash click on it to increase the damage and grow the spirit bomb
    setSpiritBombVisible("spirit-bomb-img-visible");

    alert("Clique sur la Spirit bomb pour augmenter ses dégats !");
    setTimeout(() => {
      handleSpirit();
      setSpiritCount((prevSpiritCount) => {
        // set the damage by the number of clicks on the spirit bomb multiplied by the spirit multiplier
        const damage =
          prevSpiritCount * spiritMultiplier * (isKaiokenActive ? 3 : 1);

        if (ennemyLife > damage) {
          setEnnemyLife(Math.max(ennemyLife - damage, 0));
        } else {
          ennemyDefeated();
        }
        //reset the spirit bomb minimal damage
        return 50;
      });
      setSpiritBombVisible("spirit-bomb-img");
    }, 5000);
  };

  const handleSpirit = () => {
    if (isEnnemyKO || isTransforming) return;
    setSpiritCount((prevSpiritCount) => prevSpiritCount + 5);
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
    setKamehamehaDamage(400);
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
    setKamehamehaDamage(800);
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
    setKamehamehaDamage(1500);
    setSpiritMultiplier(25);
  };

  return (
    <>
      <aside className="spirit-container">
        <img
          src={spiritBombImg}
          className={SpiritBombVisible}
          alt="spirit bomb"
          onClick={handleSpirit}
          onKeyUp={handleSpirit}
          style={{
            transform: `scale(${spiritCount * 0.002})`,
          }}
        />
      </aside>
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
            isAvailable={count >= 40 && !isKamehamehaChanneling}
            onClick={handleClickKamehameha}
            className={kamehamehaStyle}
            title={`Inflige ${kamehamehaDamage * (isKaiokenActive ? 3 : 1)} points de dégâts.`}
            progress={kamehamehaCooldown}
            progressClassName="kamehameha-progress-bar"
          />

          <Option
            label={
              isSpiritBombUsed
                ? `Spirit Bomb (Recharge) - Coût : ${spiritBombRechargeCost}`
                : `Spirit Bomb - Coût : ${spiritBombBaseCost}`
            }
            isAvailable={
              count >= currentSpiritBombCost &&
              SpiritBombVisible !== "spirit-bomb-img-visible"
            }
            onClick={handleClickSpirit}
            className={spiritBombStyle}
            title={
              isSpiritBombUsed
                ? `Redébloquée pour cet ennemi au coût de ${spiritBombRechargeCost} points de puissance.`
                : "Inflige des dégâts massifs en fonction de la taille de la Spirit Bomb (smash click). Multipliés par la transformation et le Kaioken."
            }
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
