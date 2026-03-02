import React from "react";
import styles from "../css/MenuButton.module.css";

const MenuButton = ({
	label,
	isActive,
	onMouseEnter,
	onMouseLeave,
	onClick,
}) => {
	return (
		<button
			className={`${styles.buttonWrapper} ${isActive ? styles.active : ""}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClick}>
			{label}
		</button>
	);
};

export default MenuButton;
