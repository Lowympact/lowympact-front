import Navbar from "../components/Navbar/Navbar";
import React from "react";
import Traceability from "../components/Traceability/Traceability";
import Environnement from "../components/Environnement/Environnement";
import "./Product.css";

let productsTemp = {
    data: {
        traceability: [
            {
                depth: 1,
                productsOutput: [{ productName: "Huile de palme" }],
                TransportCO2Impact: {
                    value: 26,
                },
                dist: {
                    value: 19400,
                },
                transport: "Plane",

                seller: {
                    name: "The Palm Oil Company",
                    type: "productor",
                    localisation: {
                        city: "Kuala Lumpur",
                        country: "Malaisie",
                        latitude: 3,
                        longitude: 101,
                    },
                },
                buyer: {
                    name: "Ferrero",
                    type: "maker",
                    localisation: {
                        city: "Villers-Ecalles",
                        country: "France",
                        latitude: 48,
                        longitude: 3,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Noisettes" }],
                TransportCO2Impact: {
                    value: 6,
                },
                dist: {
                    value: 1200,
                },
                transport: "Train",

                seller: {
                    name: "Noisetti",
                    type: "productor",
                    localisation: {
                        city: "Lagos",
                        country: "Portugal",
                        latitude: 37,
                        longitude: -8,
                    },
                },
                buyer: {
                    name: "Ferrero",
                    type: "maker",
                    localisation: {
                        city: "Villers-Ecalles",
                        country: "France",
                        latitude: 48,
                        longitude: 3,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Pot de Nutella" }],
                TransportCO2Impact: {
                    value: 19,
                },
                dist: {
                    value: 5500,
                },
                transport: "Plane",

                seller: {
                    name: "Ferrero",
                    type: "maker",
                    localisation: {
                        city: "Villers-Ecalles",
                        country: "France",
                        latitude: 48,
                        longitude: 3,
                    },
                },
                buyer: {
                    name: "Maxi",
                    type: "shop",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45,
                        longitude: -73,
                    },
                },
            },
        ],
        impact: "",
        transportCO2Impact: 9.87,
        productImageUrl : "/images/products/wh_cricket_soft_BH_2018_220x.png",
        productName : "Gâteries d'entraînement aux grillons et bleuets",
        //origins : "Québec",
    },
};

class Product extends React.Component {
    state = {
        barcode: this.props.match.params.barcode,
        bcProductId: this.props.match.params.bcProductId,
        product: undefined,
        productImageUrl: undefined,
        productName: undefined,
        genericName: undefined,
        ecoScore: undefined,
        dataEcoScore: undefined,
        value: 0,
        connected: false,
        userId: undefined,
        cart: 0,
        totalCO2Traceability: undefined,
        countries: [],
    };

    isFlipping = false;

    //for scrolling
    getBottomRef = (component) => {
        this.bottomComponent = component;
    };

    componentDidMount = () => {
        this.setState({
            products: productsTemp?.data?.traceability,
            impact: productsTemp?.data?.impact,
            totalCO2Traceability: productsTemp?.data?.transportCO2Impact,
            productImageUrl: productsTemp?.data?.productImageUrl,
            productName: productsTemp?.data?.productName,
        });
    };

    displayImage = () => {
        let image = <React.Fragment />;
        let productName = <React.Fragment />;
        let genericName = <React.Fragment />;
        let ecoScore = <React.Fragment />;
        if (this.state.productImageUrl) {
            image = (
                <img src={this.state.productImageUrl} className="product-image" alt="produit" />
            );
        }

        if (this.state.productName) {
            productName = <div className="product-name">{this.state.productName}</div>;
        }
        if (this.state.ecoScore) {
            let scoreClass = "color_score_" + this.state.ecoScore;
            ecoScore = (
                <div className="product-ecoscore-image">
                    <span className={"circle-score " + scoreClass}>⬤ </span>
                    EcoScore :<span className="uppercase ">{" " + this.state.ecoScore}</span>
                </div>
            );
        } else if (this.state.genericName) {
            genericName = <div className="product-generic-name">{this.state.genericName}</div>;
        }
        return (
            <React.Fragment>
                {this.state.userId ? (
                    <div
                        className={this.state.cart > 0 ? "add-to-cart green" : "add-to-cart"}
                        onClick={this.addToCart}
                    >
                        <span className="cart-count">
                            {this.state.cart > 0 ? this.state.cart : ""}
                        </span>
                        <span className="material-icons">add_shopping_cart</span>
                    </div>
                ) : (
                    <React.Fragment />
                )}
                {this.state.cart > 0 ? (
                    <div className="remove-from-cart" onClick={this.removeFromCart}>
                        <span className="material-icons">remove_shopping_cart</span>
                    </div>
                ) : (
                    <React.Fragment />
                )}
                {image}
                {productName}
                <div className="product-bottom-image-div">
                    {genericName}
                    {ecoScore}
                </div>
            </React.Fragment>
        );
    };

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
        if (newValue === 1) {
            let elem = document.getElementsByClassName("swiper-container");
            if (elem[0]) {
                elem[0].scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    displayNavbar = () => {
        let retour = <React.Fragment />;
            retour = (
                <div className="product-navbar-container">
                    <button
                        className={
                            this.state.value === 0
                                ? "product-navbar-button selected"
                                : "product-navbar-button"
                        }
                        onClick={() => this.handleChange("", 0)}
                    >
                        Informations
                    </button>
                    <button
                        className={
                            this.state.value === 1
                                ? "product-navbar-button selected"
                                : "product-navbar-button"
                        }
                        onClick={() => this.handleChange("", 1)}
                    >
                        Traçabilité
                    </button>
                    <div
                        className={
                            this.state.value === 0
                                ? "navbar-under nav-left"
                                : "navbar-under nav-right"
                        }
                    ></div>
                </div>
            );
        return retour;
    };

    render = () => {
        //tri des produits
        let products = this.state.products?.sort((a, b) => {
            if (a.depth > b.depth) return -1;
            else return 1;
        });
        return (
            <React.Fragment>
                <div className="product-page-container">
                    <div className="product-header-container">
                        <img
                            className="product-bitmap-image"
                            src="/images/utils/bitmap.png"
                            alt=""
                        />
                    </div>
                    <div
                        className="product-image-container"
                        ref={(ref) => (this.imageFlip = ref)}
                    >
                        {this.displayImage()}
                    </div>

                    {this.displayNavbar()}
                        {this.state.value === 0 ?
                            <Environnement
                            dataEcoScore={this.state.dataEcoScore}
                            ecoScore={this.state.ecoScore}
                            origins={this.state.origins}
                            displayTranportImpact={
                                this.props.match.params.bcProductId !== null &&
                                this.props.match.params.bcProductId !== undefined
                            }
                            barcode={this.props.match.params.barcode}
                        ></Environnement> : <div className="product-bottom-container">
                        <Traceability
                            products={products}
                            getBottomRef={this.getBottomRef}
                            totalCO2Traceability={this.state.totalCO2Traceability}
                        />
                    </div>
                    }
                </div>
            </React.Fragment>
        );
    };
}

export default Product;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
