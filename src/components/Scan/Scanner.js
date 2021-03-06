import React, { Component } from "react";
import Quagga from "@ericblade/quagga2";
import ImageUploader from "react-images-upload";

class Scanner extends Component {
    state = {
        error: false,
        noBackCamera: false,
        usedCamera: 0,
        devices: [],
        processingImage: 0,
        text: 0,
        mutlipleTracks: false,
        no_permission: false,
        locked: false,
    };

    locked = false;

    switchCamera = async () => {
        if (!this.state.locked) {
            this.setState({ locked: true });
            let num = this.state.usedCamera + 1;
            if (num >= this.state.devices.length) {
                num = 0;
            }
            this.setState({ usedCamera: num });
            Quagga.stop();
            this.QuaggaInit(this.state.devices[num].deviceId);
            await delay(800);
            this.setState({ locked: false });
        }
    };

    componentDidMount = async () => {
        if (this.props.capabilities) {
            this.setState({ devices: this.props.capabilities, usedCamera: 0 });
            this.QuaggaInit(this.props.capabilities[0]);
        } else {
            this.QuaggaInit({ facingMode: "environment" });
        }
    };

    QuaggaInit = (capabilities) => {
        console.log(capabilities);
        if (Object.keys(capabilities).length == 0) {
            this.setState({ text: "vide" });
        }
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: {
                        ...capabilities,
                    },
                },
                locator: {
                    patchSize: "normal",
                    halfSample: false,
                },
                locate: false,
                area: {
                    top: "40%",
                    right: "25%",
                    left: "25%",
                    bottom: "40%",
                },
                numOfWorkers: window.navigator.hardwareConcurrency || 2,
                decoder: {
                    readers: ["ean_reader"],
                },
                multiple: false,
                singleChannel: false,
            },
            (err) => {
                if (err) {
                    console.log(err);
                    if (err == "NotAllowedError: Permission denied") {
                        this.setState({ no_permission: true });
                    }
                    this.setState({ error: true, text: err + " " + JSON.stringify(capabilities) });
                    return false;
                }
                Quagga.start();
            }
        );
        this.props.setQuagga(Quagga);
        console.log(Quagga.CameraAccess);
        Quagga.onDetected(this._onDetected);
    };

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected = async (result) => {
        let stop = await this.props.onDetected(result);
        console.log(stop);
        if (stop) {
            // Quagga.stop();
        }
    };

    onDrop = (image) => {
        try {
            if (this.state.processingImage != 1) {
                this.setState({ processingImage: 1 });
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
                                this.setState({ processingImage: 2 });
                                console.log("result", result.codeResult?.code);
                            } else {
                                console.log("not detected");
                                this.setState({ processingImage: 3 });
                            }
                        }
                    );
                };
            }
        } catch (err) {
            console.log(err);
            this.setState({ processingImage: 4 });
        }
    };

    setImport = () => {
        this.setState({ error: !this.state.error });
    };

    render() {
        let textImage = <React.Fragment></React.Fragment>;

        if (this.state.processingImage == 1) {
            textImage = (
                <React.Fragment>
                    <p>Chargement en cours...</p>
                </React.Fragment>
            );
        }
        if (this.state.processingImage == 2) {
            textImage = (
                <React.Fragment>
                    <p>Ce produit n'existe pas dans la base de donn??es</p>
                </React.Fragment>
            );
        }
        if (this.state.processingImage == 3) {
            textImage = (
                <React.Fragment>
                    <p>Code barre non trouv?? sur l'image, merci de r??essayer</p>
                </React.Fragment>
            );
        }
        if (this.state.processingImage == 4) {
            textImage = (
                <React.Fragment>
                    <p>
                        Mauvais format ou fichier trop grand, merci de r??essayer. <br />
                        Taille max : 5mb <br />
                        Formats: jpg, png, gif
                    </p>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <div className="interactive-wrapper">
                    <div id="interactive" className={this.state.error ? "hidden" : "viewport"}>
                        <div className="a" />
                        <div className="b" />
                        <div className="c" />
                        <div className="d" />
                    </div>
                    {this.state.devices?.length > 1 ? (
                        <button className="code-switch-camera" onClick={this.switchCamera}>
                            <span
                                className="material-icons"
                                style={{ color: this.state.locked ? "#777777" : "#1b3044" }}
                            >
                                cameraswitch
                            </span>
                            {this.state.usedCamera}
                        </button>
                    ) : (
                        <React.Fragment />
                    )}

                    {/* <button className="code-switch-camera" onClick={this.setImport}>
                        <span className="material-icons green">
                            {!this.state.error ? "upload_file" : "flip"}
                        </span>
                    </button> */}

                    {this.state.error ? (
                        <div className="scan-error">
                            <ImageUploader
                                withIcon={true}
                                withPreview={false}
                                buttonText={
                                    <div className="button-import">
                                        <div className="material-icons">add_a_photo</div>
                                        <p>Importer une photo</p>
                                    </div>
                                }
                                onChange={this.onDrop}
                                label={""}
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                                labelClass={"import-label"}
                            />
                            <p className="red">{textImage}</p>
                            <p className="error-message-import">
                                {/* Il semblerait que votre cam??ra ne soit pas d??tect??e. Vous pouvez
                            importer une photo de votre biblioth??que, ou essayer un autre
                            navigateur. <br />
                            <br /> */}
                                {/* Si le probl??me persiste, contactez-nous{" "}
                            <a href="mailto:contact@lowympact.fr?Subject=Lowympact-camera not working">
                                via ce lien
                            </a> */}
                                {/* {"code d'erreur : " + this.state.text} */}
                                {this.state.no_permission ? (
                                    <div className="no-permission">
                                        L'acc??s ?? votre cam??ra est bloqu?? : Vous pouvez l'autoriser
                                        dans les param??tres de votre navigateur pour acc??der au
                                        scanner
                                    </div>
                                ) : (
                                    <React.Fragment />
                                )}
                                <br />
                            </p>
                        </div>
                    ) : (
                        <React.Fragment />
                    )}
                    {this.state.mutlipleTracks ? (
                        <h1 className="debug">If you see this, tell me</h1>
                    ) : (
                        ""
                    )}
                    <div className="debug">{this.state.text}</div>
                </div>
            </React.Fragment>
        );
    }
}

export default Scanner;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
