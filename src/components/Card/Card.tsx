
import "./card.css";

interface CardProps {
    gifSrc: string[];
    count: number;
    setCount: (count: number) => void;
}

function Card({gifSrc, count, setCount}: CardProps) {

    const handleClickCount = () => {
        setCount(count + 1);
    }

    return ( 
        <div className="card-container">
            {count <= 50 ? (<img src={gifSrc[0]} alt="goku base form" />) : (<img src={gifSrc[2]} width="390px" height="220px" alt="goku ssj1" />)}
            <button type="button" onClick={handleClickCount}>Power Level: {count}</button>
        </div>
     );
}

export default Card;