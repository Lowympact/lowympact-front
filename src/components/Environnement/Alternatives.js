import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class Alternatives extends React.Component {
    state = {
        swiper: undefined,
    };

    componentDidMount = () => {
        if (this.props.ecoScore) {
            this.loadAlternatives(this.props.ciqual_code);
        }
    };

    componentDidUpdate = (lastProps) => {
        if (lastProps.ciqual_code !== this.props.ciqual_code) {
            if (this.props.ciqual_code) {
                this.loadAlternatives(this.props.ciqual_code);
            }
        }
    };

    loadAlternatives = (code) => {
        this.setState({ alternatives: "loading" });
        fetch(`https://api.lowympact.fr/api/v1/alternatives/${code}`)
            .then((response) => response.json())
            .then((res) => {
                if (res.success && res.data?.alternativesInfos) {
                    if (
                        res.data?.alternativesInfos?.a?.length == 0 &&
                        res.data?.alternativesInfos?.b?.length == 0 &&
                        res.data?.alternativesInfos?.c?.length == 0 &&
                        res.data?.alternativesInfos?.d?.length == 0
                    ) {
                        this.setState({ alternatives: undefined });
                    } else {
                        this.setState({ alternatives: res.data.alternativesInfos });
                    }
                } else {
                    this.setState({ alternatives: undefined });
                }
            });
    };

    renderListAlternatives = (listItems) => {
        let res = <React.Fragment></React.Fragment>;
        res = listItems.map((item) => {
            let pathProduct = "/products/" + item.id;
            // Mock Front
            if (item.id === "8001505005707") {
                pathProduct += "/24";
            }

            if (item.id !== this.props.barcode) {
                return (
                    <div className="carousel" key={item.id}>
                        <a href={pathProduct} className="product-alternative">
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
                                <RenderColor item={item} />
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

    alternativesloop = () => {
        let alternativesList = <React.Fragment></React.Fragment>;
        if (
            this.state.alternatives &&
            this.state.alternatives !== "loading" &&
            this.state.alternatives !== ""
        ) {
            this.state.alternatives.a.sort(function (a, b) {
                return b.eco_score - a.eco_score;
            });

            this.state.alternatives.b.sort(function (a, b) {
                return b.eco_score - a.eco_score;
            });
            this.state.alternatives.c.sort(function (a, b) {
                return b.eco_score - a.eco_score;
            });
            this.state.alternatives.d.sort(function (a, b) {
                return b.eco_score - a.eco_score;
            });

            let tab;
            switch (this.props.ecoScore) {
                case "a":
                    return undefined;

                    break;
                case "b":
                    tab = this.state.alternatives.a;
                    if (tab.length == 0) {
                        return undefined;
                    } else {
                        alternativesList = this.renderListAlternatives(tab);
                    }
                    break;
                case "c":
                    tab = this.state.alternatives.a.concat(this.state.alternatives.b);

                    if (tab.length == 0) {
                        return undefined;
                    } else {
                        alternativesList = this.renderListAlternatives(tab);
                    }
                    break;
                case "d":
                    tab = this.state.alternatives.a
                        .concat(this.state.alternatives.b)
                        .concat(this.state.alternatives.c);

                    if (tab.length == 0) {
                        return undefined;
                    } else {
                        alternativesList = this.renderListAlternatives(tab);
                    }
                    break;
                case "e":
                    tab = this.state.alternatives.a
                        .concat(this.state.alternatives.b)
                        .concat(this.state.alternatives.c)
                        .concat(this.state.alternatives.d);
                    if (tab.length == 0) {
                        return undefined;
                    } else {
                        alternativesList = this.renderListAlternatives(tab);
                    }
                    break;
                default:
                    break;
            }
        }

        return alternativesList;
    };

    render = () => {
        let alternatives_title = "";
        if (!this.state.alternatives) {
            alternatives_title = "Pas d'alternatives disponible";
        } else {
            if (this.state.alternatives === "loading") {
                alternatives_title = "Chargement des alternatives ...";
            } else {
                alternatives_title = "Alternatives";
            }
        }
        let alternatives = this.alternativesloop();
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
