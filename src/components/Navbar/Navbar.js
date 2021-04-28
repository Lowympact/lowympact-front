import "./Navbar.css";
import React from "react";
import ButtonHistory from "../Button/ButtonHistory";
import ButtonProfil from "../Button/ButtonProfil";
import ButtonScan from "../Button/ButtonScan";
import Scan from "../Scan/Scan";

class Navbar extends React.Component {
	state = {
		showScanner: false,
	};

	handleScannerButton = (bool) => {
		this.setState({ showScanner: bool });
	};

	render = () => {
		if (this.state.showScanner) {
			return <Scan onCrossClicked={this.handleScannerButton} />;
		} else {
			return (
				<React.Fragment>
					<div className="navbar-container">
						<a
							href="/history"
							className="navbar-link navbar-text-left"
						>
							<ButtonHistory />
						</a>
						<div onClick={() => this.handleScannerButton(true)}>
							<div className="navbar-circle">
								<ButtonScan />
							</div>
						</div>
						<span className="navbar-scan-text">scan</span>
						<a
							href="/profil"
							className="navbar-link navbar-text-right"
						>
							<ButtonProfil />
						</a>
					</div>
				</React.Fragment>
			);
		}
	};
}

export default Navbar;
