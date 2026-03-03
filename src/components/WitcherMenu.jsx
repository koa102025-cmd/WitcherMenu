import React, { useState } from "react";
import styles from "../css/WitcherMenu.module.css";
import MenuButton from "./MenuButton";
import AudioSettings from "../settings/AudioSettings.jsx";
import logo from "../assets/images/logo.png";

const WitcherMenu = () => {
	const [activeId, setActiveId] = useState(1);
	const [currentMenu, setCurrentMenu] = useState("main");
	const [volumes, setVolumes] = useState({ music: 100, effects: 100 });

	const handleVolumeChange = (type, value) => {
		setVolumes((prev) => ({ ...prev, [type]: value }));
	};

	const screenClass =
		currentMenu === "audio"
			? `${styles.mainScreen} ${styles.audioActive}`
			: styles.mainScreen;

	const mainItems = [
		{ id: 1, title: "Continue" },
		{ id: 2, title: "New Game" },
		{ id: 3, title: "Load Game" },
		{ id: 4, title: "Options", action: () => setCurrentMenu("options") },
		{ id: 5, title: "Exit" },
	];

	const optionsItems = [
		{
			id: 10,
			title: "Audio",
			action: () => setCurrentMenu("audio"),
		},
		{ id: 11, title: "Control Settings" },
		{ id: 12, title: "Controller Scheme" },
		{ id: 13, title: "Gameplay" },
		{ id: 14, title: "Display" },
		{ id: 15, title: "Language" },
		{ id: 16, title: "Credits" },
		{
			id: 17,
			title: "Back",
			action: () => setCurrentMenu("main"),
		},
	];

	const menuList = currentMenu === "main" ? mainItems : optionsItems;

	return (
		<div className={screenClass}>
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
						/>
					))}
				</nav>
			</div>

			{currentMenu === "audio" && (
				<AudioSettings volumes={volumes} onVolumeChange={handleVolumeChange} />
			)}
		</div>
	);
};

export default WitcherMenu;
