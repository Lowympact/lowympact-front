import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
    componentDidMount = () => {
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: {
                        width: { ideal: 1280 },
                        height: { ideal: 960 },
                        // facingMode: "environment", // or user
                        deviceId: this.props.deviceId,
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
                locate: false,
                area: {
                    top: "25%",
                    right: "25%",
                    left: "25%",
                    bottom: "25%",
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

    _onDetected = async (result) => {
        let stop = await this.props.onDetected(result);
        console.log(stop);
        if (stop) {
            Quagga.stop();
        }
    };

    render() {
        return (
            <React.Fragment>
                <div id="interactive" className="viewport" />
            </React.Fragment>
        );
    }
}

export default Scanner;
