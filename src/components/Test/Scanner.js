import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
    state = {
        error: false,
    };
    componentDidMount = async () => {
        let usedCameraId;
        const devices = await navigator.mediaDevices.enumerateDevices();
        let videoDevices = [];
        devices.forEach((device) => {
            if (device.kind == "videoinput") {
                if (device.label.match(/back/) != null) {
                    //console.log("Found video device: " + JSON.stringify(device));
                    videoDevices.push(device);
                }
            }
        });

        console.log(videoDevices);

        // open every video device and dump its characteristics

        let maxResolution = -1;
        for (let i in videoDevices) {
            const device = videoDevices[i];
            // console.log("Opening video device " + device.deviceId + " (" + device.label + ")");

            let stream;
            const streaming = await navigator.mediaDevices
                .getUserMedia({
                    video: { deviceId: { exact: device.deviceId } },
                })
                .then(
                    (stream) => {
                        stream.getVideoTracks().forEach((track) => {
                            const capabilities = track.getCapabilities();

                            if (capabilities.height.max >= maxResolution) {
                                console.log("here");
                                maxResolution = capabilities.height.max;
                                usedCameraId = device.deviceId;
                            }

                            //console.log("Track capabilities: " + JSON.stringify(capabilities));
                        });

                        stream.getTracks().forEach((track) => track.stop());
                    },
                    (err) => console.log(err)
                );
        }

        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: {
                        deviceId: usedCameraId,
                        focusMode: "continuous",
                        width: { min: 1920 },
                        height: { min: 1080 },
                        aspectRatio: {
                            min: 1,
                            max: 2,
                        },
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
            (err) => {
                if (err) {
                    Quagga.init(
                        {
                            inputStream: {
                                type: "LiveStream",
                                constraints: {
                                    deviceId: usedCameraId,
                                    focusMode: "continuous",
                                    width: { min: 960 },
                                    height: { min: 540 },
                                    aspectRatio: {
                                        min: 1,
                                        max: 2,
                                    },
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
                        (err) => {
                            if (err) {
                                this.setState({ error: true });
                                console.log(err);
                                return false;
                            }
                            Quagga.start();
                        }
                    );
                    return false;
                }
                Quagga.start();
            }
        );
        this.props.setQuagga(Quagga);
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
                {this.state.error ? (
                    <div className="scan-error">
                        Il semblerait que votre caméra ne soit pas détectée. Essayez de changer de
                        navigateur. Si le problème persiste, contactez-nous{" "}
                        <a href="mailto:corentin.branchereau@insa-lyon.fr?Subject=Lowympact-camera not working">
                            via ce lien
                        </a>
                    </div>
                ) : (
                    <React.Fragment />
                )}
            </React.Fragment>
        );
    }
}

export default Scanner;
