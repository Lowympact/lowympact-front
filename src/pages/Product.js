import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Traceability from "../components/Traceability/Traceability";
import Environnement from "../components/Environnement/Environnement";
import "./Product.css";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

class Product extends React.Component {
	state = {
		barcode: this.props.match.params.barcode,
		bcProductId: this.props.match.params.bcProductId,
		product: undefined,
		productImageUrl: undefined,
		productName: undefined,
		genericName: undefined,
		ecoScore: undefined,
		dataEcoScore: undefined,
		value: 0,
		connected: false,
		productData: undefined,
		userId: undefined,
		cart: 0,
	};

	handleBarCodeUpdate = () => {
		if (this.state.barcode !== this.props.match.params.barcode) {
			this.setState({
				barcode: this.props.match.params.barcode,
				bcProductId: this.props.match.params.bcProductId,
			});
			this.loadFromOpenFoodFacts(this.props.match.params.barcode);
			if (this.props.match.params.bcProductId) {
				this.loadProductInformations(
					this.props.match.params.barcode,
					this.props.match.params.bcProductId
				);
			}
		}
	};

	Verify = () => {
		let isExpired = true;
		const token = localStorage.getItem("token");
		if (token) {
			var decodedToken = jwt.decode(token, { complete: true });
			var dateNow = new Date();
			if (decodedToken.payload.exp >= dateNow.getTime() / 1000) {
				isExpired = false;
			}
		}
		if (isExpired === false) {
			this.setState({ connected: true });
		}
	};

