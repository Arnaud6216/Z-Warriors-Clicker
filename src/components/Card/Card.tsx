
import { useState } from "react";
import "./card.css";
import { useEffect } from "react";

interface CardProps {
    gifSrc: string[];
    count: number;
    setCount: (count: number) => void;
}


function Card({gifSrc, count, setCount}: CardProps) {

    const [gif, setGif] = useState(0);

    useEffect(() => {
        if (count >= 50 && gif === 0) {
            setGif(2);
        } else if (count >= 100 && gif === 2) {
            setGif(4);
        } else if (count >= 150 && gif === 4) {
            setGif(6);
        }
      }, [count, gif]);

    const handleClickCount = () => {
        setCount(count + 1);
    }

    return ( 
        <div className="card-container">
           <img
        src={gifSrc[gif]}
        alt={gif === 0 ? 'Goku base form' : 'Goku SSJ1'}
        width="390px"
        height="220px"
      />
            <button type="button" onClick={handleClickCount}>Power Level: {count}</button>
        </div>
     );
}

export default Card;