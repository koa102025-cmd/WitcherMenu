import React, { useState } from "react";
import styles from "../css/WitcherMenu.module.css";
import MenuButton from "./MenuButton";
import AudioSettings from "../settings/AudioSettings.jsx";
import LanguageSettings from "../settings/LanguageSettings.jsx";
import logo from "../assets/images/logo.png";

const WitcherMenu = ({ volumes, onVolumeChange, lang, setLang, t }) => {
	const [activeId, setActiveId] = useState(1);
	const [currentMenu, setCurrentMenu] = useState("main");

	// Safety check: if translations are missing, don't render to avoid crash
	if (!t) return null;

	const isSubMenuOpen = currentMenu === "audio" || currentMenu === "language";
	const screenClass = isSubMenuOpen
		? `${styles.mainScreen} ${styles.audioActive}`
		: styles.mainScreen;

	// Main Menu items using translated strings
	const mainItems = [
		{ id: 1, title: t.continue },
		{ id: 2, title: t.newGame },
		{ id: 3, title: t.loadGame },
		{ id: 4, title: t.options, action: () => setCurrentMenu("options") },
		{ id: 5, title: t.exit },
	];

	// Options Menu items
	const optionsItems = [
		{ id: 10, title: t.audio, action: () => setCurrentMenu("audio") },
		{ id: 11, title: t.controlSettings },
		{ id: 12, title: t.controllerScheme },
		{ id: 13, title: t.gameplay },
		{ id: 14, title: t.display },
		{ id: 15, title: t.language, action: () => setCurrentMenu("language") },
		{ id: 16, title: t.credits },
		{ id: 17, title: t.back, action: () => setCurrentMenu("main") },
	];

	const menuList = currentMenu === "main" ? mainItems : optionsItems;

	return (
		<div className={screenClass}>
			<div className={styles.sidePanel}>
				<div className={styles.logoContainer}>
					<img src={logo} className={styles.logo} alt="Witcher 3" />
					<span className={styles.version}>{t.version}</span>
				</div>

				<nav className={styles.menuNav}>
					{menuList.map((item) => (
						<MenuButton
							key={item.id}
							label={item.title}
							isActive={item.id === activeId}
							onMouseEnter={() => setActiveId(item.id)}
							onClick={() => item.action && item.action()}
							effectsVolume={volumes.effects}
						/>
					))}
				</nav>
			</div>

			{currentMenu === "audio" && (
				<AudioSettings
					volumes={volumes}
					onVolumeChange={onVolumeChange}
					t={t}
				/>
			)}

			{currentMenu === "language" && (
				<LanguageSettings
					currentLang={lang}
					setLang={setLang}
					t={t}
					effectsVolume={volumes.effects}
				/>
			)}
		</div>
	);
};

export default WitcherMenu;
