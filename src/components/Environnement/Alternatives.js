import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

class Alternatives extends React.Component {
    state = {
        swiper: undefined,
    };

    renderListAlternatives = (listItems) => {
        var res = <React.Fragment></React.Fragment>;
        res = listItems.map((item) => {
            var pathProduct = "/products/" + item.id;
            // Mock Front
            if (item.id === "8001505005707") {
                pathProduct += "/24";
            }

            if (item.id !== this.props.barcode) {
                return (
                    <SwiperSlide key={item.id}>
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
                    </SwiperSlide>
                );
            } else {
                return <React.Fragment></React.Fragment>;
            }
        });

        return res;
    };

    alternativesloop = () => {
        var alternativesList = <React.Fragment></React.Fragment>;

        if (
            this.props.alternatives &&
            this.props.alternatives != "loading" &&
            this.props.alternatives != ""
        ) {
            var alternatives_a = <React.Fragment></React.Fragment>;
            var alternatives_b = <React.Fragment></React.Fragment>;
            var alternatives_c = <React.Fragment></React.Fragment>;
            var alternatives_d = <React.Fragment></React.Fragment>;

            this.props.alternatives.a.sort(function (a, b) {
                return b.eco_score - a.eco_score;
            });

            this.props.alternatives.b.sort(function (a, b) {
                return b.eco_score - a.eco_score;
            });
            this.props.alternatives.c.sort(function (a, b) {
                return b.eco_score - a.eco_score;
            });
            this.props.alternatives.d.sort(function (a, b) {
                return b.eco_score - a.eco_score;
            });

            switch (this.props.ecoScore) {
                case "a":
                    break;
                case "b":
                    alternatives_a = this.renderListAlternatives(this.props.alternatives.a);
                    break;
                case "c":
                    alternatives_a = this.renderListAlternatives(this.props.alternatives.a);
                    alternatives_b = this.renderListAlternatives(this.props.alternatives.b);
                    break;
                case "d":
                    alternatives_a = this.renderListAlternatives(this.props.alternatives.a);
                    alternatives_b = this.renderListAlternatives(this.props.alternatives.b);
                    alternatives_c = this.renderListAlternatives(this.props.alternatives.c);
                    break;
                case "e":
                    alternatives_a = this.renderListAlternatives(this.props.alternatives.a);
                    alternatives_b = this.renderListAlternatives(this.props.alternatives.b);
                    alternatives_c = this.renderListAlternatives(this.props.alternatives.c);
                    alternatives_d = this.renderListAlternatives(this.props.alternatives.d);
                    break;
                default:
            }

            alternativesList = (
                <React.Fragment>
                    {alternatives_a} {alternatives_b} {alternatives_c} {alternatives_d}
                </React.Fragment>
            );
        }

        return alternativesList;
    };

    render = () => {
        var alternatives_title = "";

        if (this.props.alternatives === "") {
            alternatives_title = "Pas d'alternatives disponible";
        } else {
            if (this.props.alternatives === "loading") {
                alternatives_title = "Chargement des alternatives ...";
            } else {
                alternatives_title = "Alternatives";
            }
        }
        return (
            <React.Fragment>
                <span className="title-part-environnement">{alternatives_title}</span>
                {this.props.alternatives &&
                this.props.alternatives != "loading" &&
                this.props.alternatives != "" ? (
                    <Swiper
                        spaceBetween={0}
                        observer={true}
                        observeParents={true}
                        slidesPerView={1}
                        // centeredSlides={true}
                        onSwiper={(swiper) => this.setState({ swiper: swiper })}
                    >
                        {this.alternativesloop()}
                    </Swiper>
                ) : (
                    <React.Fragment />
                )}
            </React.Fragment>
        );
    };
}

export default Alternatives;

function RenderColor({ item }) {
    var labelColor;
    var labelLevel;
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
