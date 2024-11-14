import "./App.css";
import EnnemyCard from "./components/Card/EnnemyCard";
import Card from "./components/Card/PlayerCard";
import Spec from "./components/Spec/Spec";
import { Provider } from "./components/options/Context";

function App() {
	return (
		<Provider>
			<Card />
			<Spec />
			<EnnemyCard />
		</Provider>
	);
}

export default App;
