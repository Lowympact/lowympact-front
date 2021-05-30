import React, { Component } from "react";
import Quagga from "@ericblade/quagga2";
import ImageUploader from "react-images-upload";

class Scanner extends Component {
    state = {
        error: false,
        usedCamera: 0,
        devices: [],
        processingImage: false,
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
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const camera = urlParams.get("camera");
        if (camera == "false") {
            this.setState({ error: true });
        } else if (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        ) {
            let usedCameraId;
            const devices = await navigator.mediaDevices
                .enumerateDevices()
                .then(function (devices) {
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
        } else {
            this.setState({ error: true });
        }
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
                    top: "30%",
                    right: "25%",
                    left: "25%",
                    bottom: "30%",
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
                        // console.log("here");
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
        console.log(stop);
        if (stop) {
            Quagga.stop();
        }
    };

    onDrop = (image) => {
        try {
            this.setState({ processingImage: true });
            console.log(image[image.length - 1]);
            let reader = new FileReader();
            reader.readAsDataURL(image[image.length - 1]);
            reader.onloadend = () => {
                Quagga.decodeSingle(
                    {
                        decoder: {
                            readers: ["ean_reader"], // List of active readers
                        },
                        locate: true, // try to locate the barcode in the image
                        src: reader.result, //image[image.length - 1], // or 'data:image/jpg;base64,' + data
                    },
                    (result) => {
                        console.log(result);
                        if (result) {
                            this._onDetected(result);
                            console.log("result", result.codeResult?.code);
                        } else {
                            console.log("not detected");
                        }
                    }
                );
            };
        } catch (err) {
            console.log(err);
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
                        <ImageUploader
                            withIcon={true}
                            withPreview={false}
                            buttonText="Importer une image"
                            onChange={this.onDrop}
                            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                            maxFileSize={5242880}
                        />
                        <p>
                            Il semblerait que votre caméra ne soit pas détectée. Vous pouvez
                            importer une photo de votre bibliothèque, ou essayer un autre
                            navigateur. Si le problème persiste, contactez-nous{" "}
                            <a href="mailto:contact@lowympact.fr?Subject=Lowympact-camera not working">
                                via ce lien
                            </a>
                        </p>
                    </div>
                ) : (
                    <React.Fragment />
                )}
            </React.Fragment>
        );
    }
}

export default Scanner;
