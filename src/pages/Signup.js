import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ButtonSignup from "../components/Button/ButtonSignup";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Header from "../components/Header/Header";
import "./Login.css";
import { Link } from "react-router-dom";

export const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

class Signup extends Component {
    state = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: [],
        redirect: false,
        submit: false,
    };

    validate() {
        var errors = [];
        if (this.state.userName.length === 0) {
            errors.push("Saissez votre nom");
        }
        if (this.state.email.length === 0) {
            errors.push("Saissez votre adresse e-mail");
        }
        if (validEmail.test(this.state.email) === false) {
            errors.push("Saissez une adresse e-mail valide");
        }
        if (this.state.password.length < 6) {
            errors.push("Entre un mot de passe. 6 caràcteres minimum requis");
        }
        if (this.state.password !== this.state.confirmPassword) {
            errors.push("Les mots de passe ne correspondent pas");
        }
        this.setState({ errors: errors });
        return errors;
    }

    signUser = async () => {
        let errors = await fetch(`https://api.lowympact.fr/api/v1/users/`, {
            method: "post",
            credentials: "include",
            headers: new Headers({
                "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                username: this.state.userName,
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                let errors = [];

                if (!res.success) {
                    errors.push("Il y a déjà un compte avec ce mail ou une erreur réseau.");
                } else {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("userId", res._id);
                    this.props.history.push("/history");
                }
                this.setState({ errors: errors });
                return errors;
            });
        return errors;
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let errors = this.validate();
        //console.log("errors: " + errors);
        if (errors.length === 0) {
            errors = await this.signUser();
        }
        if (errors.length === 0) {
            this.setState({ redirect: true });
        }
    };

    displayErrors = () => {
        let errors = <React.Fragment></React.Fragment>;
        errors = this.state.errors.map((error) => {
            return <p>{error}</p>;
        });
        return errors;
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/history" />;
        }
        //console.log("render");
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
                <div className="signup-container">
                    <form className="forms">
                        <label>
                            nom
                            <input
                                className="input-forms"
                                value={this.state.userName}
                                onChange={(evt) =>
                                    this.setState({
                                        userName: evt.target.value,
                                    })
                                }
                                type="text"
                            />
                        </label>
                        <label>
                            email
                            <input
                                className="input-forms"
                                value={this.state.email}
                                onChange={(evt) => this.setState({ email: evt.target.value })}
                                type="email"
                            />
                        </label>
                        <label>
                            mot de passe
                            <input
                                className="input-forms"
                                value={this.state.password}
                                onChange={(evt) =>
                                    this.setState({
                                        password: evt.target.value,
                                    })
                                }
                                type="password"
                            />
                        </label>
                        <label>
                            confirmer mot de passe
                            <input
                                className="input-forms"
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
                    <label className="errors-signup">{this.displayErrors()}</label>
                    <div className="button-signup" onClick={this.handleSubmit}>
                        <ButtonSignup />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Signup;
