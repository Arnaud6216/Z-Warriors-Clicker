import "./spec.css";


function Spec({count, setCount}) {

    const handleClickKi = () => {
        setInterval(() => {
            setCount( count + 1);
          }, 1000);
          console.log(count);
        }
    
    return ( 
        <>
        <div className="spec-container">
            <ul>
                <li className="spec-option" onClick={handleClickKi}>Concentration du KI</li>
                <li className="spec-option"></li>
            </ul>
        </div>
        </>
     );
}

export default Spec;