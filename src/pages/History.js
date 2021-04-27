import React from "react";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import blob from "../assets/images/bitmap.png";
import './History.css';

function History() {
	return (
		<React.Fragment>
			<div>
				<img src={blob} className="blob-top" alt="Blob"/>
			</div>
			<Header />
			<Navbar />
			<div className="App">
				<div>
				<img src={fruits} className="logo" alt="Fruits"/>
				<p className="logo-text">Commencer à scanner des produits!</p>
				</div>
			</div>
			<div>
				<img src={blob} className="blob-left" alt="Blob"/>
			</div>
			<div>
				<img src={blob} className="blob-right" alt="Blob"/>
			</div>
		</React.Fragment>
	);
}

export default History;
