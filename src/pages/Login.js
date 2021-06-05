import React from "react";
import logo from "../assets/images/logo.svg";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import "./Login.css";
import ButtonCreateAccount from "../components/Button/ButtonCreateAccount";
import ButtonLogin from "../components/Button/ButtonLogin";
import { Link } from "react-router-dom";
import ButtonNoAccount from "../components/Button/ButtonNoAccount";
import jwt from "jsonwebtoken";
import InstallPWA from "../components/Install/InstallPWA";

class Login extends React.Component {
    componentDidMount = () => {
        this.Verify();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        if (window.innerWidth > 1200 && urlParams.get("from") != "website") {
            window.location.assign("https://lowympact.fr");
        }
    };

    Verify = () => {
        let isExpired = true;
        const token = localStorage.getItem("token");
        if (token) {
            var decodedToken = jwt.decode(token, { complete: true });
            var dateNow = new Date();
            //console.log(decodedToken, dateNow.getTime() / 1000);
            if (decodedToken.payload.exp >= dateNow.getTime() / 1000) {
                isExpired = false;
            }
        }
        if (isExpired === false) {
            //console.log("here");
            this.props.history.push(`/history`); // redirection vers la page login
        }
    };
    render = () => {
        return (
            <div className="login-container">
                <a class="skip-link" href="#main">
                    Skip to main
                </a>
                <div className="login-logo">
                    <img src={logo} className="logo" alt="Logo" />
                </div>
                <main id="main" className="login-lowympact">
                    Lowympact
                </main>
                <Link to="/signup" className="button-account">
                    <ButtonCreateAccount />
                </Link>
                <Link to="/signin" className="button-connect">
                    <ButtonLogin />
                </Link>
                <Link to="/history" className="button-no-account">
                    <ButtonNoAccount />
                </Link>
                <div className="logo-fruits">
                    <img src={fruits} className="logo" alt="Fruits" />
                </div>
                <InstallPWA />
            </div>
        );
    };
}
export default Login;
