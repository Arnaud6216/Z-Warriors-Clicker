import './App.css';
import Card from './components/Card/Card';
import Spec from './components/Spec/Spec';
import { Provider } from './components/options/Context';

function App() {
    return (
        <Provider>
            <Card />
            <Spec />
        </Provider>
    );
}

export default App;