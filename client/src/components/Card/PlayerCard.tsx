import { useContext, useState } from "react";
import { Context } from "../../services/Context";
import { motion, AnimatePresence } from "framer-motion";
import "./card.css";

function Card() {
  const context = useContext(Context);
  const [animation, setAnimation] = useState("power-button");
  const [points, setPoints] = useState<{ id: number }[]>([]);

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

    // Ajoute une animation temporaire
    setAnimation("power-button power-button-animation");
    setTimeout(() => {
      setAnimation("power-button");
    }, 300); // Temps pour l'effet du bouton

    // Gère l'animation du "+1"
    const id = Date.now();
    setPoints((prev) => [...prev, { id }]);

    // Supprime l'effet après 1 seconde
    setTimeout(() => {
      setPoints((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  };

  return (
    <section className="player-container">
      <img src={gifSrc[0]} alt="Goku" className={`${gifSize} character-gif`} />
      <h2 className="player-title">Goku</h2>
      <article className="info-container">
        <h3>Puissance : {count}</h3>
        <p className="player-info">
          Attaque : <strong>x{attackMultiplier}</strong>{" "}
        </p>
        <p className="player-info">
          Puissance par seconde : <strong>+{concentrationCount}</strong>
        </p>
      </article>
      <article className="power-button-container">
        <div className="floating-points-container">
          <AnimatePresence>
            {points.map((point) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0, y: -70 }}
                transition={{ duration: 0.4 }}
                className="floating-point"
              >
                +1
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button
          className={animation}
          type="button"
          onClick={handleClickCount}
        />

        {/* Affichage des animations "+1" */}
      </article>
      <button type="button" onClick={() => setCount(count + 200)}>
        (dev) +200
      </button>
    </section>
  );
}

export default Card;
