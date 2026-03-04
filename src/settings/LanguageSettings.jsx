import React, { useRef, useEffect } from "react";
import mainStyles from "../css/WitcherMenu.module.css";
import audioStyles from "../css/AudioSettings.module.css";
import btnStyles from "../css/MenuButton.module.css";

// Assets for sounds
import sliderSoundSrc from "../assets/sounds/parametr-sound.m4a";
import hoverSoundSrc from "../assets/sounds/button-change-sound.m4a";

const LanguageSettings = ({ currentLang, setLang, t, effectsVolume }) => {
	const sliderAudioRef = useRef(null);
	const hoverAudioRef = useRef(null);

	// Initialize audio instances
	useEffect(() => {
		sliderAudioRef.current = new Audio(sliderSoundSrc);
		hoverAudioRef.current = new Audio(hoverSoundSrc);
		sliderAudioRef.current.preload = "auto";
		hoverAudioRef.current.preload = "auto";
	}, []);

	// Sync sound volume with global settings
	useEffect(() => {
		const safeVolume = typeof effectsVolume === "number" ? effectsVolume : 100;
		const vol = safeVolume / 100;

		if (sliderAudioRef.current) {
			sliderAudioRef.current.volume = isFinite(vol) ? vol : 1;
		}
		if (hoverAudioRef.current) {
			hoverAudioRef.current.volume = isFinite(vol) ? vol : 1;
		}
	}, [effectsVolume]);

	if (!t) return null;

	// Mapping for 3 positions: 0 (EN), 50 (NO), 100 (RU)
	const langToValue = { en: 0, no: 50, ru: 100 };
	const valueToLang = { 0: "en", 50: "no", 100: "ru" };

	const playHoverSound = () => {
		if (hoverAudioRef.current) {
			hoverAudioRef.current.currentTime = 0;
			hoverAudioRef.current.play().catch(() => {});
		}
	};

	const playStepSound = () => {
		if (sliderAudioRef.current) {
			const soundNode = sliderAudioRef.current.cloneNode();
			soundNode.volume = sliderAudioRef.current.volume;
			soundNode.play().catch(() => {});
			soundNode.onended = () => soundNode.remove();
		}
	};

	const handleSliderChange = (e) => {
		const value = parseInt(e.target.value);
		const newLang = valueToLang[value];

		if (newLang && newLang !== currentLang) {
			setLang(newLang);
			playStepSound();
		}
	};

	// Helper to display the correct label on the slider
	const getLangLabel = () => {
		switch (currentLang) {
			case "en":
				return "ENGLISH";
			case "no":
				return "NORSK";
			case "ru":
				return "РУССКИЙ";
			default:
				return "ENGLISH";
		}
	};

	return (
		<div className={mainStyles.detailsPanel}>
			<div className={audioStyles.audioSettings}>
				{/* Language Slider Row */}
				<div
					className={`${audioStyles.settingRow} ${btnStyles.buttonWrapper}`}
					onMouseEnter={playHoverSound}>
					<span className={audioStyles.settingLabel}>Text</span>

					<div className={audioStyles.sliderWrapper}>
						{/* Dynamic Label */}
						<span
							className={audioStyles.volumeNumber}
							style={{ minWidth: "100px" }}>
							{getLangLabel()}
						</span>

						<div className={audioStyles.rangeContainer}>
							<input
								type="range"
								min="0"
								max="100"
								step="50" // Step 50 allows 3 positions: 0, 50, 100
								value={langToValue[currentLang] ?? 0}
								onChange={handleSliderChange}
								className={audioStyles.witcherSlider}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LanguageSettings;
