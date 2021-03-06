import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./Profil.css";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

class Profil extends React.Component {
    state = {
        connected: false,
    };

    disconnect = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.props.history.push("/login");
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
            this.setState({ connected: true }); // redirection vers la page login
        }
    };

    displayConnectedProfil = () => {
        return (
            <React.Fragment>
                <h2 className="profil-title">Bienvenue sur ton profil!</h2>
                <Link to="/stats" className="profil-button">
                    Statistiques
                </Link>
                <Link to="/avis" className="profil-button">
                    Donnez votre avis !
                </Link>
                <Link to="/configuration" className="profil-button">
                    Configuration
                </Link>
                <div onClick={this.disconnect} className="profil-button-disconnect">
                    <div className="material-icons">logout</div>
                    <p>Déconnexion</p>
                </div>
            </React.Fragment>
        );
    };

    displayUnconnectedProfil = () => {
        return (
            <React.Fragment>
                <h2 className="profil-title">Non connecté</h2>
                <p>Connecte toi pour que ton historique soit sauvegardé !</p>
                <Link to="/login" className="profil-button">
                    Me Connecter
                </Link>
            </React.Fragment>
        );
    };

    render() {
        return (
            <div>
                <Link to="/">
                    <Header />
                </Link>
                <div className="profil-screen">
                    <div className="profil-picture">
                        <div className="material-icons">person</div>
                    </div>
                    {this.state.connected
                        ? this.displayConnectedProfil()
                        : this.displayUnconnectedProfil()}
                </div>
                <Navbar />
            </div>
        );
    }
}

export default Profil;
