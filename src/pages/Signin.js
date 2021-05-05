import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ButtonSignin from "../components/Button/ButtonSignin";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Header from "../components/Header/Header";
import blob from "../assets/images/bitmap.png";
import "./Login.css";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

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
            loginSuccessful: null,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const errors = validate(email, password);
        //console.log(email, password, errors);
        this.setState({ errors });
        if (errors.length === 0) {
            this.Connect();
        }
    };

    componentDidMount = () => {
        this.Verify();
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
            this.setState({ redirect: true }); // redirection vers la page login
        }
    };

    Connect = () => {
        fetch(`https://api.lowympact.fr/api/v1/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",

                //'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                if (data.error === "No user found") {
                    this.setState({ loginSuccessful: false });
                    let err = this.state.errors;
                    err.push(<p>Utilisateur Inconnu</p>);
                    this.setState({ errors: err });
                } else if (data.error === "Incorrect password" || !data.success) {
                    this.setState({ loginSuccessful: false });
                    let err = this.state.errors;
                    err.push(<p>Mot de passe Incorrect</p>);
                    this.setState({ errors: err });
                } else {
                    // console.log(data);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userId", data._id);
                    this.setState({ loginSuccessful: true, redirect: true });
                    //this.props.history.goBack();	// a ajouter pour être redirigé vers la page initialement
                    // demandée. On doit cependant rediriger si la page demandée
                    // était la page de login
                }
            });
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
                <div className="signin-container">
                    <form className="forms">
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
                    </form>
                    <label className="errors-signin">{this.state.errors}</label>
                    <div className="button-signin" onClick={this.handleSubmit}>
                        <ButtonSignin />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Signin;
