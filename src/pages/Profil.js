import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./Profil.css";
import { Link } from "react-router-dom";

class Profil extends React.Component {
	disconnect = () => {
		localStorage.clear();
		this.props.history.push("/login");
	};

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
					<div onClick={this.disconnect} className="profil-button">
						Déconnecter
					</div>
				</div>
				<Navbar />
			</React.Fragment>
		);
	}
}

export default Profil;
