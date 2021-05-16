import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
    componentDidMount() {
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: {
                        width: { ideal: 4096 },
                        height: { ideal: 2160 },
                        facingMode: "environment", // or user
                        aspectRatio: {
                            min: 1,
                            max: 2,
                        },
                        focusMode: "continuous",
                    },
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true,
                },
                locate: true,
                area: {
                    top: "25%",
                    right: "0%",
                    left: "0%",
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
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected = (result) => {
        this.props.onDetected(result);
    };

    render() {
        return <div id="interactive" className="viewport" />;
    }
}

export default Scanner;
