import { React, Component } from "react";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./History.css";
import { ITEMS } from "../assets/scanned/items";
import { Link } from "react-router-dom";

function RenderHistoryItem({ item }) {
	var labelColor;
	if (item.label == "Mauvais") {
		labelColor = "red";
	} else if (item.label == "Moyen") {
		labelColor = "yellow";
	} else if (item.label == "Bonne") {
		labelColor = "green";
	}

	var pathProduct = "/products/" + item.id + "/idbc";

	return (
		<Link className="history-item" href={pathProduct}>
			<div className="history-img-container">
				<img src={item.image} />
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
		</Link>
	);
}

class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: undefined,
			userId: "608c28a01caad51a28b6531b", //TO DO : récupérer le vrai user ID qui est connecté, puis le token dans Auhtorization ? (voir avec les cookies)
		};
	}

	loadHistoryInformations = () => {
		fetch(`https://api.lowympact.fr/api/v1/users/${this.state.userId}`, {
			method: "get",
			credentials: "include",
			headers: new Headers({
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGMyOGEwMWNhYWQ1MWEyOGI2NTMxYiIsImlhdCI6MTYxOTg3MjUyNiwiZXhwIjoxNjIyNDY0NTI2fQ.AdOqff6fR1Ewjtfqe65mGwl_EbhEfIoVDmQSJj2HWA4",
				"Content-Type": "application/json",
			}),
		})
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				this.setState({
					items: res.data.history,
				});
			});
	};

	componentDidMount = () => {
		this.loadHistoryInformations();
	};

	render() {
		if (this.state.items) {
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
								<img
									src={fruits}
									className="logo"
									alt="Fruits"
								/>
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
		} else {
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
		}
	}
}

export default History;
