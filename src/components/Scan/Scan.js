import React from "react";
import "./Scan.css";
import "./Toogle.css";
import QrReader from "react-qr-reader";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

import * as ScanditSDK from "scandit-sdk";

class Scan extends React.Component {
  state = {
    barcode: undefined,
    bcProductId: undefined,
  };

  componentDidMount = () => {
    // inside an async function
    ScanditSDK.configure(
      "ASHf6Cx7DGz5BbkR5RWee94Ezm55DtkCAFB5HoNVQLhPf8gUhk8ypmZ72tbfAdIo33/I2gZR9pcXcdBwQGyYu69PkahqLA0dEEN5WFtpVEjMfQMiBhwmRWIJQgn+E54DiwJm/5CjsV1+Uy7AJWXnvrLiuwxG2D/b7b1QoPFJfkKp2OSreWJXnV/kJ+rtqFyNOu2wQb5Rq5IFXOU/tnjlTvJp8Kxl4jezOVoWlQZreaLKfxfBforPArJErC16cldrqFULYUdsPqb4Vn27hWUmPQTfaX/SbeDCl1h++IPmcvRpzwM9hY0ti7zzfhBKg3TgEYTMiPUipakmM21mU92xYjA9kmKO6bOjzY4XqyrWBUzv/C1TwJfK1aZDDLH8BOmqqJILi2Ty9fN84y09vBgv0dfXhQa3Q0/UW0Hnv0Xge2am3RY5dmE6pfWaxYyA3fDj920DpnlUNcAsfdErnvpZz8H1eftw6D2w3ps6q3jNFc/CTkALFZOk9Sy2u+lOfzvjKrcz5d1yoSo1sVhFsLWNUoaoHTP6NPnQaawC1YwPRp90T+2yNfx+iESAhn3qfn2pOEpBG0rHdZNLLj1yeNJU9Pjt7dznNeCJwG2SzSQvPZU5HzLuIu+siWjUPStB9WWMfVluWN3opv+ReRWBjBsaRFPBmit6LNbRk3QLT6To50yVZg8Zy1NuDFUoE+Ms2ytVn9fs30n1DeNYJLCWjQJ4ktQaz2mIFTOFvRVrJqPkTBwzOaAjWoPxOr097hga8bRhPAqV6ir7ojSffUeCjL/jmp1x1uSE4OaQe3Y32oC0XOVJqA==",
      {
        engineLocation: "/node_modules/scandit-sdk/build",
      }
    )
      .then(() => {
        return ScanditSDK.BarcodePicker.create(
          document.getElementById("scandit-barcode-picker"),
          {
            // enable some common symbologies
            scanSettings: new ScanditSDK.ScanSettings({
              enabledSymbologies: ["ean8", "ean13", "upca", "upce"],
            }),
          }
        );
      })
      .then((barcodePicker) => {
        // barcodePicker is ready here, show a message every time a barcode is scanned
        barcodePicker.on("scan", (scanResult) => {
          alert(scanResult.barcodes[0].data);
        });
      });
  };

  // check compatibility

  handleBarcode = (err, res) => {
    if (res && res.text) {
      console.log("barcode", res.text);
      //détecté par barcode scanner
      let arr = res.text.split("/");
      console.log(arr);

      this.setState({ barcode: arr[0] });

      if (arr.length === 2) {
        this.setState({ bcProductId: arr[1] });
      }
    }
  };

  /*
  setModeScan = () => {
    this.setState({ QRcodeScan: !this.state.QRcodeScan });
  };
  */

  render = () => {
    /*if (this.state.QRcodeScan) {
    return (
      <React.Fragment>
        <span class="close" onClick={() => this.props.onCrossClicked(false)}>
          &times;
        </span>
        <QrReader delay={1} onScan={this.handleScan} className="qrcode" />

        <div className="barcode-popup">{this.state.barcode}</div>
      </React.Fragment>
    );
    } else {
		*/
    return (
      <React.Fragment>
        <div id="background-scan">
          <span class="close" onClick={() => this.props.onCrossClicked(false)}>
            &times;
          </span>
          <div id="scandit-barcode-picker"></div>
        </div>
      </React.Fragment>
    );
  };
}

export default Scan;
