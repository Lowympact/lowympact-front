import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
    state = {
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
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: {
                        width: { ideal: 640 },
                        height: { ideal: 480 },
                        // facingMode: "environment", // or user
                        deviceId: this.state.devices[this.state.usedCamera].deviceId,
                        aspectRatio: {
                            min: 1,
                            max: 2,
                        },
                        focusMode: "continuous",
                    },
                },
                locator: {
                    patchSize: "normal",
                    halfSample: false,
                },
                locate: true,
                area: {
                    top: "0%",
                    right: "0%",
                    left: "0%",
                    bottom: "0%",
                },
                numOfWorkers: window.navigator.hardwareConcurrency || 2,
                decoder: {
                    readers: ["ean_reader"],
                },
                debug: {
                    drawBoundingBox: true,
                    showFrequency: true,
                    drawScanline: true,
                    showPattern: true,
                },
                multiple: false,
                singleChannel: false,
            },
            function (err) {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            }
        );
        Quagga.onDetected(this._onDetected);
    };

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected = (result) => {
        this.props.onDetected(result);
    };

    switchCamera = () => {
        let num = this.state.usedCamera + 1;
        if (num >= this.state.devices.length) {
            num = 0;
        }

        this.setState({ usedCamera: num });
    };

    render() {
        return (
            <React.Fragment>
                <button onClick={this.switchCamera}>
                    Current Camera : {this.state.usedCamera}
                </button>
                <div id="interactive" className="viewport" />
            </React.Fragment>
        );
    }
}

export default Scanner;
