import React from "react";
import "./Scan.css";
import fruits from "../../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import {
  BarcodeFormat,
  DecodeHintType,
  BrowserCodeReader,
  MultiFormatReader,
} from "@zxing/library";

class Scan extends React.Component {
  state = { redirect: false, codeContent: undefined };

  setRedirect = (resultText) => {
    this.setState({
      redirect: true,
      codeContent: resultText,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={"/products/" + this.state.codeContent} />;
    }
  };

  componentDidMount = () => {
    const hints = new Map();
    const formats = [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.DATA_MATRIX /*, ...*/,
    ];

    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

    let codeReaderFormat = new MultiFormatReader();
    codeReaderFormat.setHints(hints);

    let multiFormatReader = new BrowserCodeReader(codeReaderFormat);
    multiFormatReader
      .decodeFromInputVideoDevice(undefined, "video")
      .then((result) => {
        this.setRedirect(result.text);
      })
      .catch((err) => console.error(err));
  };

  render = () => {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <Header />
        <Navbar />
        <div className="App">
          <video id="video"></video>
        </div>
      </React.Fragment>
    );
  };
}

export default Scan;
