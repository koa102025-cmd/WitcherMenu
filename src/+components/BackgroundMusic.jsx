import { useEffect, useRef } from "react";
import menuTheme from "../assets/sounds/witcher3-main-menu-theme.mp3";

const BackgroundMusic = () => {
	const audioRef = useRef(new Audio(menuTheme));

	useEffect(() => {
		const audio = audioRef.current;
		audio.loop = true;
		audio.volume = 0.4;

		const handleInteraction = () => {
			audio.play().catch(() => {});
		};

		window.addEventListener("click", handleInteraction, { once: true });
		window.addEventListener("keydown", handleInteraction, { once: true });

		return () => {
			window.removeEventListener("click", handleInteraction);
			window.removeEventListener("keydown", handleInteraction);
			audio.pause();
			audio.currentTime = 0;
		};
	}, []);

	return null;
};

export default BackgroundMusic;
