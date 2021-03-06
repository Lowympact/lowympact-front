import { React, Component, Fragment } from "react";
import fruits from "../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import "./History.css";
import Product from "./Product";
import Profil from "./Profil";
// import { ITEMS } from "../assets/scanned/items";
import { Link } from "react-router-dom";
import InstallPWA from "../components/Install/InstallPWA";

function RenderHistoryItem({ item }) {
    var labelColor;
    if (item.label === "d" || item.label === "e") {
        labelColor = "red";
    } else if (item.label === "c") {
        labelColor = "yellow";
    } else if (item.label === "a" || item.label === "b") {
        labelColor = "green";
    }

    var pathProduct = "/products/" + item.barcode;
    if (item.bcProductId) {
        pathProduct += "/" + item.bcProductId;
    }
    pathProduct += "?cart=no";

    // Mock Soutenance
    if (item.barcode === "80135463") {
        item.name = "Nutella 200g";
    }

    return (
        <div>
            <Link className="history-item" to={pathProduct}>
                <div className="history-img-container">
                    <img src={item.image} alt="" />
                </div>
                <div className="history-name-container">
                    <div className="history-name">{item.name}</div>
                    <div className="history-brand">{item.brand}</div>
                </div>
                <div className="history-label-container">
                    <div style={{ color: labelColor }}>●</div>
                    <div className="history-label">
                        {["a", "b", "c", "d", "e"].indexOf(item.label) == -1 ? "" : item.label}
                    </div>
                </div>
                <div style={{ marginRight: "10px", color: "rgb(41,72,102)" }}>{">"}</div>
            </Link>
        </div>
    );
}

class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: undefined,
            loading: true,
            userId: undefined,
        };
    }

    componentDidMount = () => {
        this.loadLocalStorageHistory();
        let userId = localStorage.getItem("userId");
        let token = localStorage.getItem("token");
        if (userId && token) {
            this.setState({ userId: userId });
            // this.loadHistoryInformations(userId);
        }
    };

    loadHistoryInformations = (userId) => {
        fetch(
            `https://api.lowympact.fr/api/v1/users/${userId}/history`,
            // `http://localhost:8080/api/v1/users/${userId}/history`,

            {
                method: "get",
                credentials: "include",
                headers: new Headers({
                    authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                    "api-key": "99d8fb95-abdd-4885-bf6c-3a81d8874043",
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                //console.log(res);

                this.setState({
                    items: res?.data,
                    loading: false,
                });
                localStorage.setItem("local_history", JSON.stringify(res?.data));
            });
    };

    loadLocalStorageHistory = () => {
        let history = JSON.parse(localStorage.getItem("local_history"));
        this.setState({
            items: history,
            loading: false,
        });

        if (!history) {
            let userId = localStorage.getItem("userId");
            let token = localStorage.getItem("token");
            if (userId && token) {
                this.setState({
                    loading: true,
                });
                this.loadHistoryInformations(userId);
            }
        }
    };

    render() {
        if (this.state.items) {
            let itemList = <Fragment />;
            if (!this.loading) {
                itemList = this.state.items
                    .sort((a, b) => {
                        if (Date.parse(new Date(a.date)) < Date.parse(new Date(b.date))) {
                            return 1;
                        } else {
                            return -1;
                        }
                        // else return true;
                    })
                    .map((item) => {
                        return (
                            <div key={item.barcode + item.bcProductId}>
                                <RenderHistoryItem item={item} />
                            </div>
                        );
                    });
            } else {
                itemList = (
                    <div className="loader">
                        <img src="/images/utils/loading.gif" alt="" />
                    </div>
                );
            }

            if (Object.keys(this.state.items).length === 0)
                return (
                    <div>
                        <Header />
                        <Navbar />
                        <div className="App">
                            <div>
                                <img src={fruits} className="logo" alt="Fruits" />
                                <p className="logo-text">Commence à scanner des produits !</p>
                            </div>
                        </div>
                    </div>
                );
            else
                return (
                    <div>
                        <div className="screen">
                            <div className="screen-title">{itemList}</div>
                        </div>
                        <Header />
                        <Navbar />
                        {this.state.items.length > 1 ? <InstallPWA /> : <Fragment />}
                    </div>
                );
        } else {
            let image = (
                <div>
                    <img src={fruits} className="logo" alt="Fruits" />
                    <p className="logo-text">Commence à scanner des produits !</p>
                </div>
            );
            if (this.state.loading) {
                image = (
                    <div className="loader">
                        <img src="/images/utils/loading.gif" alt="" />
                    </div>
                );
            }
            return (
                <div>
                    <Header />
                    <Navbar />
                    <div className="App">{image}</div>
                </div>
            );
        }
    }
}

export default History;
