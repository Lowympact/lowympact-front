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
        devices: [],
        usedCamera: 0,
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

    componentDidMount = async () => {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        const devices = await navigator.mediaDevices.enumerateDevices().then(function (devices) {
            return devices;
        });
        let videoDevices = [];
        devices.forEach((device) => {
            if (device.kind === "videoinput") {
                videoDevices.push(device);
                // if (device.label.match(/back/) != null) {
                //     //console.log("Found video device: " + JSON.stringify(device));
                // }
            }
        });
        // ALL  cameras
        this.setState({ devices: videoDevices });

        // open every video device and dump its characteristics
        let maxResolution = -1;
        for (let i in videoDevices) {
            const device = videoDevices[i];
            // console.log("Opening video device " + device.deviceId + " (" + device.label + ")");

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
                                this.setState({ usedCamera: i });
                            }

                            //console.log("Track capabilities: " + JSON.stringify(capabilities));
                        });

                        stream.getTracks().forEach((track) => track.stop());
                    },
                    (err) => console.log(err)
                );
        }
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
                //         console.log(scanResult.barcodes[0].data);
                //         this.handleBarcode(scanResult.barcodes[0].data);
                //     }}
                //     onError={(error) => {
                //         console.error(error.message);
                //     }}
                // />
                <Scan
                    showScanner={this.handleScannerButton}
                    history={this.props.history}
                    devices={this.state.devices}
                    usedCamera={this.state.usedCamera}
                />
            );
        }
    };
}

export default Navbar;
