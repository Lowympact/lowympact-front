import React from "react";
import "./Environnement.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";
import { CircleProgress } from "react-gradient-progress";

class Environnement extends React.Component {
  state = {
    swiper: undefined,
    currentIndex: 0,
    width: undefined,
  };

  getMaterialIcon = (mode) => {
    switch (mode) {
      case "Recyclable":
        return "check_circle_outline";
      case "Non recyclable":
        return "highlight_off";
      case "Truck":
        return "local_shipping";
      case "Packaging":
        return "inventory_2";
      default:
        return "view_in_ar";
    }
  };

  getColor = (note) => {
    if (note > 67) {
      return "green";
    }
    if (note <= 33) {
      return "red";
    }
    return "yellow";
  };

  getColorImpact = (note) => {
    if (note > 70) {
      return "green";
    }
    if (note <= 40) {
      return "red";
    }
    return "yellow";
  };

  getLabel = (note) => {
    if (note > 67) {
      return "Bon";
    }
    if (note <= 33) {
      return "Mauvais";
    }
    return "Moyen";
  };

  getLabelImpact = (note) => {
    if (note > 60) {
      return "Impact fort";
    }
    if (note <= 30) {
      return "Impact faible";
    }
    return "Impact moyen";
  };

  getLabelImpactPackaging = (note) => {
    if (note > 2) {
      return "Bon";
    }
    if (note < -2) {
      return "Mauvais";
    }
    return "Moyen";
  };

  getColorImpactPackaging = (note) => {
    if (note > 2) {
      return "green";
    }
    if (note < -2) {
      return "red";
    }
    return "yellow";
  };

