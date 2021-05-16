import React, { Component } from "react";
import Scanner from "./Scanner";

class Scan_home extends Component {
    state = {
        scanning: false,
        status: "",
        results: [],
        usedCamera: 0,
        devices: [],
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

        this.setState({ usedCamera: num });
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

    render() {
        console.log("Results: ", this.state.results);
        return (
            <div>
                <div className="header">
                    <div>Status: {this.state.status}</div>
                    <div onClick={this._scan}>{this.state.scanning ? "Stop" : "Start"}</div>
                    <button onClick={this.switchCamera}>
                        Current Camera : {this.state.usedCamera}
                    </button>
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
            </div>
        );
    }
}

export default Scan_home;
