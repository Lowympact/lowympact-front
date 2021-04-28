import React from "react";
import "./Scan.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import QrReader from "react-qr-reader";

class Scan extends React.Component {
	state = { redirect: false, routeRedirect: undefined };

	setRedirect = (resultText) => {
		this.setState({
			redirect: true,
			routeRedirect: "/products/" + resultText,
		});
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to={this.state.routeRedirect} />;
		}
	};

	handleError = (err) => {};

	handleScan = (res) => {
		console.log(res);
	};

	render = () => {
		return (
			<React.Fragment>
				{this.renderRedirect()}
				<span
					class="close"
					onClick={() => this.props.onCrossClicked(false)}
				>
					&times;
				</span>
				<QrReader
					delay={1}
					onError={this.handleError}
					onScan={this.handleScan}
					className="qrcode"
				/>
			</React.Fragment>
		);
	};
}

export default Scan;
