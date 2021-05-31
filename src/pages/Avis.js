import React from "react";
import "./Avis.css";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import jwt from "jsonwebtoken";

class Avis extends React.Component {
    state = {
        value: "",
        sent: 0,
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
        if (isExpired === true) {
            localStorage.clear();
            this.props.history.push("/login");
        }
    };

    setValue = (input) => {
        this.setState({ value: input.target.value });
    };

    send = () => {
        let userId = localStorage.getItem("userId");
        this.setState({ sent: 1 });
        if (userId) {
            fetch(
                `https://api.lowympact.fr/api/v1/users/${userId}/review`,
                // `http://localhost:8080/api/v1/users/${this.state.userId}/history`,
                {
                    method: "put",
                    credentials: "include",
                    headers: new Headers({
                        Authorization: localStorage.getItem("token"),
                        "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({
                        message: this.state.value,
                    }),
                }
            )
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        this.setState({ sent: 2 });
                    } else {
                        this.setState({ sent: 3 });
                    }
                });
        }
    };

    render = () => {
        let button = <React.Fragment />;
        if (this.state.sent == 0) {
            button = <button onClick={this.send}>Envoyer ! </button>;
        }
        if (this.state.sent == 1) {
            button = <div>Envoi en cours ...</div>;
        }
        if (this.state.sent == 2) {
            button = <div> Message bien envoyé ! </div>;
        }
        if (this.state.sent == 3) {
            button = <div>Erreur de réseau, merci de réessayer plus tard :/</div>;
        }
        return (
            <div>
                <Link to="/">
                    <Header />
                </Link>

                <Navbar />
                <div className="avis-container">
                    <div className="avis">
                        <h2>Votre avis est important pour nous !</h2>
                        <p>
                            Cette application est le résultat d'un petit projet de 6 étudiants
                            Lyonnais, et à besoin de nombreuses améliorations !
                        </p>
                        <p>
                            Vos retours nous aident à nous améliorer, n'hésitez pas à nous écrire !{" "}
                        </p>
                        <textarea
                            placeholder=" Donnez-nous votre avis ! "
                            maxLength={500}
                            value={this.state.value}
                            onChange={this.setValue}
                        ></textarea>
                        {button}
                    </div>
                </div>
            </div>
        );
    };
}

export default Avis;
