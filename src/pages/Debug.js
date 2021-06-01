// import React from "react";
// import "./Debug.css";
// import "./Profil.css";
// import { Link } from "react-router-dom";
// import Header from "../components/Header/Header";
// import Navbar from "../components/Navbar/Navbar";

// class Debug extends React.Component {
//     render = () => {
//         return (
//             <div>
//                 <Link to="/">
//                     <Header />
//                 </Link>

//                 <Navbar />
//                 <div className="debug-container">
//                     <h1> Problèmes de Caméra </h1>
//                     <h2>Ma caméra n'est pas activée</h2>
//                     <p> </p>
//                     <h2>Ma caméra est activée mais le code barre n'est pas détecté</h2>
//                 </div>
//             </div>
//         );
//     };
// }

// export default Debug;
import React, { Component } from "react";
import Quagga from "quagga";

class Debug extends Component {
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
            function (err) {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            }
        );
        // this.props.setQuagga(Quagga);
        Quagga.onDetected(this._onDetected);
    };

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected = async (result) => {
        // let stop = await this.props.onDetected(result);
        // console.log(stop);
        // if (stop) {
        // Quagga.stop();
        // }
    };

    render() {
        return (
            <React.Fragment>
                <div id="interactive" className="viewport" />
            </React.Fragment>
        );
    }
}

export default Debug;
