import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./Profil.css";
import { Link } from "react-router-dom";

class Profil extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Link to="/">
					<Header />
				</Link>
				<div className="profil-screen">
					<div className="profil-picture">
						<div class="material-icons">person</div>
					</div>
					<h2 className="profil-title">Bienvenue sur ton profil!</h2>
					<Link to="/configuration" className="profil-button">
						Configuration
					</Link>
					<Link to="/login" className="profil-button">
						Déconnecter
					</Link>
				</div>
				<Navbar />
			</React.Fragment>
		);
	}
}

export default Profil;
