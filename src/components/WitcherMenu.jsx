import React, { useState } from "react";
// Component and assets imports...
import styles from "../css/WitcherMenu.module.css";
import MenuButton from "./MenuButton";
import AudioSettings from "../settings/AudioSettings.jsx";
import logo from "../assets/images/logo.png";

const WitcherMenu = ({ volumes, onVolumeChange }) => {
	const [activeId, setActiveId] = useState(1);
	const [currentMenu, setCurrentMenu] = useState("main");

	// Dynamic class for layout transitions
	const screenClass =
		currentMenu === "audio"
			? `${styles.mainScreen} ${styles.audioActive}`
			: styles.mainScreen;

	// Navigation Menu Configurations
	const mainItems = [
		{ id: 1, title: "Continue" },
		{ id: 2, title: "New Game" },
		{ id: 3, title: "Load Game" },
		{ id: 4, title: "Options", action: () => setCurrentMenu("options") },
		{ id: 5, title: "Exit" },
	];

	const optionsItems = [
		{ id: 10, title: "Audio", action: () => setCurrentMenu("audio") },
		{ id: 11, title: "Control Settings" },
		{ id: 12, title: "Controller Scheme" },
		{ id: 13, title: "Gameplay" },
		{ id: 14, title: "Display" },
		{ id: 15, title: "Language" },
		{ id: 16, title: "Credits" },
		{ id: 17, title: "Back", action: () => setCurrentMenu("main") },
	];

	const menuList = currentMenu === "main" ? mainItems : optionsItems;

	return (
		<div className={screenClass}>
			{/* Left Side Navigation Panel */}
			<div className={styles.sidePanel}>
				<div className={styles.logoContainer}>
					<img src={logo} className={styles.logo} alt="Witcher 3" />
					<span className={styles.version}>v 4.04</span>
				</div>

				<nav className={styles.menuNav}>
					{menuList.map((item) => (
						<MenuButton
							key={item.id}
							label={item.title}
							isActive={item.id === activeId}
							onMouseEnter={() => setActiveId(item.id)}
							onClick={() => item.action && item.action()}
							effectsVolume={volumes.effects} // Global effects sync
						/>
					))}
				</nav>
			</div>

			{/* Submenu Panels Rendering */}
			{currentMenu === "audio" && (
				<AudioSettings volumes={volumes} onVolumeChange={onVolumeChange} />
			)}
		</div>
	);
};

export default WitcherMenu;
