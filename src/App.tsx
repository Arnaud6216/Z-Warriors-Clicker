import './App.css'
import Card from './components/Card/Card';
import Spec from './components/Spec/Spec';
import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0);

 

  const gifSrc = ["src/assets/base.gif", "src/assets/ssj1-transition.gif", "src/assets/ssj1.gif", "src/assets/ssj2-transition.gif", "src/assets/ssj2.gif", "src/assets/ssj3-transition.gif", "src/assets/ssj3.gif"];


  return (
    <>
      <Card gifSrc={gifSrc} count={count} setCount={setCount}/>
      <Spec count={count} setCount={setCount} />
    </>
  )
}

export default App
