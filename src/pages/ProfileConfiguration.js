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

function validate(newPassword, confirmPassword) {
    const errors = [];
    if (newPassword.length < 6) {
        errors.push(<p>Entre un mot de passe. 6 caractères minimum requis</p>);
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
        const errors = validate(newPassword, confirmPassword);
        console.log(this.state.user.email, currentPassword, newPassword, confirmPassword, errors);
        this.setState({ errors });
        if (errors.length === 0) {
            this.changeUserInfo(this.state.user._id, currentPassword, newPassword);
        }
    };

    changeUserInfo = (userId, currentPassword, newPassword) => {
        console.log("hey");
        fetch(
            `https://api.lowympact.fr/api/v1/users/${userId}`,
            // `http://localhost:8080/api/v1/users/login`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                    authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.success === false) {
                    this.setState({
                        errors: [...this.state.errors, res.error],
                    });
                } else {
                    this.setState({ redirect: true });
                }
            });
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
            <div className="screen">
                <Link to="/">
                    <Header />
                </Link>
                <Navbar />
                <div className="logo-fruits">
                    <img src={fruits} className="logo" alt="Fruits" />
                </div>
                <Link className="back-button" to="/profil">
                    {"< Retour"}
                </Link>
                <div className="configuration-screen-title"></div>
                <div className="errors-change-password">{this.state.errors}</div>
                <div className="configuration-container">
                    <div className="configuration-email-block">
                        <div>email</div>
                        <div>{this.state.user.email}</div>
                    </div>
                    <form className="configuration-form">
                        <label>
                            {/* Mot de passe actuel */}
                            <input
                                placeholder="mot de passe actuel"
                                className="input-forms"
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
                                className="input-forms"
                                onChange={(evt) =>
                                    this.setState({
                                        newPassword: evt.target.value,
                                    })
                                }
                                type="password"
                                placeholder="nouveau mot de passe"
                            />
                        </label>
                        <label>
                            {/* Confirmation de mot de passe */}
                            <input
                                placeholder="confirmation de mdp"
                                className="input-forms"
                                value={this.state.confirmPassword}
                                onChange={(evt) =>
                                    this.setState({
                                        confirmPassword: evt.target.value,
                                    })
                                }
                                type="password"
                            />
                        </label>
                        <Link className="button-change-password" onClick={this.handleChange} to="">
                            <ButtonChangePassword />
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}
export default ProfileConfiguration;
