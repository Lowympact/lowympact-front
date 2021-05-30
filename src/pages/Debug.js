import React from "react";
import "./Debug.css";
import "./Profil.css";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

class Debug extends React.Component {
    render = () => {
        return (
            <div>
                <Link to="/">
                    <Header />
                </Link>

                <Navbar />
                <div className="debug-container">
                    <h1> Problèmes de Caméra </h1>
                    <h2>Ma caméra n'est pas activée</h2>
                    <p> </p>
                    <h2>Ma caméra est activée mais le code barre n'est pas détecté</h2>
                </div>
            </div>
        );
    };
}

export default Debug;
