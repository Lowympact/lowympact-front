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
            this.setState({ error: true, text: 1 });
        } else if (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        ) {
            // On vient récupérer les flux vidéo existants
            let devices = await navigator.mediaDevices.enumerateDevices().then(function (devices) {
                return devices.filter((d) => d.kind === "videoinput");
            });
            this.setState({ devices: devices });

            //On prend seulement les caméras arrière
            //(toutes les caméra si caméra arrière non existante)
            let videoDevices = devices.filter((d) => d.label.match(/back/) != null);
            if (videoDevices.length === 0) {
                this.setState({ noBackCamera: true });
                videoDevices = devices;
            }
            console.log(videoDevices);
            // Get all camera capabilities
            let capabilities = videoDevices.map(async (device) => {
                return await navigator.mediaDevices
                    .getUserMedia({
                        video: { deviceId: { exact: device.deviceId } },
                    })
                    .then(
                        (stream) => {
                            let a = stream.getVideoTracks().map((track) => {
                                console.log(track);
                                if (track.getCapabilities) {
                                    return track.getCapabilities();
                                } else {
                                    return [{}];
                                }
                            });
                            stream.getTracks().forEach((track) => track.stop());
                            if (a.length > 1) this.setState({ mutlipleTracks: true });
                            return a[0];
                        },
                        (err) => console.log(err)
                    );
            });
            let capa = await Promise.all(capabilities);

            //On trie les capabilities pour mettre les meilleurs résolutions en premier
            capa.sort((a, b) => {
                if ((a.width.max + a.height.max) / 2 > (b.width.max + b.height.max) / 2) return -1;
                else return 1;
            });

            if (capa[0]) {
                this.QuaggaInit(capa[0]);
            } else if (videoDevices.length > 0) {
                this.QuaggaInit({ deviceId: videoDevices[0].deviceId });
            }
            this.QuaggaInit({});
        } else {
            this.setState({ error: true, text: 3 });
        }
    };

    QuaggaInit = (capabilities) => {
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
                    <p>Ce produit n'existe pas dans la base de données</p>
                </React.Fragment>
            );
        }
        if (this.state.processingImage == 3) {
            textImage = (
                <React.Fragment>
                    <p>Code barre non trouvé sur l'image, merci de réessayer</p>
                </React.Fragment>
            );
        }
        if (this.state.processingImage == 4) {
            textImage = (
                <React.Fragment>
                    <p>
                        Mauvais format ou fichier trop grand, merci de réessayer. <br />
                        Taille max : 5mb <br />
                        Formats: jpg, png, gif
                    </p>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <div id="interactive" className={this.state.error ? "hidden" : "viewport"} />

                {/* {this.state.devices?.length > 1 ? (
                    <button className="code-switch-camera" onClick={this.switchCamera}>
                        <span className="material-icons">cameraswitch</span>
                        {this.state.usedCamera}
                    </button>
                ) : (
                    <React.Fragment />
                )} */}
                {/* {!this.state.error ? (
                    <button className="code-switch-camera" onClick={this.setImport}>
                        clique ici si tu souhaite importer une image
                    </button>
                ) : (
                    ""
                )} */}
                {this.state.error ? (
                    <div className="scan-error">
                        <ImageUploader
                            withIcon={true}
                            withPreview={false}
                            buttonText={
                                <div className="button-import">
                                    <div className="material-icons">add_a_photo</div>
                                    <p>Prendre une photo</p>
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
                            {/* Il semblerait que votre caméra ne soit pas détectée. Vous pouvez
                            importer une photo de votre bibliothèque, ou essayer un autre
                            navigateur. <br />
                            <br /> */}
                            {/* Si le problème persiste, contactez-nous{" "}
                            <a href="mailto:contact@lowympact.fr?Subject=Lowympact-camera not working">
                                via ce lien
                            </a> */}
                            {/* {"code d'erreur : " + this.state.text} */}
                            {this.state.no_permission ? (
                                <div className="no-permission">
                                    L'accès à votre caméra est bloqué : Vous pouvez l'autoriser dans
                                    les paramètres de votre navigateur pour accéder au scanner
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
            </React.Fragment>
        );
    }
}

export default Scanner;
