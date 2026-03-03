import React, { useState } from "react";
import styles from "../css/WitcherMenu.module.css";
import MenuButton from "./MenuButton";
import logo from "../assets/images/logo.png";

const WitcherMenu = () => {
	const [activeId, setActiveId] = useState(1);
	const [currentMenu, setCurrentMenu] = useState("main");

	const mainItems = [
		{ id: 1, title: "Continue" },
		{ id: 2, title: "New Game" },
		{ id: 3, title: "Load Game" },
		{ id: 4, title: "Options", action: () => setCurrentMenu("options") },
		{ id: 5, title: "Exit" },
	];

	const optionsItems = [
		{ id: 10, title: "Audio" },
		{ id: 11, title: "Control Settings" },
		{ id: 12, title: "Controller Scheme" },
		{ id: 13, title: "Gameplay" },
		{ id: 14, title: "Display" },
		{ id: 15, title: "Language" },
		{ id: 16, title: "Credits" },
		{ id: 17, title: "Back", action: () => setCurrentMenu("main") },
	];

	const currentItems = currentMenu === "main" ? mainItems : optionsItems;

	const handleButtonClick = (item) => {
		if (item.action) {
			item.action();
			setActiveId(item.id === 17 ? 4 : 10);
		}
	};

	return (
		<div className={styles.mainScreen}>
			<div className={styles.sidePanel}>
				<div className={styles.logoContainer}>
					<img src={logo} className={styles.logo} alt="Witcher 3" />
					<span className={styles.version}>v 4.04</span>
				</div>

				<nav className={styles.menuNav}>
					{currentItems.map((item) => (
						<MenuButton
							key={item.id}
							label={item.title}
							isActive={item.id === activeId}
							onMouseEnter={() => setActiveId(item.id)}
							onMouseLeave={() => setActiveId(null)}
							onClick={() => handleButtonClick(item)}
						/>
					))}
				</nav>
			</div>
		</div>
	);
};

export default WitcherMenu;
