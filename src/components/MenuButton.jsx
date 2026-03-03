import React, { useRef, useEffect } from "react";
import styles from "../css/MenuButton.module.css";
import hoverSound from "../assets/sounds/button-change-sound.m4a";
import clickSoundSrc from "../assets/sounds/category-sound.m4a";

const MenuButton = ({
	label,
	isActive,
	onMouseEnter,
	onMouseLeave,
	onClick,
}) => {
	const hoverAudioRef = useRef(null);
	const clickAudioRef = useRef(null);

	useEffect(() => {
		hoverAudioRef.current = new Audio(hoverSound);
		clickAudioRef.current = new Audio(clickSoundSrc);

		hoverAudioRef.current.preload = "auto";
		clickAudioRef.current.preload = "auto";
	}, []);

	const playSound = (audio) => {
		if (audio) {
			audio.currentTime = 0;
			audio.play().catch(() => {});
		}
	};

	const handleMouseEnter = (e) => {
		playSound(hoverAudioRef.current);
		if (onMouseEnter) onMouseEnter(e);
	};

	const handleClick = (e) => {
		playSound(clickAudioRef.current);
		if (onClick) onClick(e);
	};

	return (
		<button
			className={`${styles.buttonWrapper} ${isActive ? styles.active : ""}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={handleClick}>
			{label}
		</button>
	);
};

export default MenuButton;
