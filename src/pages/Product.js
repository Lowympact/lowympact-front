import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Traceability from "../components/Traceability/Traceability";
import Environnement from "../components/Environnement/Environnement";
// import Labels from "../components/Labels/Labels";
import "./Product.css";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";

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
        productData: undefined,
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
        this.Verify();
        let userId = localStorage.getItem("userId");
        if (userId) {
            this.setState({ userId: userId });
            this.loadCartInfo(userId);
        }
        this.loadFromOpenFoodFacts(this.props.match.params.barcode);
        if (this.props.match.params.bcProductId) {
            this.loadProductInformations(
                this.props.match.params.barcode,
                this.props.match.params.bcProductId
            );
        }
    };

    handleBarCodeUpdate = () => {
        if (this.state.barcode !== this.props.match.params.barcode) {
            this.setState({
                barcode: this.props.match.params.barcode,
                bcProductId: this.props.match.params.bcProductId,
            });
            this.loadFromOpenFoodFacts(this.props.match.params.barcode);
            if (this.props.match.params.bcProductId) {
                this.loadProductInformations(
                    this.props.match.params.barcode,
                    this.props.match.params.bcProductId
                );
            }
        }
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

    loadProductInformations = (barcode, bcProductId) => {
        fetch(
            `https://api.lowympact.fr/api/v1/products/${barcode}?bcProductId=${bcProductId}`,
            // `http://localhost:8080/api/v1/products/${barcode}?bcProductId=${bcProductId}`,
            {
                method: "get",
                credentials: "include",
                headers: new Headers({
                    "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                    "Content-Type": "application/json",
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    products: res?.data?.traceability,
                    impact: res?.data?.impact,
                    totalCO2Traceability: res?.data?.transportCO2Impact,
                });
            });
    };

    loadFromOpenFoodFacts = (barcode) => {
        let dataEcoScore;

        fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json/`)
            .then((response) => response.json())
            .then((res) => {
                let productImageUrl = res?.product?.image_url;
                let productName = res?.product?.product_name;
                let genericName = res?.product?.generic_name;
                let ecoScore = res?.product?.ecoscore_grade;

                dataEcoScore = res?.product?.ecoscore_data;

                //console.log(res);
                let origins = res?.product?.origins_hierarchy;
                if (origins && origins != "") {
                    this.setState({ origins: origins });
                }

                if (res?.product) {
                    this.setState({ productData: res.product });
                }

                if (productImageUrl) {
                    this.setState({ productImageUrl: productImageUrl });
                }
                if (productName) {
                    this.setState({ productName: productName });
                }
                if (genericName) {
                    this.setState({ genericName: genericName });
                }
                if (
                    ecoScore &&
                    (ecoScore === "a" ||
                        ecoScore === "b" ||
                        ecoScore === "c" ||
                        ecoScore === "d" ||
                        ecoScore === "e")
                ) {
                    this.setState({ ecoScore: ecoScore });
                }
                if (dataEcoScore) {
                    this.setState({ dataEcoScore: dataEcoScore });
                }
                if (res.status === 1) {
                    this.saveHistory();
                }

                // Mock Soutenance
                if (barcode === "80135463") {
                    this.setState({ productName: "Nutella 200g" });
                }

                var scoreSearch = "a";

                switch (res.product?.ecoscore_grade) {
                    case "b":
                        scoreSearch = "a";
                        break;
                    case "c":
                        scoreSearch = "b";
                        break;
                    case "d":
                        scoreSearch = "c";
                        break;
                    case "e":
                        scoreSearch = "c";
                        break;

                    default:
                        break;
                }
            });
    };

    // Get if a connected user already added this item in this cart in the past 2 hours
    loadCartInfo = (userId) => {
        if (userId && this.state.barcode) {
            fetch(
                `https://api.lowympact.fr/api/v1/users/${userId}/cart/${this.state.barcode}?bcProductAddress=${this.state.bcProductId}`,
                // `http://localhost:8080/api/v1/users/${this.state.userId}/history`,
                {
                    method: "get",
                    credentials: "include",
                    headers: new Headers({
                        Authorization: localStorage.getItem("token"),
                        "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                        "Content-Type": "application/json",
                    }),
                }
            )
                .then((response) => response.json())
                .then((res) => {
                    //console.log(res);
                    if (res.success) {
                        this.setState({ cart: res.data?.quantity });
                    }
                });
        }
    };

    saveHistory = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const add = urlParams.get("cart");
        if (add !== "no") {
            await delay(2000);

            let history = JSON.parse(localStorage.getItem("local_history"));
            let exist = null;
            if (history) {
                history = history?.filter(
                    (element) =>
                        !(
                            element.barcode == this.state.barcode &&
                            element.bcProductId == this.state.bcProductId
                        )
                );
            } else {
                history = [];
            }

            history.push({
                barcode: this.state.barcode,
                bcProductId: this.state.bcProductId,
                brand: this.state.productData.brands,
                image: this.state.productImageUrl,
                label: this.state.ecoScore,
                name: this.state.productName,
                date: Date.now(),
            });
            localStorage.setItem("local_history", JSON.stringify(history));

            if (this.state.userId) {
                fetch(
                    `https://api.lowympact.fr/api/v1/users/${this.state.userId}/history`,
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
                            barcode: this.state.barcode,
                            bcProductAddress: this.state.bcProductId,
                        }),
                    }
                )
                    .then((response) => response.json())
                    .then((res) => {
                        //console.log(res);
                    });
            }
        }
    };

    addToCart = () => {
        if (this.state.barcode && this.state.cart >= 0) {
            let co2 = -1;
            if (this.state.dataEcoScore?.agribalyse?.co2_total) {
                co2 = parseFloat(this.state.dataEcoScore?.agribalyse?.co2_total);
            }

            let ecoscore = "unkown";
            if (this.state.ecoScore) {
                ecoscore = this.state.ecoScore;
            }
            this.flip();
            fetch(
                `https://api.lowympact.fr/api/v1/users/${this.state.userId}/cart`,
                // `http://localhost:8080/api/v1/users/${this.state.userId}/cart`,
                {
                    method: "put",
                    credentials: "include",
                    headers: new Headers({
                        Authorization: localStorage.getItem("token"),
                        "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({
                        barcode: this.state.barcode,
                        bcProductAddress: this.state.bcProductId,
                        quantityDelta: 1,
                        ecoscore: ecoscore,
                        carbonImpact: co2,
                    }),
                }
            )
                .then((response) => response.json())
                .then((res) => {
                    //console.log(res);
                    if (res.success) {
                        this.setState({ cart: this.state.cart + 1 });
                    }
                });
        }
    };

    removeFromCart = () => {
        if (this.state.barcode && this.state.cart > 0) {
            this.flip();
            let co2 = -1;
            if (this.state.dataEcoScore?.agribalyse?.co2_total) {
                co2 = parseFloat(this.state.dataEcoScore?.agribalyse?.co2_total);
            }
            let ecoscore = "unkown";
            if (this.state.ecoScore) {
                ecoscore = this.state.ecoScore;
            }
            fetch(
                `https://api.lowympact.fr/api/v1/users/${this.state.userId}/cart`,
                // `http://localhost:8080/api/v1/users/${this.state.userId}/cart`,
                {
                    method: "put",
                    credentials: "include",
                    headers: new Headers({
                        Authorization: localStorage.getItem("token"),
                        "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({
                        barcode: this.state.barcode,
                        bcProductAddress: this.state.bcProductId,
                        quantityDelta: -1,
                        ecoscore: ecoscore,
                        carbonImpact: co2,
                    }),
                }
            )
                .then((response) => response.json())
                .then((res) => {
                    //console.log(res);
                    if (res.success) {
                        this.setState({ cart: this.state.cart - 1 });
                    }
                });
        }
    };

    flip = async (event) => {
        // if (!this.isFlipping) {
        // 	this.isFlipping = true;
        // 	await delay(500);
        //console.log(this.imageFlip.style.transform);
        if (this.imageFlip && !this.state.isFlipping) {
            if (this.imageFlip.style.transform === "rotateY(360deg)") {
                this.imageFlip.style.transform = "rotateY(0deg)";
            } else {
                this.imageFlip.style.transform = "rotateY(360deg)";
            }
        }
        // await delay(1000);
        // this.isFlipping = false;
        // }
    };

    displayImage = () => {
        this.handleBarCodeUpdate();

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
        if (this.state.bcProductId) {
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
                        Environnement
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
        }
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
                        <div className="product-history-link">
                            <Link to="/history"> {"<"} Historique</Link>
                        </div>
                        <img
                            className="product-bitmap-image"
                            src="/images/utils/bitmap.png"
                            alt=""
                        />
                    </div>
                    <div
                        className="product-image-container"
                        // onClick={this.flip}
                        ref={(ref) => (this.imageFlip = ref)}
                    >
                        {this.displayImage()}
                    </div>

                    {this.displayNavbar()}

                    {/* <AppBar position="static">
						<Tabs
							value={this.state.value}
							onChange={this.handleChange}
							aria-label="simple tabs example"
						>
							<Tab label="Traçabilité" />
							<Tab label="Environnement" />
						</Tabs>
					</AppBar>
					<TabPanel value={this.state.value} index={0}></TabPanel>
					<TabPanel value={this.state.value} index={1}>
				</TabPanel> */}
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
                    <Navbar
                        barcode={this.props.match.params.barcode}
                        bcProductId={this.props.match.params.bcProductId}
                    />
                </div>
            </React.Fragment>
        );
    };
}

export default Product;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
