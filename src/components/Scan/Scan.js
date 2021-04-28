import React from "react";
import "./Scan.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import QrReader from "react-qr-reader";

import BarcodeScannerComponent from "react-webcam-barcode-scanner";

	handleError = (err) => {};

	handleScan = (res) => {
		console.log(res);
	};

	render = () => {
		return (
			<React.Fragment>
				{this.renderRedirect()}
				<span
					class="close"
					onClick={() => this.props.onCrossClicked(false)}
				>
					&times;
				</span>
				<QrReader
					delay={1}
					onError={this.handleError}
					onScan={this.handleScan}
					className="qrcode"
				/>
        <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err, result) => {
              if (result) console.log(result.text);
            }}
          />
			</React.Fragment>
		);
	};
}

export default Scan;
