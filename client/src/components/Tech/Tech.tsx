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
    ennemyIndex,
    setEnnemyIndex,
    setGifSize,
    setEnnemyStyle,
    ennemy,
    // soundEffectList,
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
    setStyle(
      count >= concentrationCost ? "tech-option-available" : "tech-option",
    );
    setKamehamehaStyle(
      count >= kamehamehaCost ? "kamehameha-available" : "kamehameha",
    );
    setSpiritBombStyle(
      count >= spiritBombCost ? "spirit-bomb-available" : "spirit-bomb",
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

        setTimeout(() => {
          setEnnemyStyle("");
        }, 800);
      } else {
        alert(`Tu as battu ${ennemy[ennemyIndex].name} !`);
        setEnnemyIndex((ennemyIndex + 1) % ennemy.length);
      }
    }
  };

  const handleClickSpirit = () => {
    setSpiritBombVisible("spirit-bomb-img-visible");

    if (count >= spiritBombCost) {
      setCount(count - spiritBombCost);
      alert("Clique sur la Spirit bomb pour augmenter ses dégats !");
      setTimeout(() => {
        handleSpirit();
        setSpiritCount((prevSpiritCount) => {
          const damage = prevSpiritCount * spiritMultiplier;

          if (ennemyLife > damage) {
            setEnnemyLife(Math.max(ennemyLife - damage, 0));
            setEnnemyStyle("attacked");
            setTimeout(() => {
              setEnnemyStyle("");
            }, 800);
          } else {
            alert(`Tu as battu ${ennemy[ennemyIndex].name} !`);
            setEnnemyIndex((ennemyIndex + 1) % ennemy.length);
          }
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
    const interval = setInterval(() => {
      setCount(
        (prevCount: number) =>
          prevCount + concentrationCount * concentrationIncrement,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [concentrationCount, concentrationIncrement, setCount]);

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
