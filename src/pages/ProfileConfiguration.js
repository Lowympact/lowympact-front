import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ButtonChangePassword from "../components/Button/ButtonChangePassword";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import "./ProfileConfiguration.css";
import { USERS } from "../assets/users/users";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";

function validate(password, currentPassword, newPassword, confirmPassword) {
	const errors = [];

	if (password !== currentPassword) {
		errors.push(<p>Le mot de passe actueil n'est pas correct</p>);
	}
	if (newPassword.length < 6) {
		errors.push(<p>Entre un mot de passe. 6 caràcteres minimum requis</p>);
	}
	if (newPassword !== confirmPassword) {
		errors.push(<p>Les mots de passe ne correspondent pas</p>);
	}
	return errors;
}

class ProfileConfiguration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: USERS,
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
			errors: [],
			redirect: false,
		};
	}

	handleChange = (e) => {
		e.preventDefault();
		const { currentPassword, newPassword, confirmPassword } = this.state;
		const errors = validate(
			this.state.user.password,
			currentPassword,
			newPassword,
			confirmPassword
		);
		console.log(
			this.state.user.mail,
			this.state.user.password,
			currentPassword,
			newPassword,
			confirmPassword,
			errors
		);
		this.setState({ errors });
		if (errors.length === 0) {
			this.setState({ redirect: true });
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
		if (isExpired === true) {
			// this.props.history.push("/");
			this.setState({ redirect: true }); // redirection vers la page login
		}
	};

	componentDidMount = () => {
		this.Verify();
		let userId = localStorage.getItem("userId");
		if (userId) {
			this.loadUserInfo(userId);
		}
	};

	loadUserInfo = (userId) => {
		fetch(
			`https://api.lowympact.fr/api/v1/users/${userId}`,
			// `http://localhost:8080/api/v1/users/login`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
					authorization: localStorage.getItem("token"),
					//'x-access-token': localStorage.getItem('token'),
				},
			}
		)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);

				this.setState({ user: res.data });
			});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to="/profil" />;
		}
		console.log(this.state.redirect);
		return (
			<React.Fragment>
				<Link to="/">
					<Header />
				</Link>
				<Navbar />
				<div className="logo-fruits">
					<img src={fruits} className="logo" alt="Fruits" />
				</div>
				<Link className="back-button" to="/profil">
					{"< retour"}
				</Link>
				{/* <div className="configuration-screen-title">
					Configurations:
				</div> */}
				<div className="errors-change-password">
					{this.state.errors}
				</div>
				<div>
					<div className="email">email</div>
					<div className="user-email">{this.state.user.email}</div>
				</div>
				<form className="forms">
					<label>
						{/* Mot de passe actuel */}
						<input
							placeholder="mot de passe actuel"
							value={this.state.currentPassword}
							onChange={(evt) =>
								this.setState({
									currentPassword: evt.target.value,
								})
							}
							type="password"
						/>
					</label>
					<label>
						{/* Nouveau mot de passe */}
						<input
							value={this.state.newPassword}
							onChange={(evt) =>
								this.setState({ newPassword: evt.target.value })
							}
							type="password"
							placeholder="nouveau mot de passe"
						/>
					</label>
					<label>
						{/* Confirmation de mot de passe */}
						<input
							placeholder="confirmation de mdp"
							value={this.state.passwordConfirm}
							onChange={(evt) =>
								this.setState({
									confirmPassword: evt.target.value,
								})
							}
							type="password"
						/>
					</label>
					<Link
						className="button-change-password"
						onClick={this.handleChange}
						to=""
					>
						<ButtonChangePassword />
					</Link>
				</form>
			</React.Fragment>
		);
	}
}
export default ProfileConfiguration;
