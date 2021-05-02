import { React, Component } from "react";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./History.css";
// import { ITEMS } from "../assets/scanned/items";
import { Link } from "react-router-dom";

function RenderHistoryItem({ item }) {
	var labelColor;
	if (item.label === "d" || item.label === "e") {
		labelColor = "red";
	} else if (item.label === "c") {
		labelColor = "yellow";
	} else if (item.label === "a" || item.label === "b") {
		labelColor = "green";
	}

	var pathProduct = "/products/" + item.barcode + "/idbc";

	return (
		<Link className="history-item" to={pathProduct}>
			<div className="history-img-container">
				<img src={item.image} alt="" />
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
			userId: "608e78f22893d35e90376d62", //TO DO : récupérer le vrai user ID qui est connecté, puis le token dans Auhtorization ? (voir avec les cookies)
		};
	}

	loadHistoryInformations = () => {
		fetch(
			`https://api.lowympact.fr/api/v1/users/history/${this.state.userId}`,
			// `http://localhost:8080/api/v1/users/history/${this.state.userId}`,

			{
				method: "get",
				credentials: "include",
				headers: new Headers({
					authorization:
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGMyOGEwMWNhYWQ1MWEyOGI2NTMxYiIsImlhdCI6MTYxOTg3MjUyNiwiZXhwIjoxNjIyNDY0NTI2fQ.AdOqff6fR1Ewjtfqe65mGwl_EbhEfIoVDmQSJj2HWA4",
					"Content-Type": "application/json",
					"api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
				}),
			}
		)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);

				this.setState({
					items: res?.data,
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
