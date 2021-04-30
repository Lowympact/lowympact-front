import { React, Component } from "react";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./History.css";
import { ITEMS } from "../assets/scanned/items";

function RenderHistoryItem({ item }) {
	var labelColor;
	if (item.label == "Mauvais") {
		labelColor = "red";
	} else if (item.label == "Moyen") {
		labelColor = "yellow";
	} else if (item.label == "Bonne") {
		labelColor = "green";
	}

	return (
		<a className="history-item" href="/products/7613035974685/idbc">
			<div className="history-img-container">
				<img src={fruits} />
			</div>
			<div className="history-name-container">
				<div className="history-name">{item.name}</div>
				<div className="history-brand">{item.brand}</div>
			</div>
			<div className="history-label-container">
				<div style={{ color: labelColor }}>●</div>
				<div className="history-label">{item.label}</div>
			</div>
			<div style={{ marginRight: "10px", color: "rgb(41,72,102)" }}>
				{">"}
			</div>
		</a>
	);
}

class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: ITEMS,
		};
	}

	render() {
		const itemList = this.state.items.map((item) => {
			return (
				<div key={item.id}>
					<RenderHistoryItem item={item} />
				</div>
			);
		});

		if (Object.keys(this.state.items).length === 0)
			return (
				<div>
					<Header />
					<Navbar />
					<div className="App">
						<div>
							<img src={fruits} className="logo" alt="Fruits" />
							<p className="logo-text">
								Commencer à scanner des produits!
							</p>
						</div>
					</div>
				</div>
			);
		else
			return (
				<div>
					<div className="screen">
						<div className="screen-title">Historique:</div>
						{itemList}
					</div>
					<Header />
					<Navbar />
				</div>
			);
	}
}

export default History;
