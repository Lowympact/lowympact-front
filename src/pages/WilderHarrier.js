import "./Product.css";

import Environnement from "../components/Environnement/Environnement";
import Navbar from "../components/Navbar/Navbar";
import React from "react";
import Traceability from "../components/Traceability/Traceability";

let productsTemp = {
    data: {
        traceability: [
            {
                depth: 1,
                productsOutput: [{ productName: "Pois chiches" }],
                TransportCO2Impact: {
                    value: 19.8,
                },
                dist: {
                    value: 198,
                },
                transport: "Truck",

                seller: {
                    name: "",
                    type: "productor",
                    localisation: {
                        city: "Ottawa",
                        country: "Canada",
                        latitude: 45.4215,
                        longitude: -75.6972,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Graines de lin" }],
                TransportCO2Impact: {
                    value: 227.4,
                },
                dist: {
                    value: 2274,
                },
                transport: "Truck",

                seller: {
                    name: "",
                    type: "productor",
                    localisation: {
                        city: "Winkler",
                        country: "Canada",
                        latitude: 49.1801,
                        longitude: -97.9389,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Dattes" }],
                TransportCO2Impact: {
                    value: 1051.4,
                },
                dist: {
                    value: 6917,
                },
                transport: "Plane",

                seller: {
                    name: "",
                    type: "maker",
                    localisation: {
                        city: "Tunis",
                        country: "Tunisie",
                        latitude: 36.8065,
                        longitude: 10.1815,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Grillons" }],
                TransportCO2Impact: {
                    value: 46.0,
                },
                dist: {
                    value: 460,
                },
                transport: "Truck",

                seller: {
                    name: "",
                    type: "maker",
                    localisation: {
                        city: "Peterborough",
                        country: "Canada",
                        latitude: 44.3091,
                        longitude: -78.3197,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Glycérine végétale" }],
                TransportCO2Impact: {
                    value: 1.0,
                },
                dist: {
                    value: 10,
                },
                transport: "Truck",

                seller: {
                    name: "",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Bleuets" }],
                TransportCO2Impact: {
                    value: 25.5,
                },
                dist: {
                    value: 255,
                },
                transport: "Truck",

                seller: {
                    name: "",
                    type: "maker",
                    localisation: {
                        city: "Quebec city",
                        country: "Canada",
                        latitude: 46.8139,
                        longitude: -71.208,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Saveur naturelle" }],
                TransportCO2Impact: {
                    value: 187.5,
                },
                dist: {
                    value: 1875,
                },
                transport: "Truck",

                seller: {
                    name: "",
                    type: "maker",
                    localisation: {
                        city: "Des Moines, Iowa",
                        country: "USA",
                        latitude: 41.5868,
                        longitude: -93.625,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Huile d'olive" }],
                TransportCO2Impact: {
                    value: 11629.5,
                },
                dist: {
                    value: 7651,
                },
                transport: "Plane",

                seller: {
                    name: "",
                    type: "maker",
                    localisation: {
                        city: "Athènes",
                        country: "Grèce",
                        latitude: 37.9838,
                        longitude: 23.7275,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Miel" }],
                TransportCO2Impact: {
                    value: 68.3,
                },
                dist: {
                    value: 683,
                },
                transport: "Truck",

                seller: {
                    name: "Abitemis",
                    type: "productor",
                    localisation: {
                        city: "Saint-Bruno-de-Guigues, QC",
                        country: "Canada",
                        latitude: 47.4641,
                        longitude: -79.4381,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Acide citrique et vinaigre tamponné" }],
                TransportCO2Impact: {
                    value: 187.5,
                },
                dist: {
                    value: 1875,
                },
                transport: "Truck",

                seller: {
                    name: "Abitemis",
                    type: "productor",
                    localisation: {
                        city: "Des Moines, Iowa",
                        country: "USA",
                        latitude: 41.5868,
                        longitude: -93.625,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
            {
                depth: 1,
                productsOutput: [{ productName: "Mélange de tocophérols" }],
                TransportCO2Impact: {
                    value: 187.5,
                },
                dist: {
                    value: 1875,
                },
                transport: "Truck",

                seller: {
                    name: "Abitemis",
                    type: "productor",
                    localisation: {
                        city: "Des Moines, Iowa",
                        country: "Canada",
                        latitude: 41.5868,
                        longitude: -93.625,
                    },
                },
                buyer: {
                    name: "Wilder Harrier",
                    type: "maker",
                    localisation: {
                        city: "Montréal",
                        country: "Canada",
                        latitude: 45.5017,
                        longitude: -73.5673,
                    },
                },
            },
        ],
        impact: "",
        transportCO2Impact: 0.4,
        productImageUrl: "/images/products/wh_cricket_soft_BH_2018_220x.png",
        productName: "Gâteries d'entraînement aux grillons et bleuets",
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
                        this.state.value === 0 ? "navbar-under nav-left" : "navbar-under nav-right"
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
                    <div className="product-image-container" ref={(ref) => (this.imageFlip = ref)}>
                        {this.displayImage()}
                    </div>

                    {this.displayNavbar()}
                    {this.state.value === 0 ? (
                        <Environnement
                            dataEcoScore={this.state.dataEcoScore}
                            ecoScore={this.state.ecoScore}
                            origins={this.state.origins}
                            displayTranportImpact={
                                this.props.match.params.bcProductId !== null &&
                                this.props.match.params.bcProductId !== undefined
                            }
                            barcode={this.props.match.params.barcode}
                        ></Environnement>
                    ) : (
                        <div className="product-bottom-container">
                            <Traceability
                                products={products}
                                getBottomRef={this.getBottomRef}
                                totalCO2Traceability={this.state.totalCO2Traceability}
                            />
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    };
}

export default Product;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
