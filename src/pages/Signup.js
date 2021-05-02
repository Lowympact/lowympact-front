import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ButtonSignup from "../components/Button/ButtonSignup";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Header from "../components/Header/Header";
import "./Login.css";
import { Link } from "react-router-dom";

export const validEmail = new RegExp(
	"^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);

function validate(email, password, confirmPassword) {
	const errors = [];

	if (email.length === 0) {
		errors.push(<p>Saissez votre adresse e-mail</p>);
	}
	if (validEmail.test(email) === false) {
		errors.push(<p>Saissez une adresse e-mail valide</p>);
	}
	if (password.length < 6) {
		errors.push(<p>Entre un mot de passe. 6 caràcteres minimum requis</p>);
	}
	if (password !== confirmPassword) {
		errors.push(<p>Les mots de passe ne correspondent pas</p>);
	}
	return errors;
}

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			errors: [],
			redirect: false,
		};
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password, confirmPassword } = this.state;
		const errors = validate(email, password, confirmPassword);
		console.log(email, password, confirmPassword, errors);
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
				<Link to="/login">
					<Header />
				</Link>
				<div className="logo-fruits">
					<img src={fruits} className="logo" alt="Fruits" />
				</div>
				<Link className="back-button" to="/login">
					{"< retour"}
				</Link>

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
					<label>
						confirmer mot de passe
						<input
							value={this.state.passwordConfirm}
							onChange={(evt) =>
								this.setState({
									confirmPassword: evt.target.value,
								})
							}
							type="password"
						/>
					</label>
				</form>
				<label className="errors-signup">{this.state.errors}</label>
				<div className="button-signup" onClick={this.handleSubmit}>
					<ButtonSignup />
				</div>
			</React.Fragment>
		);
	}
}
export default Signup;