	componentDidMount = () => {
		this.Verify();
		let userId = localStorage.getItem("userId");
		if (userId) {
			this.setState({ userId: userId });
		}
		this.loadFromOpenFoodFacts(this.props.match.params.barcode);
		if (this.props.match.params.bcProductId) {
			this.loadProductInformations(
				this.props.match.params.barcode,
				this.props.match.params.bcProductId
			);
		}
	};
	loadProductInformations = (barcode, bcProductId) => {
		fetch(
			`https://api.lowympact.fr/api/v1/products/${barcode}?bcProductId=${bcProductId}`,
			// `http://localhost:8080/api/v1/products/${this.state.barcode}?bcProductId=${this.state.bcProductId}`,
			{
				method: "get",
				credentials: "include",
				headers: new Headers({
					Authorization:
						"Bearer 99d8fb95-abdd-4885-bf6c-3a81d8874043",
					"Content-Type": "application/json",
				}),
			}
		)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				this.setState({
					products: res?.data?.traceability,
					impact: res?.data?.impact,
				});
			});
	};

	loadFromOpenFoodFacts = (barcode) => {
		fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json/`)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				let productImageUrl = res?.product?.image_url;
				let productName = res?.product?.product_name;
				let genericName = res?.product?.generic_name;
				let ecoScore = res?.product?.ecoscore_grade;

				let dataEcoScore = res?.product?.ecoscore_data;

				if (res?.product) {
					this.setState({ productData: res.product });
				}

				if (productImageUrl) {
					this.setState({ productImageUrl: productImageUrl });
				}
				if (productName) {
					this.setState({ productName: productName });
				}
				if (genericName) {
					this.setState({ genericName: genericName });
				}
				if (
					ecoScore &&
					(ecoScore === "a" ||
						ecoScore === "b" ||
						ecoScore === "c" ||
						ecoScore === "d" ||
						ecoScore === "e")
				) {
					this.setState({ ecoScore: ecoScore });
				}
				if (dataEcoScore) {
					this.setState({ dataEcoScore: dataEcoScore });
				}
				if (res.status === 1) {
					this.saveHistory();
				}
			});
	};

	saveHistory = async () => {
		await delay(2000);

		if (!this.state.connected) {
			let history = JSON.parse(localStorage.getItem("local_history"));
			let exist = null;
			if (history) {
				exist = history?.find(
					(element) =>
						element.barcode === this.state.barcode &&
						element.bcProductId == this.state.bcProductId
				);
			} else {
				history = [];
			}

			if (!exist || exist?.length === 0) {
				history.push({
					barcode: this.state.barcode,
					bcProductId: this.state.bcProductId,
					brand: this.state.productData.brands,
					image: this.state.productImageUrl,
					label: this.state.ecoScore,
					name: this.state.productName,
				});
				localStorage.setItem("local_history", JSON.stringify(history));
			}
		} else if (this.state.userId) {
			console.log(this.state.barcode, this.state.bcProductId);
			fetch(
				`https://api.lowympact.fr/api/v1/users/history/${this.state.userId}`,
				// `http://localhost:8080/api/v1/users/history/${this.state.userId}`,
				{
					method: "put",
					credentials: "include",
					headers: new Headers({
						Authorization: localStorage.getItem("token"),
						"api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
						"Content-Type": "application/json",
					}),
					body: JSON.stringify({
						barcode: this.state.barcode,
						bcProductId: this.state.bcProductId,
					}),
				}
			)
				.then((response) => response.json())
				.then((res) => {
					console.log(res);
				});
		}
	};

	addToCart = () => {
		this.setState({ cart: this.state.cart + 1 });
		this.flip();
	};

	removeFromCart = () => {
		if (this.state.cart > 0) {
			this.setState({ cart: this.state.cart - 1 });
		}
		this.flip();
	};

	flip = (event) => {
		console.log(this.imageFlip.style.transform);
		if (this.imageFlip) {
			if (this.imageFlip.style.transform === "rotateY(360deg)") {
				this.imageFlip.style.transform = "rotateY(0deg)";
			} else {
				this.imageFlip.style.transform = "rotateY(360deg)";
			}
		}
	};

	displayImage = () => {
		this.handleBarCodeUpdate();

		let image = <React.Fragment />;
		let productName = <React.Fragment />;
		let genericName = <React.Fragment />;
		let ecoScore = <React.Fragment />;
		if (this.state.productImageUrl) {
			image = (
				<img
					src={this.state.productImageUrl}
					className="product-image"
					alt="produit"
				/>
			);
		}

		if (this.state.productName) {
			productName = (
				<div className="product-name">{this.state.productName}</div>
			);
		}
		if (this.state.ecoScore) {
			let scoreClass = "color_score_" + this.state.ecoScore;
			ecoScore = (
				<div className="product-ecoscore">
					<span className={"circle-score " + scoreClass}>⬤ </span>
					EcoScore :
					<span className="uppercase ">
						{" " + this.state.ecoScore}
					</span>
				</div>
			);
		} else if (this.state.genericName) {
			genericName = (
				<div className="product-generic-name">
					{this.state.genericName}
				</div>
			);
		}
		return (
			<React.Fragment>
				<div
					className={
						this.state.cart > 0
							? "add-to-cart green"
							: "add-to-cart"
					}
					onClick={this.addToCart}
				>
					<span className="cart-count">
						{this.state.cart > 0 ? this.state.cart : ""}
					</span>
					<span class="material-icons">add_shopping_cart</span>
				</div>
				{this.state.cart > 0 ? (
					<div
						className="remove-from-cart"
						onClick={this.removeFromCart}
					>
						<span class="material-icons">remove_shopping_cart</span>
					</div>
				) : (
					<React.Fragment />
				)}
				{image}
				{productName}
				<div className="product-bottom-image-div">
					{genericName}
					{ecoScore}
				</div>
			</React.Fragment>
		);
	};

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	displayNavbar = () => {
		let retour = <React.Fragment />;
		if (this.state.bcProductId) {
			retour = (
				<div className="product-navbar-container">
					<button
						className={
							this.state.value === 0
								? "product-navbar-button selected"
								: "product-navbar-button"
						}
						onClick={() => this.handleChange("", 0)}
					>
						Environnement
					</button>
					<button
						className={
							this.state.value === 1
								? "product-navbar-button selected"
								: "product-navbar-button"
						}
						onClick={() => this.handleChange("", 1)}
					>
						Traçabilité
					</button>
					<div
						className={
							this.state.value === 0
								? "navbar-under nav-left"
								: "navbar-under nav-right"
						}
					></div>
				</div>
			);
		}
		return retour;
	};

	render = () => {
		//tri des produits
		let products = this.state.products?.sort((a, b) => {
			if (a.depth > b.depth) return -1;
			else return 1;
		});
		return (
			<React.Fragment>
				<div className="product-page-container">
					<div className="product-header-container">
						<div className="product-history-link">
							<Link to="/history"> {"<"} Historique</Link>
						</div>
						<img
							className="product-bitmap-image"
							src="/images/utils/bitmap.png"
							alt=""
						/>
					</div>
					<div
						className="product-image-container"
						// onClick={this.flip}
						ref={(ref) => (this.imageFlip = ref)}
					>
						{this.displayImage()}
					</div>

					{this.displayNavbar()}

					{/* <AppBar position="static">
						<Tabs
							value={this.state.value}
							onChange={this.handleChange}
							aria-label="simple tabs example"
						>
							<Tab label="Traçabilité" />
							<Tab label="Environnement" />
						</Tabs>
					</AppBar>
					<TabPanel value={this.state.value} index={0}></TabPanel>
					<TabPanel value={this.state.value} index={1}>
				</TabPanel> */}
					{this.state.value === 0 ? (
						<Environnement
							dataEcoScore={this.state.dataEcoScore}
						></Environnement>
					) : (
						<div className="product-bottom-container">
							<Traceability products={products} />
						</div>
					)}
					<Navbar
						barcode={this.props.match.params.barcode}
						bcProductId={this.props.match.params.bcProductId}
					/>
				</div>
			</React.Fragment>
		);
	};
}

export default Product;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
