import { React, Component } from "react";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./History.css";
// import { ITEMS } from "../assets/scanned/items";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function RenderHistoryItem({ item }) {
	var labelColor;
	if (item.label === "d" || item.label === "e") {
		labelColor = "red";
	} else if (item.label === "c") {
		labelColor = "yellow";
	} else if (item.label === "a" || item.label === "b") {
		labelColor = "green";
	}

	var pathProduct = "/products/" + item.barcode;
	if (item.bcProductId) {
		pathProduct += "/" + item.bcProductId;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
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
		</motion.div>
	);
}

class History extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: undefined,
			userId: undefined, //TO DO : récupérer le vrai user ID qui est connecté, puis le token dans Auhtorization ? (voir avec les cookies)
		};
	}

	componentDidMount = () => {
		let userId = localStorage.getItem("userId");
		let token = localStorage.getItem("token");
		if (userId && token) {
			this.setState({ userId: userId });
			this.loadHistoryInformations(userId);
		} else {
			this.loadLocalStorageHistory(userId);
		}
	};

	loadHistoryInformations = (userId) => {
		fetch(
			`https://api.lowympact.fr/api/v1/users/history/${userId}`,
			// `http://localhost:8080/api/v1/users/history/${userId}`,

			{
				method: "get",
				credentials: "include",
				headers: new Headers({
					authorization: localStorage.getItem("token"),
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

	loadLocalStorageHistory = () => {
		let history = JSON.parse(localStorage.getItem("local_history"));
		this.setState({
			items: history,
		});
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
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
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
					</motion.div>
				);
			else
				return (
					<div>
						<div className="screen">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="screen-title"
							>
								Historique:
							</motion.div>
							{itemList}
						</div>
						<Header />
						<Navbar />
					</div>
				);
		} else {
			return (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
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
				</motion.div>
			);
		}
	}
}

export default History;
