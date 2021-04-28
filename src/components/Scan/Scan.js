import React from "react";
import "./Scan.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";

import BarcodeScannerComponent from "react-webcam-barcode-scanner";

class Scan extends React.Component {
  state = { redirect: false, routeRedirect: undefined };

  setRedirect = (resultText) => {
    this.setState({
      redirect: true,
      routeRedirect: "/products/" + resultText,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.routeRedirect} />;
    }
  };

  componentDidMount = () => {
    // 	// Get the modal
    // 	// var video = document.getElementById("video");
    // 	// Get the <span> element that closes the modal
    // 	var span = document.getElementsByClassName("close")[0];
    // 	// When the user clicks on <span> (x), close the modal
    // 	span.onclick = () => {
    // 		this.setState({
    // 			redirect: true,
    // 			routeRedirect: "/history",
    // 		});
    // 	};
    /*
		const hints = new Map();
		const formats = [BarcodeFormat.EAN_13];

		hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

		let codeReaderFormat = new MultiFormatReader();
		codeReaderFormat.setHints(hints);

		let multiFormatReader = new BrowserBarcodeReader();
		multiFormatReader
			.decodeFromInputVideoDevice(undefined, "video")
			.then((result) => {
				this.setRedirect(result.text);
			})
			.catch((err) => console.error(err));

			*/
  };

  render = () => {
    return (
      <React.Fragment>
        {this.renderRedirect()}

        <Header />
        <Navbar />
        <div className="App">
          <span class="close" onClick={() => this.props.onCrossClicked(false)}>
            &times;
          </span>
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err, result) => {
              if (result) console.log(result.text);
            }}
          />
        </div>
      </React.Fragment>
    );
  };
}

export default Scan;
