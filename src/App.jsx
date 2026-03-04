import "./App.css";
import { useState } from "react";
import WitcherMenu from "./components/WitcherMenu";
import videoBg from "./assets/images/geralt-live.mp4";
import BackgroundMusic from "./+components/BackgroundMusic";

function App() {
	const [bgSource, setBgSource] = useState(videoBg);

	// Centralized audio state to sync music and UI effects
	const [volumes, setVolumes] = useState({ music: 100, effects: 100 });

	const handleVolumeChange = (type, value) => {
		setVolumes((prev) => ({ ...prev, [type]: value }));
	};

	return (
		<div className="app-container">
			{/* Dynamic Background Video */}
			<video key={bgSource} autoPlay muted loop playsInline id="bg-video">
				<source src={bgSource} type="video/mp4" />
			</video>

			<div className="content">
				<BackgroundMusic volume={volumes.music} />

				<WitcherMenu
					onBgChange={setBgSource}
					volumes={volumes}
					onVolumeChange={handleVolumeChange}
				/>
			</div>
		</div>
	);
}
export default App;
