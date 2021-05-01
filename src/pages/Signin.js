import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ButtonSignin from "../components/Button/ButtonSignin";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Header from "../components/Header/Header";
import blob from "../assets/images/bitmap.png";
import "./Login.css";
import { Link } from "react-router-dom";

function validate(email, password) {
	const errors = [];

	if (email.length === 0) {
		errors.push(<p>Saissez votre adresse e-mail</p>);
	}
	if (password.length === 0) {
		errors.push(<p>Saissez votre mot de passe</p>);
	}
	return errors;
}

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: [],
			redirect: false,
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		const errors = validate(email, password);
		console.log(email, password, errors);
		this.setState({ errors });
		if (errors.length === 0) {
			this.setState({ redirect: true });
		}
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/history" />;
		}
		return (
			<React.Fragment>
				//Background style
				<div>
					<img src={blob} className="blob-top" alt="Blob" />
				</div>
				<Link href="/login">
					<Header />
				</Link>
				<div className="logo-fruits">
					<img src={fruits} className="logo" alt="Fruits" />
				</div>
				// Signup Forms
				<form>
					<label>
						email
						<input
							value={this.state.email}
							onChange={(evt) =>
								this.setState({ email: evt.target.value })
							}
							type="text"
						/>
					</label>
					<label>
						mot de passe
						<input
							value={this.state.password}
							onChange={(evt) =>
								this.setState({ password: evt.target.value })
							}
							type="password"
						/>
					</label>
				</form>
				<label className="errors-signin">{this.state.errors}</label>
				<div className="button-signin" onClick={this.handleSubmit}>
					<ButtonSignin />
				</div>
			</React.Fragment>
		);
	}
}
export default Signin;
