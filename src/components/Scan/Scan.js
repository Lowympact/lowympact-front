import React, { Component } from "react";
import Scanner from "./Scanner";
import QrReader from "react-qr-reader";
import Switch from "react-switch";
import { Redirect } from "react-router-dom";

class Scan extends Component {
    state = {
        scanning: true,
        status: "",
        results: [],
        usedCamera: 0,
        devices: [],
        reading: 0, //false : barcode - true: qrcode
        barcode: undefined,
        bcProductId: undefined,
        Quagga: undefined,
    };

    switchCamera = () => {
        let num = this.state.usedCamera + 1;
        if (num >= this.state.devices.length) {
            num = 0;
        }
        this.setState({ usedCamera: num });
        if (this.state.Quagga) this.state.Quagga.stop();
    };

    componentDidMount = () => {
        this.setState({ usedCamera: this.props.usedCamera, devices: this.props.devices });
    };

    setQuagga = (quagga) => {
        console.log(quagga);
        if (this.state.Quagga) {
            this.state.Quagga.stop();
        }
        this.setState({ Quagga: quagga });
    };

    _scan = () => {
        this.setState({ scanning: !this.state.scanning, status: "" });
    };

    _onDetected = async (res) => {
        console.log(res);
        if (res) {
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
                        scanning: false,
                        status: "found",
                        barcode: res.codeResult.code,
                    });
                    this.props.showScanner(false);
                    if (this.state.Quagga) this.state.Quagga.stop();
                    return true;
                } else {
                    this.setState({
                        scanning: true,
                        status: "not found",
                    });
                    return false;
                }
            }
        }
    };

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
            if (this.state.Quagga) this.state.Quagga.stop();
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
        if (this.state.status !== "found") {
            return (
                <React.Fragment>
                    <div className="header">
                        {this.state.devices?.length > 1 ? (
                            <button className="code-switch-camera" onClick={this.switchCamera}>
                                <span className="material-icons">cameraswitch</span>
                                {this.state.usedCamera}
                            </button>
                        ) : (
                            <React.Fragment />
                        )}
                        <ul className="results">
                            {this.state.results.map((result, i) => (
                                <div key={result.codeResult.code + i}>
                                    {this.state.status === "waiting"
                                        ? "Vérification du code" + result?.codeResult?.code
                                        : ""}
                                    {this.state.status === "not found"
                                        ? "code non trouvé, merci de réessayer"
                                        : ""}
                                </div>
                            ))}
                        </ul>
                    </div>
                    {this.state.scanning && this.state.devices?.length > 0 ? (
                        <Scanner
                            onDetected={this._onDetected}
                            setQuagga={this.setQuagga}
                            usedCameraId={this.state.devices[this.state.usedCamera].deviceId}
                        />
                    ) : null}
                </React.Fragment>
            );
        } else {
            return <React.Fragment />;
        }
    };

    switchReader = () => {
        if (this.state.reading) this.setState({ reading: false });
        else {
            if (this.state.Quagga) this.state.Quagga.stop();
            this.setState({ reading: true });
        }
    };

    render() {
        console.log("Results: ", this.state.results, this.state.redirect);
        if (
            this.state.barcode &&
            this.state.bcProductId &&
            (this.props.barcode !== this.state.barcode ||
                this.props.bcProductId !== this.state.bcProductId)
        ) {
            return (
                <Redirect to={"/products/" + this.state.barcode + "/" + this.state.bcProductId} />
            );
        }
        if (this.state.barcode && this.props.barcode !== this.state.barcode) {
            return <Redirect to={"/products/" + this.state.barcode} />;
        } else {
            return (
                <div className="code-reader-container">
                    <span
                        className="close"
                        onClick={() => {
                            if (this.state.Quagga) this.state.Quagga.stop();

                            this.props.showScanner(false);
                        }}
                    >
                        &times;
                    </span>
                    <div className="code-switch" onClick={this.switchReader}>
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
                    </div>
                    {this.state.reading ? this.displayQrCode() : this.displayBarCode()}
                </div>
            );
        }
    }
}

export default Scan;
