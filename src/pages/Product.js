import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Traceability from "../components/Traceability/Traceability";
import "./Product.css";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class Product extends React.Component {
  state = {
    barcode: this.props.match.params.barcode,
    bcProductId: this.props.match.params.bcProductId,
    product: undefined,
    productImageUrl: undefined,
    productName: undefined,
    genericName: undefined,
    ecoScore: undefined,
    value: 0,
  };

  handleBarCodeUpdate = () => {
    if (this.state.barcode != this.props.match.params.barcode) {
      this.setState({
        barcode: this.props.match.params.barcode,
        bcProductId: this.props.match.params.bcProductId,
      });
      this.loadFromOpenFoodFacts(this.props.match.params.barcode);
      if (this.props.match.params.bcProductId) {
        this.loadProductInformations(
          this.props.match.params.barcode,
          this.props.match.params.bcProductId
        );
      }
    }
  };

  componentDidMount = () => {
    this.loadFromOpenFoodFacts(this.props.match.params.barcode);
    if (this.props.match.params.bcProductId) {
      this.loadProductInformations(
        this.props.match.params.barcode,
        this.props.match.params.bcProductId
      );
    }
  };
  loadProductInformations = (barcode, bcProductId) => {
    // var url = `https://api.lowympact.fr/api/v1/products/${this.state.barcode}?bcProductId=idbc`;
    // // `http://localhost:8080/api/v1/products/${this.state.barcode}?bcProductId=idbc`;

    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", url);

    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader(
    // 	"Authorization",
    // 	"Bearer 99d8fb95-abdd-4885-bf6c-3a81d8874043"
    // );

    // let setResponse = (res) => {
    // 	this.setState({
    // 		products: res.data.traceability,
    // 		impact: res.data.impact,
    // 	});
    // };

    // xhr.onreadystatechange = function () {
    // 	if (xhr.readyState === 4) {
    // 		console.log(xhr.status);
    // 		let res = JSON.parse(xhr.responseText);
    // 		console.log(res);
    // 		setResponse(res);
    // 	}
    // };

    // xhr.send();
    fetch(
      `https://api.lowympact.fr/api/v1/products/${barcode}?bcProductId=${bcProductId}`,
      // `http://localhost:8080/api/v1/products/${this.state.barcode}?bcProductId=${this.state.bcProductId}`,
      {
        method: "get",
        credentials: "include",
        headers: new Headers({
          Authorization: "Bearer 99d8fb95-abdd-4885-bf6c-3a81d8874043",
          "Content-Type": "application/json",
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({
          products: res.data.traceability,
          impact: res.data.impact,
        });
      });
  };

  loadFromOpenFoodFacts = (barcode) => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json/`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        let productImageUrl = res?.product?.image_url;
        let productName = res?.product?.product_name;
        let genericName = res?.product?.generic_name;
        let ecoScore = res?.product?.ecoscore_grade;

        if (productImageUrl) {
          this.setState({ productImageUrl: productImageUrl });
        }
        if (productName) {
          this.setState({ productName: productName });
        }
        if (genericName) {
          this.setState({ genericName: genericName });
        }
        if (ecoScore && ecoScore !== "not-applicable") {
          this.setState({ ecoScore: ecoScore });
        }
      });
  };

  flip = (event) => {
    if (event.target.style.transform === "rotateY(360deg)") {
      event.target.style.transform = "rotateY(0deg)";
    } else {
      event.target.style.transform = "rotateY(360deg)";
    }
  };

  displayImage = () => {
    this.handleBarCodeUpdate();

    let image = <React.Fragment />;
    let productName = <React.Fragment />;
    let genericName = <React.Fragment />;
    let ecoScore = <React.Fragment />;
    if (this.state.productImageUrl) {
      image = (
        <img
          src={this.state.productImageUrl}
          className="product-image"
          alt="produit"
        />
      );
    }

    if (this.state.productName) {
      productName = (
        <div className="product-name">{this.state.productName}</div>
      );
    }
    if (this.state.ecoScore) {
      let scoreClass = "color_score_" + this.state.ecoScore;
      ecoScore = (
        <div className="product-ecoscore">
          <span className={"circle-score " + scoreClass}>⬤ </span>
          EcoScore :
          <span className="uppercase ">{" " + this.state.ecoScore}</span>
        </div>
      );
    } else if (this.state.genericName) {
      genericName = (
        <div className="product-generic-name">{this.state.genericName}</div>
      );
    }
    return (
      <React.Fragment>
        {image}
        {productName}
        <div className="product-bottom-image-div">
          {genericName}
          {ecoScore}
        </div>
      </React.Fragment>
    );
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render = () => {
    return (
      <React.Fragment>
        <div className="product-page-container">
          <div className="product-header-container">
            <div className="product-history-link">
              <a href="/history"> {"<"} Historique</a>
            </div>
            <img
              className="product-bitmap-image"
              src="/images/utils/bitmap.png"
              alt=""
            />
          </div>
          <div className="product-image-container" onClick={this.flip}>
            {this.displayImage()}
          </div>

          <AppBar position="static">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Traçabilité"></Tab>

              <Tab label="Environnement" />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <div className="product-bottom-container">
              <Traceability products={this.state.products} />
            </div>
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            Item Two
          </TabPanel>
          <Navbar
            barcode={this.props.match.params.barcode}
            bcProductId={this.props.match.params.bcProductId}
          />
        </div>
      </React.Fragment>
    );
  };
}

export default Product;
