import React, { Component } from "react";
import Scanner from "./Scanner";
import QrReader from "react-qr-reader";
import { Link } from "react-router-dom";
import "./Scan.css";
import "../../pages/History.css";

class Scan extends Component {
    state = {
        scanning: true,
        status: "",
        results: [],
        usedCameraId: "3f6fc4177028f25c3e8215f4444838450630b8d656c627ef511346545d37f302",
        devices: [],
        reading: false, //false : barcode - true: qrcode
        barcode: undefined,
        bcProductId: undefined,
        Quagga: undefined,
        product: undefined,
        online: window.navigator.onLine,
    };

    componentDidMount = () => {
        window.addEventListener("offline", this.updateNetwork);
        window.addEventListener("online", this.updateNetwork);
    };

    updateNetwork = () => {
        this.setState({ online: window.navigator.onLine });
    };

    setQuagga = (quagga) => {
        if (this.state.Quagga) {
            this.state.Quagga.stop();
        }
        this.setState({ Quagga: quagga });
    };

    _onDetected = async (res) => {
        if (res) {
            console.log(res);
            if (res.codeResult && res.codeResult.code) {
                this.setState({
                    results: [res],
                    scanning: true,
                    status: "waiting",
                });
                let response = await fetch(
                    `https://world.openfoodfacts.org/api/v0/product/${res.codeResult.code}.json/`
                );
                let result = await response.json();
                console.log(result);
                if (result.status !== 0) {
                    this.setState({
                        scanning: true,
                        status: "found",
                        product: result,
                        barcode: res.codeResult.code,
                    });
                    // this.props.showScanner(false);
                    // if (this.state.Quagga) this.state.Quagga.stop();
                    return true;
                } else {
                    this.setState(
                        {
                            scanning: true,
                            status: "not found",
                        },
                        async () => {
                            await delay(3000);
                            this.setState({
                                scanning: true,
                                status: undefined,
                            });
                        }
                    );

                    return false;
                }
            }
        }
    };
    // For QR CODE Scanner, not used
    handleScan = (data) => {
        if (data) {
            let arr = data.split("/");
            if (arr.length > 1) {
                this.setState({
                    scanning: false,
                    barcode: arr[4],
                    bcProductId: arr[5],
                    status: "found",
                });
            }
            // if (this.state.Quagga) this.state.Quagga.stop();
        }
    };
    handleError = (err) => {
        console.error(err);
    };

    displayQrCode = () => {
        if (this.state.status !== "found") {
            return (
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: "100%" }}
                    showViewFinder={false}
                />
            );
        } else {
            return <React.Fragment />;
        }
    };

    displayBarCode = () => {
        // if (this.state.status !== "found") {
        return (
            <React.Fragment>
                {this.state.scanning ? (
                    <Scanner
                        onDetected={this._onDetected}
                        setQuagga={this.setQuagga}
                        usedCameraId={this.usedCameraId}
                        capabilities={this.props.capabilities}
                    />
                ) : null}
            </React.Fragment>
        );
        // } else {
        //     return <React.Fragment />;
        // }
    };

    switchReader = () => {
        if (this.state.reading) this.setState({ reading: false });
        else {
            if (this.state.Quagga) this.state.Quagga.stop();
            this.setState({ reading: true });
        }
    };

    displayPopup = () => {
        console.log(this.state.product);
        let retour = <React.Fragment />;
        let item = this.state.product?.product;
        if (item) {
            retour = (
                <Link className="history-item" to={"/products/" + this.state.product.code}>
                    <div className="history-img-container">
                        <img src={item.image_url} alt="" />
                    </div>
                    <div className="history-name-container">
                        <div className="history-name">{item.product_name}</div>
                        <div className="history-brand">{item.brands}</div>
                    </div>
                    <div className="history-label-container">
                        <div style={{ color: getColor(item.ecoscore_score) }}>●</div>
                        <div className="history-label">
                            {["a", "b", "c", "d", "e"].indexOf(item.ecoscore_grade) == -1
                                ? ""
                                : item.ecoscore_grade}
                        </div>
                    </div>
                    <div style={{ marginRight: "10px", color: "rgb(41,72,102)" }}>{">"}</div>
                </Link>
            );
        } else if (this.state.status == "waiting") {
            retour = (
                <div className="history-item">
                    <div class="skeleton-8wwpnkj1sj9"></div>
                </div>
            );
        } else if (this.state.status == "not found") {
            retour = (
                <div className="history-item">
                    <div className="history-img-container">
                        <div className="grey-square"></div>
                    </div>
                    <div className="history-name-container">
                        <div className="history-name">Article non trouvé</div>
                        <div className="history-brand"></div>
                    </div>
                    <div className="history-label-container"></div>
                    <div style={{ marginRight: "10px", color: "rgb(41,72,102)" }}>{">"}</div>
                </div>
            );
        }
        return retour;
    };

    render() {
        return (
            <div
                className={
                    this.props.hideScannerAnimation
                        ? "code-reader-container hide-scanner"
                        : "code-reader-container"
                }
            >
                {!this.state.online ? (
                    <div className="offline-container">
                        {" "}
                        <span style={{ color: "red" }}>●</span> Pas de connexion
                    </div>
                ) : (
                    <React.Fragment />
                )}
                <span
                    className="close material-icons"
                    onClick={() => {
                        if (this.state.Quagga) this.state.Quagga.stop();

                        this.props.showScanner(false);
                    }}
                >
                    close
                </span>
                {this.displayBarCode()}
                <div className="scan-result-container">
                    <div className="results">{this.displayPopup()}</div>
                </div>
            </div>
        );
        //}
    }
}

export default Scan;

function getColor(note) {
    if (note > 67) {
        return "green";
    }
    if (note <= 33) {
        return "red";
    }
    return "yellow";
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// if (
//     this.state.barcode &&
//     this.state.bcProductId &&
//     (this.props.barcode !== this.state.barcode ||
//         this.props.bcProductId !== this.state.bcProductId)
// ) {
//     return (
//         <Redirect to={"/products/" + this.state.barcode + "/" + this.state.bcProductId} />
//     );
// }
// if (this.state.barcode && this.props.barcode !== this.state.barcode) {
//     return <Redirect to={"/products/" + this.state.barcode} />;
// } else {
{
    /* <div className="code-switch" onClick={this.switchReader}>
                        <div className="span-code-switch">
                            <span
                                className={
                                    this.state.reading ? "material-icons" : "material-icons green"
                                }
                            >
                                view_week
                            </span>
                            <span>Barcode</span>
                        </div>
                        <Switch
                            onChange={this.switchReader}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            checked={this.state.reading}
                            onColor={"#888"}
                            offColor={"#888"}
                        />
                        <div className="span-code-switch">
                            <span
                                className={
                                    !this.state.reading ? "material-icons" : "material-icons green"
                                }
                            >
                                qr_code_scanner
                            </span>
                            <span>QR Code</span>
                        </div>
                    </div> */
}
{
    /* {this.state.reading ? this.displayQrCode() : this.displayBarCode()} */
}
