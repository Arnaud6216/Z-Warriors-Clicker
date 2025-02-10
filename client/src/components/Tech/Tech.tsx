import { useContext, useEffect, useState } from "react";
import { Context } from "../../services/Context";
import Option from "../options/Option";
import "./tech.css";

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
    setEnnemyStyle,
    ennemyDefeated,
  } = context;

  const [style, setStyle] = useState("tech-option");
  const [saiyenState, setSaiyenState] = useState(0);
  const [kamehamehaStyle, setKamehamehaStyle] = useState("kamehameha");
  const [spiritBombStyle, setSpiritBombStyle] = useState("spirit-bomb");
  const [SpiritBombVisible, setSpiritBombVisible] = useState("spirit-bomb-img");
  const [spiritCount, setSpiritCount] = useState(50);
  const [spiritMultiplier, setSpiritMultiplier] = useState(1);
  const [kamehamehaDamage, setKamehamehaDamage] = useState(50);

  const superSaiyen1 = 1000;
  const superSaiyen2 = 2000;
  const superSaiyen3 = 3000;

  const kamehamehaCost = 150;
  const spiritBombCost = 500;

  useEffect(() => {
    // display the available style if the player has enough points
    setStyle(
      count >= concentrationCost ? "tech-option-available" : "tech-option"
    );
    setKamehamehaStyle(
      count >= kamehamehaCost ? "kamehameha-available" : "kamehameha"
    );
    setSpiritBombStyle(
      count >= spiritBombCost ? "spirit-bomb-available" : "spirit-bomb"
    );
  }, [count, concentrationCost]);

  const handleClickKi = () => {
    if (count >= concentrationCost) {
      setCount(count - concentrationCost);
      setConcentrationCount(concentrationCount + 1);
      setConcentrationCost(concentrationCost + 5);
    }
  };

  //   const [isAvailable, setIsAvailable] = useState(true);

  // kamehameha avec la musique, bloqué pendant 15.8s mais il reste à trouver comment desactiver les autres boutons pendant ce temps
  //   const handleClickKamehameha = () => {
  //     if (!isAvailable) return; // Bloque l'action si non disponible

  //     soundEffectList[2].play();
  //     setIsAvailable(false);
  //     setTimeout(() => {
  //       setIsAvailable(true); // Rétablit la disponibilité après 15.8s
  //     }, 15800);
  //     if (count >= kamehamehaCost) {
  //       setCount(count - kamehamehaCost);
  //       if (ennemyLife > kamehamehaDamage) {
  //         setEnnemyLife(Math.max(ennemyLife - kamehamehaDamage, 0));

  //         setTimeout(() => {
  //           setEnnemyStyle("");
  //         }, 800);
  //       } else {
  //         alert(`Tu as battu ${ennemyList[ennemyIndex].name} !`);
  //         setEnnemyIndex((ennemyIndex + 1) % ennemyList.length);
  //       }
  //     }
  //   };

  const handleClickKamehameha = () => {
    setEnnemyStyle("attacked");
    if (count >= kamehamehaCost) {
      setCount(count - kamehamehaCost);
      if (ennemyLife > kamehamehaDamage) {
        setEnnemyLife(Math.max(ennemyLife - kamehamehaDamage, 0));
      } else {
        ennemyDefeated();
      }
    }
  };

  const handleClickSpirit = () => {
    // display the spirit bomb : player has 5 seconds to smash click on it to increase the damage and grow the spirit bomb
    setSpiritBombVisible("spirit-bomb-img-visible");

    if (count >= spiritBombCost) {
      setCount(count - spiritBombCost);
      alert("Clique sur la Spirit bomb pour augmenter ses dégats !");
      setTimeout(() => {
        handleSpirit();
        setSpiritCount((prevSpiritCount) => {
          // set the damage by the number of clicks on the spirit bomb mutiply by the spirit multiplier (based on saiyan state)
          const damage = prevSpiritCount * spiritMultiplier;

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
    }
  };

  const handleSpirit = () => {
    setSpiritCount((prevSpiritCount) => prevSpiritCount + 5);
  };

  useEffect(() => {
    //increment the count by the concentration count every second
    const interval = setInterval(() => {
      setCount(
        (prevCount: number) =>
          prevCount + concentrationCount * concentrationIncrement
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [concentrationCount, concentrationIncrement, setCount]);

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
    if (count >= superSaiyen1 && gif !== (1 || 2 || 3)) {
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
    setKamehamehaDamage(100);
    setSpiritMultiplier(1.5);
  };

  const handleClickSsj2 = () => {
    if (count >= superSaiyen2 && gif !== (1 || 3 || 5)) {
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
    setKamehamehaDamage(150);
    setSpiritMultiplier(2);
  };

  const handleClickSsj3 = () => {
    if (count >= superSaiyen3 && gif !== (1 || 3 || 5)) {
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
    setKamehamehaDamage(200);
    setSpiritMultiplier(3);
  };

  return (
    <>
      <div className="spirit-container">
        <img
          src="./src/assets/spirit-bomb.png"
          className={SpiritBombVisible}
          alt="spirit bomb"
          onClick={handleSpirit}
          onKeyUp={handleSpirit}
          style={{
            transform: `scale(${spiritCount * 0.002})`,
          }}
        />
      </div>
      <div className="tech-container">
        <ul>
          <Option
            label={`Concentration du KI - Coût : ${concentrationCost}`}
            isAvailable={count >= concentrationCost}
            onClick={handleClickKi}
            className={style}
            title="Augmente le KI de 1 par seconde"
          />

          <Option
            label={`Kamehameha - Coût : ${kamehamehaCost}`}
            isAvailable={count >= 40}
            onClick={handleClickKamehameha}
            className={kamehamehaStyle}
            title={`Inflige ${kamehamehaDamage} points de dégats.`}
          />

          <Option
            label={`Spirit Bomb - Coût : ${spiritBombCost}`}
            isAvailable={count >= 200}
            onClick={handleClickSpirit}
            className={spiritBombStyle}
            title="Inflige des dégats en fontion de la taille de la Spirit Bomb. Multipliés en fonction de l'état de Super Saiyen"
          />

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
      </div>
    </>
  );
}

export default Tech;
