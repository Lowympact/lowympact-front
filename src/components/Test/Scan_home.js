import React, { Component } from "react";
import Scanner from "./Scanner";
import QrReader from "react-qr-reader";
import Switch from "react-switch";

class Scan_home extends Component {
    state = {
        scanning: true,
        status: "",
        results: [],
        usedCamera: 0,
        devices: [],
        reading: 0,
        QRresult: undefined,
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

    _onDetected = (result) => {
        console.log(result);
        this.setState(
            {
                results: [result],
                scanning: false,
                status: "waiting",
            },
            () => {
                setTimeout(() => {
                    this.setState({
                        scanning: true,
                        status: "scanning",
                        results: [],
                    });
                }, 1000);
            }
        );
    };

    handleScan = (data) => {
        if (data) {
            this.setState({
                QRresult: data,
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
                                    {result?.codeResult?.code} [{result?.codeResult?.format}]
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
        console.log("Results: ", this.state.results);
        return (
            <div className="code-reader-container">
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

export default Scan_home;
