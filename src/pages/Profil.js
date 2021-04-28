import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";

class Profil extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<div>
					<h1 className="profil-title">Bienvenue sur ton profil!</h1>
				</div>
				<Navbar />
			</React.Fragment>
		);
	}
}

export default Profil;
