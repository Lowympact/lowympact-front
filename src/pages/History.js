import React from "react";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";

function History() {
	return (
		<React.Fragment>
			<Header />
			<Navbar />
			<div className="App">
				<div>
				<img src={fruits} className="logo"/>
				<p className="logo-text">Commencer à scanner des produits!</p>
				</div>
			</div>
		</React.Fragment>
	);
}

export default History;
