import "./Navbar.css";
import React from "react";
import ButtonHistory from "../Button/ButtonHistory";
import ButtonProfil from "../Button/ButtonProfil";
import ButtonScan from "../Button/ButtonScan";

function Navbar() {
	return (
		<React.Fragment>
			<div className="navbar-container">
				<a href="/history" className="navbar-link navbar-text-left">
					<ButtonHistory />
				</a>
				<div className="navbar-circle">
					<ButtonScan />
				</div>
				<span className="navbar-scan-text">scan</span>
				<a href="/profil" className="navbar-link navbar-text-right">
					<ButtonProfil />
				</a>
			</div>
		</React.Fragment>
	);
}

export default Navbar;
