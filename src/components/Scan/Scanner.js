import React, { Component } from "react";
import Quagga from "quagga";

class Scanner extends Component {
    state = {
        error: false,
        usedCamera: 0,
        devices: [],
    };

    switchCamera = () => {
        let num = this.state.usedCamera + 1;
        if (num >= this.state.devices.length) {
            num = 0;
        }
        this.setState({ usedCamera: num });
        Quagga.stop();
        this.QuaggaInit(this.state.devices[num].deviceId);
    };

    componentDidMount = async () => {
        let usedCameraId;
        const devices = await navigator.mediaDevices.enumerateDevices().then(function (devices) {
            return devices;
        });
        let videoDevices = [];
        devices.forEach((device) => {
            if (device.kind === "videoinput") {
                videoDevices.push(device);
                // if (device.label.match(/back/) != null) {
                //     ////console.log("Found video device: " + JSON.stringify(device));
                // }
            }
        });
        // ALL  cameras
        //console.log(videoDevices);
        this.setState({ devices: videoDevices });

        // open every video device and dump its characteristics
        let maxResolution = -1;
        for (let i in videoDevices) {
            const device = videoDevices[i];
            // //console.log("Opening video device " + device.deviceId + " (" + device.label + ")");

            await navigator.mediaDevices
                .getUserMedia({
                    video: { deviceId: { exact: device.deviceId } },
                })
                .then(
                    (stream) => {
                        stream.getVideoTracks().forEach((track) => {
                            const capabilities = track.getCapabilities();

                            if (
                                capabilities.height.max >= maxResolution &&
                                device.label.match(/back/) != null
                            ) {
                                maxResolution = capabilities.height.max;
                                usedCameraId = device.deviceId;
                                this.setState({ usedCamera: i });
                            }

                            ////console.log("Track capabilities: " + JSON.stringify(capabilities));
                        });

                        stream.getTracks().forEach((track) => track.stop());
                    },
                    (err) => console.log(err)
                );
        }
        this.QuaggaInit(usedCameraId);
    };

    QuaggaInit = (usedCameraId, width = 1920, height = 1080) => {
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: {
                        deviceId: usedCameraId,
                        focusMode: "continuous",
                        width: { min: width },
                        height: { min: height },
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
                    //console.log(err);
                    if (width != 960 && height != 540) {
                        this.QuaggaInit(usedCameraId, 960, 540);
                    } else {
                        this.setState({ error: true });
                    }
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
        //console.log(stop);
        if (stop) {
            Quagga.stop();
        }
    };

    render() {
        return (
            <React.Fragment>
                <div id="interactive" className="viewport" />
                {this.state.devices?.length > 1 ? (
                    <button className="code-switch-camera" onClick={this.switchCamera}>
                        <span className="material-icons">cameraswitch</span>
                        {this.state.usedCamera}
                    </button>
                ) : (
                    <React.Fragment />
                )}
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
