import React from "react";
import Navbar from "../components/Navbar/Navbar";

class Product extends React.Component {
	state = {
		barcode: this.props.match.params.barcode,
		bcProductId: this.props.match.params.bcProductId,
		product: undefined,
		productImageUrl: undefined,
		productName: undefined,
		genericName: undefined,
		ecoScore: undefined,
	};

	componentDidMount = () => {
		this.loadProductInformations();
		this.loadFromOpenFoodFacts();
	};

	loadProductInformations = () => {
		fetch(
			`https://api.lowympact.fr/${this.state.barcode}/${this.state.bcProductId}`
		)
			.then((response) => response.json())
			.then((product) => {
				console.log(product);
				this.setState({ product: product });
			});
	};

	loadFromOpenFoodFacts = () => {
		fetch(
			`https://world.openfoodfacts.org/api/v0/product/${this.state.barcode}.json/`
		)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				let productImageUrl = res?.product?.image_url;
				let productName = res?.product?.product_name;
				let genericName = res?.product?.generic_name;
				let ecoScore = res?.product?.ecoscore_grade;

				if (productImageUrl) {
					this.setState({ productImageUrl: productImageUrl });
				}
				if (productName) {
					this.setState({ productName: productName });
				}
				if (genericName) {
					this.setState({ genericName: genericName });
				}
				if (ecoScore && ecoScore !== "not-applicable") {
					this.setState({ ecoScore: ecoScore });
				}
			});
	};

	render = () => {
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
			<div className="product-page-container">
				<div className="product-header-container">
					<div className="product-history-link">
						<a href="/history"> {"<"} Historique</a>
					</div>
					<img
						className="product-bitmap-image"
						src="/images/utils/bitmap.png"
						alt=""
					/>
				</div>
				<div className="product-image-container">
					{image}
					{productName}
					<div className="product-bottom-image-div">
						{genericName}
						{ecoScore}
					</div>
				</div>
				<div className="product-bottom-container"></div>
				<Navbar />
			</div>
		);
	};
}

export default Product;
