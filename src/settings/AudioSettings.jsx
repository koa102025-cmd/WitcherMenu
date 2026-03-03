import React, { useRef, useEffect } from "react";
import mainStyles from "../css/WitcherMenu.module.css";
import audioStyles from "../css/AudioSettings.module.css";
import btnStyles from "../css/MenuButton.module.css";

import sliderSoundSrc from "../assets/sounds/parametr-sound.m4a";
import hoverSoundSrc from "../assets/sounds/button-change-sound.m4a";

const AudioSettings = ({ volumes, onVolumeChange }) => {
	const sliderAudioRef = useRef(null);
	const hoverAudioRef = useRef(null);

	useEffect(() => {
		sliderAudioRef.current = new Audio(sliderSoundSrc);
		sliderAudioRef.current.volume = 0.6;
		sliderAudioRef.current.preload = "auto";

		hoverAudioRef.current = new Audio(hoverSoundSrc);
		hoverAudioRef.current.volume = 0.5;
		hoverAudioRef.current.preload = "auto";
	}, []);

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

	const handleChange = (type, value, currentValue) => {
		if (parseInt(value) !== parseInt(currentValue)) {
			onVolumeChange(type, value);
			playStepSound();
		}
	};

	return (
		<div className={mainStyles.detailsPanel}>
			<div className={audioStyles.audioSettings}>
				{/* Music Volume Row */}
				<div
					className={`${audioStyles.settingRow} ${btnStyles.buttonWrapper}`}
					onMouseEnter={playHoverSound}>
					<span className={audioStyles.settingLabel}>Music Volume</span>
					<div className={audioStyles.sliderWrapper}>
						<span className={audioStyles.volumeNumber}>{volumes.music}</span>
						<div className={audioStyles.rangeContainer}>
							<input
								type="range"
								min="0"
								max="100"
								value={volumes.music}
								onChange={(e) =>
									handleChange("music", e.target.value, volumes.music)
								}
								className={audioStyles.witcherSlider}
							/>
						</div>
					</div>
				</div>

				{/* Effects Volume Row */}
				<div
					className={`${audioStyles.settingRow} ${btnStyles.buttonWrapper}`}
					onMouseEnter={playHoverSound}>
					<span className={audioStyles.settingLabel}>Effects Volume</span>
					<div className={audioStyles.sliderWrapper}>
						<span className={audioStyles.volumeNumber}>{volumes.effects}</span>
						<div className={audioStyles.rangeContainer}>
							<input
								type="range"
								min="0"
								max="100"
								value={volumes.effects}
								onChange={(e) =>
									handleChange("effects", e.target.value, volumes.effects)
								}
								className={audioStyles.witcherSlider}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AudioSettings;
