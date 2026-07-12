import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Context } from "../../services/Context";
import "./VictoryBanner.css";

function VictoryBanner() {
  const context = useContext(Context);

  if (!context) {
    return null;
  }

  const { defeatedEnnemyName } = context;

  return (
    <AnimatePresence>
      {defeatedEnnemyName && (
        <motion.div
          className="victory-banner-flash"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {defeatedEnnemyName && (
        <motion.div
          className="victory-banner"
          initial={{ opacity: 0, scale: 0.6, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="victory-banner-ko">K.O.</span>
          <span className="victory-banner-name">
            {defeatedEnnemyName} vaincu !
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VictoryBanner;
