import React from "react";

class Product extends React.Component {
	state = {
		barcode: this.props.match.params.barcode,
		bcProductId: this.props.match.params.bcProductId,
		product: undefined,
		productImageUrl: undefined,
		productName: undefined,
	};

	componentDidMount = () => {
		this.loadProductInformations();
		this.loadImage();
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

	loadImage = () => {
		fetch(
			`https://world.openfoodfacts.org/api/v0/product/${this.state.barcode}.json/`
		)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				let productImageUrl = res?.product?.image_url;
				let productName = res?.product?.product_name;

				if (productImageUrl) {
					this.setState({ productImageUrl: productImageUrl });
				}
				if (productName) {
					this.setState({ productName: productName });
				}
			});
	};

	render = () => {
		let image = <React.Fragment />;
		let productName = <React.Fragment />;
		if (this.state.productImageUrl) {
			image = (
				<img
					src={this.state.productImageUrl}
					className="product-image"
				/>
			);
		}
		if (this.state.productName) {
			productName = (
				<div className="product-name">{this.state.productName}</div>
			);
		}
		return (
			<div>
				{image}
				{productName}
			</div>
		);
	};
}

export default Product;
