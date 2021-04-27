import { React, Component } from "react";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import blob from "../assets/images/bitmap.png";
import "./History.css";
import { ITEMS } from "../assets/scanned/items";

function RenderHistoryItem({ item }) {
	return (
		<div className="history-item">
			<h1>{item.name}</h1>
		</div>
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
					<div>
						<img src={blob} className="blob-top" alt="Blob" />
					</div>
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
					<div>
						<img src={blob} className="blob-left" alt="Blob" />
					</div>
					<div>
						<img src={blob} className="blob-right" alt="Blob" />
					</div>
				</div>
			);
		else
			return (
				<div>
					<div className="screen">{itemList}</div>
					<Header />
					<Navbar />
				</div>
			);
	}
}

export default History;
