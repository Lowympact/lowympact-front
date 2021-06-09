import "./Navbar.css";
import React from "react";
import ButtonHistory from "../Button/ButtonHistory";
import ButtonProfil from "../Button/ButtonProfil";
import ButtonScan from "../Button/ButtonScan";
// import Scan from "../Scan/Scan";
import Scan from "../Scan/Scan";
// import { ScanSettings } from "scandit-sdk";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    state = {
        showScanner: false,
        barcode: undefined,
        bcProductId: undefined,
        height: 0,
        capabilities: undefined,
    };

    componentDidMount = async () => {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        try {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const camera = urlParams.get("camera");
            if (
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia
            ) {
                // On vient récupérer les flux vidéo existants
                let devices = await navigator.mediaDevices
                    .enumerateDevices()
                    .then(function (devices) {
                        return devices.filter((d) => d.kind === "videoinput");
                    });

                //On prend seulement les caméras arrière
                //(toutes les caméra si caméra arrière non existante)
                let videoDevices = devices.filter((d) => d.label.match(/back/) != null);
                if (videoDevices.length === 0) {
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
                                if (a && a.length > 0) return a[0];
                                else return {};
                            },
                            (err) => console.log(err)
                        );
                });
                let capa = await Promise.all(capabilities);
                if (capa && capa.length > 0) {
                    //On trie les capabilities pour mettre les meilleurs résolutions en premier
                    capa.sort((a, b) => {
                        if ((a.width.max + a.height.max) / 2 > (b.width.max + b.height.max) / 2)
                            return -1;
                        else return 1;
                    });
                }

                if (capa[0]) {
                    this.setState({ capabilities: capa });
                } else this.setState({ capabilities: undefined });
            } else {
                this.setState({ capabilities: undefined });
            }
        } catch (err) {
            this.setState({ capabilities: undefined });
        }
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ height: window.innerHeight });
    };

    handleScannerButton = (bool) => {
        this.setState({ showScanner: bool });
    };

    // handleBarcode = (res) => {
    //     if (res) {
    //         //détecté par barcode scanner
    //         let arr = res.split("/");
    //         if (arr.length > 1) {
    //             this.setState({
    //                 barcode: arr[4],
    //                 bcProductId: arr[5],
    //                 showScanner: false,
    //             });
    //         } else {
    //             this.setState({
    //                 barcode: arr[0],
    //                 showScanner: false,
    //                 bcProductId: undefined,
    //             });
    //         }
    //     }
    // };

    render = () => {
        if (this.state.height < 550) {
            return <React.Fragment />;
        }
        // if (
        //     this.state.barcode &&
        //     this.state.bcProductId &&
        //     (this.props.barcode !== this.state.barcode ||
        //         this.props.bcProductId !== this.state.bcProductId)
        // ) {
        //     return (
        //         <Redirect to={"/products/" + this.state.barcode + "/" + this.state.bcProductId} />
        //     );
        // }

        // if (this.state.barcode && this.props.barcode !== this.state.barcode) {
        //     return <Redirect to={"/products/" + this.state.barcode} />;
        // }

        if (!this.state.showScanner) {
            return (
                <React.Fragment>
                    <div className="navbar-container">
                        <Link
                            to="/history"
                            className={
                                window.location.pathname === "/history"
                                    ? "navbar-link navbar-text-left navbar-selected"
                                    : "navbar-link navbar-text-left "
                            }
                        >
                            <ButtonHistory />
                        </Link>
                        <div onClick={() => this.handleScannerButton(true)}>
                            <div className="navbar-circle">
                                <ButtonScan />
                            </div>
                        </div>
                        <span className="navbar-scan-text">Scan</span>
                        <Link
                            to="/profil"
                            className={
                                window.location.pathname === "/profil"
                                    ? "navbar-link navbar-text-right navbar-selected"
                                    : "navbar-link navbar-text-right "
                            }
                        >
                            <ButtonProfil />
                        </Link>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                // <Scan
                //     onCrossClicked={this.handleScannerButton}
                //     // playSoundOnScan={true}
                //     vibrateOnScan={true}
                //     enableTorchToggle={true}
                //     enablePinchToZoom={true}
                //     enableCameraSwitcher={true}
                //     guiStyle={"viewfinder"}
                //     scanSettings={
                //         new ScanSettings({
                //             enabledSymbologies: [
                //                 "qr",
                //                 "ean8",
                //                 "ean13",
                //                 "upca",
                //                 "upce",
                //                 "code128",
                //                 "code39",
                //                 "code93",
                //                 "itf",
                //             ],
                //             codeDuplicateFilter: 1000,
                //         })
                //     }
                //     onScan={(scanResult) => {
                //         //console.log(scanResult.barcodes[0].data);
                //         this.handleBarcode(scanResult.barcodes[0].data);
                //     }}
                //     onError={(error) => {
                //         console.error(error.message);
                //     }}
                // />
                <Scan
                    showScanner={this.handleScannerButton}
                    history={this.props.history}
                    capabilities={this.state.capabilities}
                />
            );
        }
    };
}

export default Navbar;
