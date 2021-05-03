import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	configure,
	BarcodePicker as ScanditSDKBarcodePicker,
} from "scandit-sdk";
import "./Scan.css";
import { motion, AnimatePresence } from "framer-motion";

// Configure the library and activate it with a license key
const configurationPromise = configure(
	"ASHf6Cx7DGz5BbkR5RWee94Ezm55DtkCAFB5HoNVQLhPf8gUhk8ypmZ72tbfAdIo33/I2gZR9pcXcdBwQGyYu69PkahqLA0dEEN5WFtpVEjMfQMiBhwmRWIJQgn+E54DiwJm/5CjsV1+Uy7AJWXnvrLiuwxG2D/b7b1QoPFJfkKp2OSreWJXnV/kJ+rtqFyNOu2wQb5Rq5IFXOU/tnjlTvJp8Kxl4jezOVoWlQZreaLKfxfBforPArJErC16cldrqFULYUdsPqb4Vn27hWUmPQTfaX/SbeDCl1h++IPmcvRpzwM9hY0ti7zzfhBKg3TgEYTMiPUipakmM21mU92xYjA9kmKO6bOjzY4XqyrWBUzv/C1TwJfK1aZDDLH8BOmqqJILi2Ty9fN84y09vBgv0dfXhQa3Q0/UW0Hnv0Xge2am3RY5dmE6pfWaxYyA3fDj920DpnlUNcAsfdErnvpZz8H1eftw6D2w3ps6q3jNFc/CTkALFZOk9Sy2u+lOfzvjKrcz5d1yoSo1sVhFsLWNUoaoHTP6NPnQaawC1YwPRp90T+2yNfx+iESAhn3qfn2pOEpBG0rHdZNLLj1yeNJU9Pjt7dznNeCJwG2SzSQvPZU5HzLuIu+siWjUPStB9WWMfVluWN3opv+ReRWBjBsaRFPBmit6LNbRk3QLT6To50yVZg8Zy1NuDFUoE+Ms2ytVn9fs30n1DeNYJLCWjQJ4ktQaz2mIFTOFvRVrJqPkTBwzOaAjWoPxOr097hga8bRhPAqV6ir7ojSffUeCjL/jmp1x1uSE4OaQe3Y32oC0XOVJqA==",
	{
		engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
	}
).catch((error) => {
	alert(error);
});

const style = {
	position: "absolute",
	top: "0",
	bottom: "0",
	left: "0",
	right: "0",
	margin: "auto",
	maxWidth: "1280px",
	maxHeight: "80%",
};

class Scan extends Component {
	static propTypes = {
		visible: PropTypes.bool,
		playSoundOnScan: PropTypes.bool,
		vibrateOnScan: PropTypes.bool,
		scanningPaused: PropTypes.bool,
		guiStyle: PropTypes.string,
		videoFit: PropTypes.string,
		scanSettings: PropTypes.object,
		enableCameraSwitcher: PropTypes.bool,
		enableTorchToggle: PropTypes.bool,
		enableTapToFocus: PropTypes.bool,
		enablePinchToZoom: PropTypes.bool,
		accessCamera: PropTypes.bool,
		camera: PropTypes.object,
		cameraSettings: PropTypes.object,
		targetScanningFPS: PropTypes.number,
		onScan: PropTypes.func,
		onError: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		configurationPromise.then(() => {
			ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(
				(barcodePicker) => {
					this.barcodePicker = barcodePicker;

					if (this.props.onScan != null) {
						barcodePicker.on("scan", this.props.onScan);
					}
					if (this.props.onError != null) {
						barcodePicker.on("scanError", this.props.onError);
					}
				}
			);
		});
	}

	componentWillUnmount() {
		if (this.barcodePicker != null) {
			this.barcodePicker.destroy();
		}
	}

	componentDidUpdate(prevProps) {
		// These are just some examples of how to react to some possible property changes

		if (
			JSON.stringify(prevProps.scanSettings) !==
			JSON.stringify(this.props.scanSettings)
		) {
			this.barcodePicker.applyScanSettings(this.props.scanSettings);
		}

		if (prevProps.visible !== this.props.visible) {
			this.barcodePicker.setVisible(this.props.visible);
		}
	}

	render() {
		return (
			<AnimatePresence exitBeforeEnter={true}>
				<motion.div
					id="background-scan"
					initial={{ bottom: "-1000px" }}
					animate={{ bottom: "0px" }}
					transition={{ duration: 0.5 }}
					exit={{ bottom: "-1000px" }}
				>
					<div ref={this.ref} style={style} />
					<span
						class="close"
						onClick={() => {
							this.props.onCrossClicked(false);
						}}
					>
						&times;
					</span>
					<div id="scandit-barcode-picker"></div>
				</motion.div>
			</AnimatePresence>
		);
	}
}

export default Scan;
