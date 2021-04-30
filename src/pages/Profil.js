import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./Profil.css";

class Profil extends React.Component {
	render() {
		return (
			<React.Fragment>
				<a href="/">
				<Header />
				</a>
				<div className="profil-screen">
					<div className="profil-picture">
						<div class="material-icons">
							person
						</div>
					</div>
					<h2 className="profil-title">Bienvenue sur ton profil!</h2>
					<a href="/configuration" className="profil-button">
						Configuration
					</a>
					<a href="/login" className="profil-button">
						Déconnecter
					</a>
				</div>
				<Navbar />
			</React.Fragment>
		);
	}
}

export default Profil;
