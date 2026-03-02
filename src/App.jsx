import "./App.css";
import WitcherMenu from "./components/WitcherMenu";
import videoBg from "./assets/images/geralt-live.mp4";
import BackgroundMusic from "./+components/BackgroundMusic";

function App() {
	return (
		<div className="app-container">
			<video autoPlay muted loop playsInline id="bg-video">
				<source src={videoBg} type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<div className="content">
				<BackgroundMusic />
				<WitcherMenu />
			</div>
		</div>
	);
}

export default App;
