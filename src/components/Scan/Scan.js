import React from "react";
import "./Scan.css";
import "./Toogle.css";
import QrReader from "react-qr-reader";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

class Scan extends React.Component {
  state = {
    barcode: undefined,
    bcProductId: undefined,
  };

  /* handleScan = (res) => {
    if (res) {
      //détecté par qrcode scanner
      let arr = res.split("/");
      console.log("qrcode", arr);
      if (arr.length === 6) {
        this.setState({ barcode: arr[4], bcProductId: arr[5] });
      }
      if (arr.length === 5) {
        this.setState({ barcode: arr[4] });
      }
    }
  };
  */

  handleBarcode = (err, res) => {
    if (res && res.text) {
      console.log("barcode", res.text);
      //détecté par barcode scanner
      let arr = res.text.split("/");
      console.log(arr);

      /*if (arr.length === 6) {
        this.setState({ barcode: arr[4], bcProductId: arr[5] });
      }
      if (arr.length === 5) {
        this.setState({ barcode: arr[4] });
      }
	  */

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
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={this.handleBarcode}
            className="barcode-scanner"
          />
          <div className="barcode-popup">{this.state.barcode}</div>
        </div>
      </React.Fragment>
    );
  };
}

export default Scan;
