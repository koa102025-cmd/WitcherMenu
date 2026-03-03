import "./App.css";
import { useState } from "react";
import WitcherMenu from "./components/WitcherMenu";
import videoBg from "./assets/images/geralt-live.mp4";
import BackgroundMusic from "./+components/BackgroundMusic";

function App() {
	const [bgSource, setBgSource] = useState(videoBg);

	return (
		<div className="app-container">
			<video key={bgSource} autoPlay muted loop playsInline id="bg-video">
				<source src={bgSource} type="video/mp4" />
			</video>
			<div className="content">
				<BackgroundMusic />
				<WitcherMenu onBgChange={setBgSource} />
			</div>
		</div>
	);
}

export default App;