  displaySlides = () => {
    let slides = <React.Fragment></React.Fragment>;

    if (
      this.props.dataEcoScore &&
      this.props.dataEcoScore?.adjustments?.packaging?.packagings.length >= 1
    ) {
      slides = this.props.dataEcoScore?.adjustments?.packaging?.packagings.map(
        (data) => {
          var recyclable = "";
          if (data.recycling) {
            recyclable = data.recycling.split(":")[1];
          }
          if (recyclable && recyclable == "recycle") {
            recyclable = "Recyclable";
          } else if (recyclable && recyclable == "discard") {
            recyclable = "Non recyclable";
          } else {
            recyclable = "";
          }

          return (
            <SwiperSlide>
              <div className="env-product-slide-container ">
                <div className="env-product-slide-icon">
                  <span class="material-icons env-icon-label">
                    {this.getMaterialIcon("")}
                  </span>
                </div>
                <div className="env-product-slide-wrapper">
                  <div className="product-slide-name">
                    {data?.material.split(":")[1]}
                  </div>
                  <div className="product-ecoscore">
                    Ecoscore : {data?.ecoscore_material_score}
                  </div>

                  <div className="env-history-label-container">
                    <span
                      className="packaging-label-color"
                      style={{
                        color: this.getColor(data?.ecoscore_material_score),
                      }}
                    >
                      ●
                    </span>
                    <div className="env-history-label">
                      {this.getLabel(data?.ecoscore_material_score)}
                    </div>
                  </div>
                  <div className="product-slide-recyclable">
                    {recyclable}
                    <div className="material-icons icon-label-recyclable">
                      {this.getMaterialIcon(recyclable)}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        }
      );
    }
    return slides;

    // return slides;
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  displayTransportImpact = () => {
    let res = <React.Fragment></React.Fragment>;

    var agribalyse_CO2 = undefined;
    var transportation_score = undefined;
    var transport_final_indicator = undefined;
    var n = 0;

    if (this.props.dataEcoScore?.agribalyse?.co2_transportation) {
      agribalyse_CO2 =
        0.5 * this.props.dataEcoScore?.agribalyse?.co2_transportation;
      n += 1;
    }

    if (
      this.props.dataEcoScore?.adjustments?.origins_of_ingredients?.value_fr
    ) {
      transportation_score =
        0.5 +
        this.props.dataEcoScore?.adjustments?.origins_of_ingredients?.value_fr *
          (-1.0 / 40.0);
      n += 1;
    }
    if (n > 0) {
      if (!agribalyse_CO2) {
        agribalyse_CO2 = 0;
      }
      if (!transportation_score) {
        transportation_score = 0;
      }
      transport_final_indicator = (agribalyse_CO2 + transportation_score) / n;
      if (transport_final_indicator > 1) {
        transport_final_indicator = 1;
      }
      if (transport_final_indicator < 0) {
        transport_final_indicator = 0;
      }
    }

    let co2_impact_html = <React.Fragment></React.Fragment>;
    let transportation_score_html = <React.Fragment></React.Fragment>;

    if (agribalyse_CO2 > 0) {
      co2_impact_html = (
        <div className="product-transport-impact-content-details-text">
          {agribalyse_CO2.toFixed(3)}kg C02 eq/kg produit
        </div>
      );
    }

    if (transportation_score > 0) {
      transportation_score_html = (
        <div className="product-transport-impact-content-details-score">
          Impact du transport des ingrédients en France :
          <span
            style={{
              color: this.getColorImpact(100 - transportation_score * 100),
            }}
          >
            {Math.round(transportation_score * 100)}
          </span>
          /100
        </div>
      );
    }

    if (transport_final_indicator) {
      transport_final_indicator = Math.round(transport_final_indicator * 100);
      return (
        <div className="product-transport-impact-container">
          <div className="product-transport-impact-header">
            <div className="product-transport-impact-logo">
              <div className="material-icons icon-label-transport-impact">
                {this.getMaterialIcon("Truck")}
              </div>
            </div>
            <div className="product-transport-impact-title">
              <div className="product-transport-impact-title-text">
                Impact du transport
              </div>
              <div className="product-transport-impact-title-label">
                {this.getLabelImpact(transport_final_indicator)}
              </div>
            </div>
            <div
              className="product-transport-impact-color-label"
              style={{
                color: this.getColorImpact(100 - transport_final_indicator),
              }}
            >
              ●
            </div>
          </div>
          <div className="product-transport-impact-content">
            <div className="product-transport-impact-content-text">
              Impact total transport en % :
            </div>
            <div className="product-transport-impact-content-progress">
              <CircleProgress
                percentage={transport_final_indicator}
                strokeWidth={window.innerWidth * (1.0 / 50.0)}
                width={window.innerWidth * (1.0 / 4.0)}
                fontSize={window.innerWidth * (1.0 / 20.0)}
                primaryColor={["#FF3333", "#33FF63"]}
              />
            </div>
          </div>
          <div className="product-transport-impact-content-details">
            {co2_impact_html}
            {transportation_score_html}
          </div>
        </div>
      );
    }

    return res;
  };

  diplayPackagingDetailImpact = () => {
    let slides = <React.Fragment></React.Fragment>;
    if (
      this.props.dataEcoScore &&
      this.props.dataEcoScore?.adjustments?.packaging?.packagings.length >= 1
    ) {
      slides = this.props.dataEcoScore?.adjustments?.packaging?.packagings.map(
        (data) => {
          var recyclable = "";
          if (data.recycling) {
            recyclable = data.recycling.split(":")[1];
          }
          if (recyclable && recyclable == "recycle") {
            recyclable = "Recyclable";
          } else if (recyclable && recyclable == "discard") {
            recyclable = "Non recyclable";
          } else {
            recyclable = "";
          }

          return <React.Fragment></React.Fragment>;
        }
      );
    }
    return slides;
  };

  displayPackagingImpact = () => {
    let res = <React.Fragment></React.Fragment>;

    if (this.props.dataEcoScore?.adjustments?.packaging?.value) {
      return (
        <div className="product-packaging-impact-container">
          <div className="product-packaging-impact-header">
            <div className="product-packaging-impact-logo">
              <div className="material-icons icon-label-transport-impact">
                {this.getMaterialIcon("")}
              </div>
            </div>
            <div className="product-packaging-impact-title">
              <div className="product-packaging-impact-title-text">
                Impact du packaging
              </div>
              <div className="product-packaging-impact-title-label">
                {this.getLabelImpactPackaging(
                  this.props.dataEcoScore?.adjustments?.packaging?.value
                )}
              </div>
            </div>
            <div
              className="product-packaging-impact-color-label"
              style={{
                color: this.getColorImpactPackaging(
                  this.props.dataEcoScore?.adjustments?.packaging?.value
                ),
              }}
            >
              ●
            </div>
          </div>
          <div className="product-transport-impact-content-details">
            {this.diplayPackagingDetailImpact()}
          </div>
        </div>
      );
    }
  };

  onSlideChange = (index) => {
    this.setState({ currentIndex: index });
  };

  displayAlternatives = () => {
    let slides = <React.Fragment></React.Fragment>;
    return (
      <SwiperSlide>
        <div className="env-product-slide-container ">
          <div className="env-product-slide-icon">
            <span class="material-icons env-icon-label">
              {this.getMaterialIcon("")}
            </span>
          </div>
          <div className="env-product-slide-wrapper">
            <div className="product-slide-name">Nom</div>
            <div className="product-ecoscore">Ecoscore : 1</div>

            <div className="env-history-label-container">
              <span
                className="packaging-label-color"
                style={{
                  color: this.getColor(0),
                }}
              ></span>
            </div>
          </div>
        </div>
      </SwiperSlide>
    );
  };

  render = () => {
    if (
      this.props.dataEcoScore &&
      this.props.dataEcoScore?.adjustments?.packaging?.packagings.length >= 1
    ) {
      return (
        <React.Fragment>
          <span className="title-part-environnement">
            Impact de l'emballage
          </span>
          {this.displayPackagingImpact()}

          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            onSlideChange={(i) => this.onSlideChange(i.activeIndex)}
            onSwiper={(swiper) => this.setState({ swiper: swiper })}
          >
            {this.displaySlides()}
          </Swiper>
          {this.displayTransportImpact()}

          <span className="title-part-environnement">Alternatives</span>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            onSlideChange={(i) => this.onSlideChange(i.activeIndex)}
            onSwiper={(swiper) => this.setState({ swiper: swiper })}
          ></Swiper>
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };
}

export default Environnement;
