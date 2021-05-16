import React, { Component } from "react";
import Scanner from "./Scanner";
import QrReader from "react-qr-reader";
import Switch from "react-switch";
import { Redirect } from "react-router-dom";

class Scan_home extends Component {
    state = {
        scanning: true,
        status: "",
        results: [],
        usedCamera: 0,
        devices: [],
        reading: 0,
        redirect: undefined,
    };

    componentDidMount = async () => {
        let a = await navigator.mediaDevices.enumerateDevices().then(function (devices) {
            return devices;
        });
        let cameras = [];
        a.forEach(function (device) {
            if (device.kind == "videoinput") {
                cameras.push(device);
                if (device.label.match(/back/) != null) {
                    console.log("found");
                }
            }
        });
        this.setState({ devices: cameras });
    };

    switchCamera = () => {
        let num = this.state.usedCamera + 1;
        if (num >= this.state.devices.length) {
            num = 0;
        }

        this.setState({ usedCamera: num, scanning: false });
        this.setState({ scanning: true });
    };

    _scan = () => {
        console.log("hey");
        this.setState({ scanning: !this.state.scanning, status: "" });
    };

    _onDetected = (res) => {
        console.log(res);
        if (res) {
            if (res.codeResult && res.codeResult.code) {
                this.setState({
                    results: [res],
                    scanning: true,
                    status: "waiting",
                });
                fetch(`https://world.openfoodfacts.org/api/v0/product/${res.codeResult.code}.json/`)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        if (result.status !== 0) {
                            this.setState({
                                scanning: false,
                                status: "found",
                                redirect: `https://lowympact.fr/products/${res.codeResult.code}`,
                            });
                        } else {
                            this.setState({
                                scanning: true,
                                status: "not found",
                            });
                        }
                    });
            }
        }
    };

    handleScan = (data) => {
        if (data) {
            this.setState({
                redirect: data,
            });
        }
    };
    handleError = (err) => {
        console.error(err);
    };

    displayQrCode = () => {
        return (
            <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "100%" }}
                showViewFinder={false}
            />
        );
    };

    displayBarCode = () => {
        if (this.state.devices.length > 0) {
            return (
                <React.Fragment>
                    <div className="header">
                        {/* <div>Status: {this.state.status}</div>
                        <div onClick={this._scan}>{this.state.scanning ? "Stop" : "Start"}</div> */}
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
                    {this.state.scanning ? (
                        <Scanner
                            onDetected={this._onDetected}
                            deviceId={this.state.devices[this.state.usedCamera].deviceId}
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
        else this.setState({ reading: true });
    };

    render() {
        console.log("Results: ", this.state.results, this.state.redirect);
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        } else {
            return (
                <div className="code-reader-container">
                    <span
                        class="close"
                        onClick={() => {
                            this.props?.onCrossClicked(false);
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

export default Scan_home;
