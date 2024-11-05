import { useEffect, useState } from "react";
import "./spec.css";

function Spec({count, setCount}) {

    const [concentrationCount, setConcentrationCount] = useState(0);
    const [style, setStyle] = useState("spec-option")
    const [concentrationCost, setConcentrationCost] = useState(20);

    const concentrationIncrement = 1; //nombre de points ajoutés par seconde


    //changer le style de l'option 1 quand celle ci est disponible
    useEffect(() => {
        if (count >= concentrationCost) {
          setStyle("spec-option-available");
        } else {
          setStyle("spec-option");
        }
      }, [count]); 
    //........................................//

    
    const handleClickKi = () => {
      if (count >= concentrationCost) {
        setCount(count - concentrationCost);
        setConcentrationCount(concentrationCount + 1);
        setConcentrationCost(concentrationCost + 5);
      } else {
        ""
      }
        };
        
    // Ajoute 1 point toute les secondes après avoir cliqué sur le li
        useEffect(() => {
            const interval = setInterval(() => {
                setCount(prevCount => prevCount + concentrationCount * concentrationIncrement);
            }, 1000);

            return () => clearInterval(interval);
        }, [concentrationCount]);
    //................................................//
    return ( 
        <>
        <div className="spec-container">
            <ul>
                <li className={style} onClick={handleClickKi}>Concentration du KI</li>
                <li></li>
            </ul>
        </div>
        </>
     );
}

export default Spec;