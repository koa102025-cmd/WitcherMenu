import React, { useState } from "react";
import styles from "../css/WitcherMenu.module.css";
import MenuButton from "./MenuButton";
import logo from "../assets/images/logo.png";

const WitcherMenu = () => {
	const [activeId, setActiveId] = useState(1);

	const menuItems = [
		{ id: 1, title: "Continue" },
		{ id: 2, title: "New Game" },
		{ id: 3, title: "Load Game" },
		{ id: 4, title: "Options" },
		{ id: 5, title: "Exit" },
	];

	return (
		<div className={styles.mainScreen}>
			<div className={styles.sidePanel}>
				<div className={styles.logoContainer}>
					<img src={logo} className={styles.logo} alt="Witcher 3" />
					<span className={styles.version}>v 4.04</span>
				</div>

				<nav className={styles.menuNav}>
					{menuItems.map((item) => (
						<MenuButton
							key={item.id}
							label={item.title}
							isActive={item.id === activeId}
							onMouseEnter={() => setActiveId(item.id)}
							onMouseLeave={() => setActiveId(null)}
							onClick={() => setActiveId(item.id)}
						/>
					))}
				</nav>
			</div>
		</div>
	);
};

export default WitcherMenu;
