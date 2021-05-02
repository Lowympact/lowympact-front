import "./Navbar.css";
import React from "react";
import ButtonHistory from "../Button/ButtonHistory";
import ButtonProfil from "../Button/ButtonProfil";
import ButtonScan from "../Button/ButtonScan";
import Scan from "../Scan/Scan";
import { ScanSettings } from "scandit-sdk";
import { Redirect, Link } from "react-router-dom";

class Navbar extends React.Component {
	state = {
		showScanner: false,
		barcode: undefined,
		bcProductId: undefined,
	};

	handleScannerButton = (bool) => {
		this.setState({ showScanner: bool });
	};

	handleBarcode = (res) => {
		if (res) {
			//détecté par barcode scanner
			let arr = res.split("/");
			if (arr.length > 1) {
				this.setState({
					barcode: arr[4],
					bcProductId: arr[5],
					showScanner: false,
				});
			} else {
				this.setState({
					barcode: arr[0],
					showScanner: false,
					bcProductId: undefined,
				});
			}
		}
	};

	render = () => {
		// if (window.innerHeight < 550) {
		// 	return <React.Fragment />;
		// }
		if (
			this.state.barcode &&
			this.state.bcProductId &&
			(this.props.barcode !== this.state.barcode ||
				this.props.bcProductId !== this.state.bcProductId)
		) {
			return (
				<Redirect
					to={
						"/products/" +
						this.state.barcode +
						"/" +
						this.state.bcProductId
					}
				/>
			);
		}

		if (this.state.barcode && this.props.barcode !== this.state.barcode) {
			return <Redirect to={"/products/" + this.state.barcode} />;
		}

		if (!this.state.showScanner) {
			return (
				<React.Fragment>
					<div className="navbar-container">
						<Link
							to="/history"
							className="navbar-link navbar-text-left"
						>
							<ButtonHistory />
						</Link>
						<div onClick={() => this.handleScannerButton(true)}>
							<div className="navbar-circle">
								<ButtonScan />
							</div>
						</div>
						<span className="navbar-scan-text">Scan</span>
						<Link
							to="/profil"
							className="navbar-link navbar-text-right"
						>
							<ButtonProfil />
						</Link>
					</div>
				</React.Fragment>
			);
		} else {
			return (
				<Scan
					onCrossClicked={this.handleScannerButton}
					// playSoundOnScan={true}
					vibrateOnScan={true}
					enableTorchToggle={true}
					enablePinchToZoom={true}
					enableCameraSwitcher={true}
					guiStyle={"viewfinder"}
					scanSettings={
						new ScanSettings({
							enabledSymbologies: [
								"qr",
								"ean8",
								"ean13",
								"upca",
								"upce",
								"code128",
								"code39",
								"code93",
								"itf",
							],
							codeDuplicateFilter: 1000,
						})
					}
					onScan={(scanResult) => {
						console.log(scanResult.barcodes[0].data);
						this.handleBarcode(scanResult.barcodes[0].data);
					}}
					onError={(error) => {
						console.error(error.message);
					}}
				/>
			);
		}
	};
}

export default Navbar;
