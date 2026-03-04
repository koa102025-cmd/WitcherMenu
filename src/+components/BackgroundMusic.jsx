import { useEffect, useRef } from "react";

const BackgroundMusic = ({ volume }) => {
	// Reference to persistent audio object
	const audioRef = useRef(new Audio("/witcher3-main-menu-theme.mp3"));

	// Handle initial setup and autoplay policy
	useEffect(() => {
		const audio = audioRef.current;
		audio.loop = true;

		// Play audio after user interacts with the page (browser requirement)
		const handleInteraction = () => {
			audio.play().catch(() => {});
		};

		window.addEventListener("click", handleInteraction, { once: true });
		window.addEventListener("keydown", handleInteraction, { once: true });

		return () => {
			window.removeEventListener("click", handleInteraction);
			window.removeEventListener("keydown", handleInteraction);
			audio.pause();
		};
	}, []);

	// Update volume whenever settings change
	useEffect(() => {
		if (audioRef.current) {
			// Apply a 0.3 multiplier to prevent background music from being too loud
			const maxVolumeLimit = 0.3;
			audioRef.current.volume = (volume / 100) * maxVolumeLimit;
		}
	}, [volume]);

	return null; // Component only handles audio logic, no UI
};

export default BackgroundMusic;
