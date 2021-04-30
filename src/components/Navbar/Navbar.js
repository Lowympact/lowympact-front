import "./Navbar.css";
import React from "react";
import ButtonHistory from "../Button/ButtonHistory";
import ButtonProfil from "../Button/ButtonProfil";
import ButtonScan from "../Button/ButtonScan";
import Scan from "../Scan/Scan";
import { ScanSettings, Barcode } from "scandit-sdk";
import { Redirect } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    showScanner: false,
    barcode: undefined,
    bcProductId: undefined,
  };

  handleScannerButton = (bool) => {
    this.setState({ showScanner: bool });
  };

  handleBarcode = (res) => {
    if (res) {
      console.log("barcode", res);
      //détecté par barcode scanner
      let arr = res.split("/");
      console.log(arr);
      this.setState({ barcode: arr[0] });
    }
  };

  render = () => {
    if (this.state.barcode) {
      return <Redirect to={"/products/" + this.state.barcode} />;
    }
    if (this.state.showScanner) {
      return (
        <Scan
          onCrossClicked={this.handleScannerButton}
          playSoundOnScan={true}
          vibrateOnScan={true}
          enableTorchToggle={true}
          enablePinchToZoom={true}
          enableCameraSwitcher={true}
          scanSettings={
            new ScanSettings({
              enabledSymbologies: [
                "qr",
                "ean8",
                "ean13",
                "upca",
                "upce",
                "code128",
                "code39",
                "code93",
                "itf",
              ],
              codeDuplicateFilter: 1000,
            })
          }
          onScan={(scanResult) => {
            console.log(scanResult.barcodes[0].data);
            this.handleBarcode(scanResult.barcodes[0].data);
          }}
          onError={(error) => {
            console.error(error.message);
          }}
        />
      );
    } else {
      return (
        <React.Fragment>
          <div className="navbar-container">
            <a href="/history" className="navbar-link navbar-text-left">
              <ButtonHistory />
            </a>
            <div onClick={() => this.handleScannerButton(true)}>
              <div className="navbar-circle">
                <ButtonScan />
              </div>
            </div>
            <span className="navbar-scan-text">scan</span>
            <a href="/profil" className="navbar-link navbar-text-right">
              <ButtonProfil />
            </a>
          </div>
        </React.Fragment>
      );
    }
  };
}

export default Navbar;
