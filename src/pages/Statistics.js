import React from "react";
import Navbar from "../components/Navbar/Navbar";
import DoughnutChartEcoScore from "../components/Charts/DoughnutChartEcoScore";
import BarChartCarbonImpact from "../components/Charts/BarChartCarbonImpact";
import "./Product.css";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

class Statistics extends React.Component {
    state = {
        ecoScoreData: undefined,
        carbonImpactData: undefined,
        username: undefined,
        scannedProduct: undefined,
        cartedProduct: undefined,
        userId: undefined,
        value: 0,
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
            this.setState({ connected: true });
        }
    };

    componentDidMount = () => {
        this.Verify();
        let userId = localStorage.getItem("userId");
        if (userId) {
            this.setState({ userId: userId });
        }
        this.loadUserData(userId);
        this.loadEcoScoreData(userId, "fromBeginning");
        this.loadCarbonImpactData(userId, "fromBeginning");
    };

    loadUserData = (userId) => {
        fetch(
            `https://api.lowympact.fr/api/v1/users/${userId}`,
            // `http://localhost:8080/api/v1/users/${userId}`,
            {
                method: "get",
                credentials: "include",
                headers: new Headers({
                    authorization: localStorage.getItem("token"),
                    "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                    "Content-Type": "application/json",
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                this.setState({
                    username: res?.data?.username,
                    scannedProduct: res?.scannedProduct,
                    cartedProduct: res?.cartedProduct,
                });
            });
    };

    loadEcoScoreData = (userId, typeAggregate) => {
        fetch(
            `https://api.lowympact.fr/api/v1/users/${userId}/statistics?typeStatistic=ecoscore&typeAggregate=${typeAggregate}`,
            // `http://localhost:8080/api/v1/users/${userId}/statistics?typeStatistic=ecoscore&typeAggregate=${typeAggregate}`,
            {
                method: "get",
                credentials: "include",
                headers: new Headers({
                    authorization: localStorage.getItem("token"),
                    "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                    "Content-Type": "application/json",
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                this.setState({
                    ecoScoreData: res?.statistics?.ecoscore,
                });
            });
    };

    loadCarbonImpactData = (userId, typeAggregate) => {
        fetch(
            `https://api.lowympact.fr/api/v1/users/${userId}/statistics?typeStatistic=carbonImpact&typeAggregate=${typeAggregate}`,
            // `http://localhost:8080/api/v1/users/${userId}/statistics?typeStatistic=carbonImpact&typeAggregate=${typeAggregate}`,
            {
                method: "get",
                credentials: "include",
                headers: new Headers({
                    authorization: localStorage.getItem("token"),
                    "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                    "Content-Type": "application/json",
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                this.setState({
                    carbonImpactData: res?.statistics?.carbonImpact,
                });
            });
    };

    displayStats = () => {
        let scannedProduct = <React.Fragment />;
        let cartedProduct = <React.Fragment />;

        if (this.state.scannedProduct !== undefined) {
            scannedProduct = (
                <div className="stats-header-text">
                    <span className={"circle-stats color_score_stats"}>⬤ </span>
                    {this.state.scannedProduct > 1 ? "Produits scannés :" : "Produit scanné :"}
                    <span className="uppercase "> {this.state.scannedProduct}</span>
                </div>
            );
        }

        if (this.state.cartedProduct !== undefined) {
            cartedProduct = (
                <div className="stats-header-text">
                    <span className={"circle-stats color_score_stats"}>⬤ </span>
                    {this.state.cartedProduct > 1 ? "Produits achetés :" : "Produit acheté :"}
                    <span className="uppercase "> {this.state.cartedProduct}</span>
                </div>
            );
        }

        return (
            <React.Fragment>
                {scannedProduct}
                {cartedProduct}
            </React.Fragment>
        );
    };

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    displayNavbar = () => {
        let retour = (
            <div className="stats-navbar-container">
                <button
                    className={
                        this.state.value === 0
                            ? "stats-navbar-button selected"
                            : "stats-navbar-button"
                    }
                    onClick={() => this.handleChange("", 0)}
                >
                    EcoScore
                </button>
                <button
                    className={
                        this.state.value === 1
                            ? "stats-navbar-button selected"
                            : "stats-navbar-button"
                    }
                    onClick={() => this.handleChange("", 1)}
                >
                    Impact Carbone
                </button>
                <div
                    className={
                        this.state.value === 0 ? "navbar-under nav-left" : "navbar-under nav-right"
                    }
                ></div>
            </div>
        );
        return retour;
    };

    render = () => {
        return (
            <React.Fragment>
                <div className="stats-page-container">
                    <div className="stats-header-container">
                        <div className="stats-profil-link">
                            <Link to="/profil"> {"<"} Profil</Link>
                        </div>
                        <img className="stats-bitmap-image" src="/images/utils/bitmap.png" alt="" />
                    </div>

                    <div className="stats-welcome">
                        <span className="stats-welcome-text">
                            {this.state.username
                                ? this.state.username + ", voici ton récapitulatif Lowympact..."
                                : ""}
                        </span>
                    </div>

                    <div className="stats-text-container">{this.displayStats()}</div>

                    {this.displayNavbar()}

                    {this.state.value === 0 ? (
                        <DoughnutChartEcoScore
                            ecoScoreData={this.state.ecoScoreData}
                            scannedProduct={this.state.scannedProduct}
                            cartedProduct={this.state.cartedProduct}
                        ></DoughnutChartEcoScore>
                    ) : (
                        <BarChartCarbonImpact
                            carbonImpactData={this.state.carbonImpactData}
                            scannedProduct={this.state.scannedProduct}
                            cartedProduct={this.state.cartedProduct}
                        ></BarChartCarbonImpact>
                    )}

                    <Navbar />
                </div>
            </React.Fragment>
        );
    };
}

export default Statistics;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
