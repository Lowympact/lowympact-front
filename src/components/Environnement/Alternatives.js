import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import amplitude from "amplitude-js";

class Alternatives extends React.Component {
    state = {
        swiper: undefined,
    };

    componentDidMount = () => {
        this.loadAlternatives();
    };

    loadAlternatives = () => {
        let alternatives = [
            {
                id: 1,
                img_url: "/images/products/wh_cricket_soft_ST_2018_220x.png",
                name: "Gâteries d'entrainement aux grillons et shiitake",
                redirect: "https://fr.wilderharrier.com/collections/dog-treats#main",
            },
        ];
        this.setState({ alternatives: alternatives });
    };
    fireAmplitudeEvent = (event, product) => {
        try {
            amplitude.getInstance().logEvent(event, { product: product });
        } catch (e) {
            console.error(e);
        }
    };

    renderListAlternatives = (listItems) => {
        let res = <React.Fragment></React.Fragment>;
        res = listItems.map((item) => {
            let pathProduct = "/products/" + item.id;

            if (item.id !== this.props.barcode) {
                return (
                    <div
                        className="carousel"
                        key={item.id}
                        onClick={() => this.fireAmplitudeEvent("suggestion_redirected", item.name)}
                    >
                        <a
                            href={item.redirect}
                            className="product-alternative"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div>
                                <img
                                    src={item.img_url}
                                    className="product-alternative-image"
                                    alt=""
                                />
                            </div>
                            <div className="product-alternative-text">
                                <label className="product-alternative-title">{item.name}</label>
                                <label className="product-alternative-brand">{}</label>
                                {/* <RenderColor item={item} /> */}
                            </div>
                            <div className="product-alternative-fleche">{">"}</div>
                        </a>
                    </div>
                );
            } else {
                return <React.Fragment></React.Fragment>;
            }
        });

        return res;
    };

    render = () => {
        let alternatives_title = "";
        if (!this.state.alternatives) {
            alternatives_title = "Pas d'alternatives disponible";
        } else {
            if (this.state.alternatives === "loading") {
                alternatives_title = "Chargement des alternatives ...";
            } else {
                alternatives_title = "Découvrez aussi...";
            }
        }
        let alternatives;
        if (this.state.alternatives)
            alternatives = this.renderListAlternatives(this.state.alternatives);

        if (
            this.state.alternatives &&
            this.state.alternatives !== "loading" &&
            this.state.alternatives !== "" &&
            alternatives
        ) {
            return (
                <React.Fragment>
                    <span className="title-part-environnement">{alternatives_title}</span>
                    <Carousel
                        autoPlay={false}
                        interval={100000}
                        centerMode={true}
                        centerSlidePercentage={90}
                        showThumbs={false}
                        showIndicators={false}
                        showStatus={false}
                    >
                        {alternatives}
                    </Carousel>
                </React.Fragment>
            );
        } else {
            return <React.Fragment />;
        }
    };
}

export default Alternatives;

function RenderColor({ item }) {
    let labelColor;
    let labelLevel;
    if (item.eco_score <= 33) {
        labelColor = "red";
        labelLevel = "Mauvais";
    } else if (item.eco_score > 33 && item.eco_score < 67) {
        labelColor = "yellow";
        labelLevel = "Moyen";
    } else {
        labelColor = "green";
        labelLevel = "Bonne";
    }
    return (
        <div className="product-alternative-label-position">
            <div className="product-alternative-label">
                <div style={{ color: labelColor }}>●</div>
                <div className="product-alternative-label-text">{item.eco_score}/100</div>
            </div>
            <div className="product-alternative-label-level ">{labelLevel}</div>
        </div>
    );
}
