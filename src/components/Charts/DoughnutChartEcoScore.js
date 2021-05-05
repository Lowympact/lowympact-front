import React from "react";
import "./DoughnutChartEcoScore.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";

//Import Pie Chart
import { PieChart } from "react-minimal-pie-chart";

import fruits from "../../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import { motion } from "framer-motion";

class DoughnutChartEcoScore extends React.Component {
    state = {
        swiper: undefined,
        selectedSegment: undefined,
    };

    displayChart = () => {
        let chart = <React.Fragment></React.Fragment>;
        if (this.props.ecoScoreData && this.props.cartedProduct > 0) {
            let data = [
                {
                    title: "EcoScore A",
                    value: this.props.ecoScoreData.a,
                    color: "#1e8f4f",
                },
                {
                    title: "EcoScore B",
                    value: this.props.ecoScoreData.b,
                    color: "#5fad0c",
                },
                {
                    title: "EcoScore C",
                    value: this.props.ecoScoreData.c,
                    color: "#ecb10f",
                },
                {
                    title: "EcoScore D",
                    value: this.props.ecoScoreData.d,
                    color: "#ff6f1e",
                },
                {
                    title: "EcoScore E",
                    value: this.props.ecoScoreData.e,
                    color: "#df1e1f",
                },
                {
                    title: "EcoScore Inconnu",
                    value: this.props.ecoScoreData.unknown,
                    color: "#000000",
                },
            ];
            chart = (
                <PieChart
                    data={data}
                    lineWidth={30}
                    paddingAngle={1}
                    radius={PieChart.defaultProps.radius - 3}
                    animate
                    animationDuration={700}
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                    labelStyle={(index) =>
                        index === this.state.selectedSegment
                            ? {
                                  fontSize: "6px",
                                  fontFamily: "comfortaa",
                                  fill: data[index].color,
                              }
                            : {
                                  fontSize: "0px",
                                  fontFamily: "comfortaa",
                                  fill: data[index].color,
                              }
                    }
                    labelPosition={60}
                    segmentsStyle={{
                        transition: "stroke .3s ease-out",
                        cursor: "pointer",
                    }}
                    segmentsShift={(index) => (index === this.state.selectedSegment ? 3 : 0)}
                    onClick={(event, index) => {
                        if (index === this.state.selectedSegment) {
                            this.setState({ selectedSegment: undefined });
                            this.state.swiper.slideTo(0, 500);
                        } else {
                            this.setState({ selectedSegment: index });
                            this.state.swiper.slideTo(index + 1, 500);
                        }
                    }}
                />
            );
        } else {
            chart = (
                <motion.div
                    className="stats-no-product"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div>
                        <img src={fruits} className="logo" alt="Fruits" />
                        <p className="logo-text">Commence à scanner des produits !</p>
                    </div>
                </motion.div>
            );
        }
        return chart;
    };

    onSlideChange = (index) => {
        if (index === 0) {
            this.setState({ selectedSegment: undefined });
        } else {
            this.setState({ selectedSegment: index - 1 });
        }
    };

    displaySlides = () => {
        let slides = <React.Fragment></React.Fragment>;
        if (this.props.ecoScoreData && this.props.cartedProduct > 0) {
            slides = (
                <React.Fragment>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <img
                                className="stats-ecoscore-full"
                                src="/images/utils/ecoScoreFull.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <span className="stats-slider-text">
                                {">"} EcoScore A : {this.props.ecoScoreData.a}{" "}
                                {this.props.ecoScoreData.a > 1 ? " produits" : " produit"}
                            </span>
                            <img
                                className="stats-ecoscore-image"
                                src="/images/utils/ecoScoreA.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <span className="stats-slider-text">
                                {">"} EcoScore B : {this.props.ecoScoreData.b}{" "}
                                {this.props.ecoScoreData.b > 1 ? " produits" : " produit"}
                            </span>
                            <img
                                className="stats-ecoscore-image"
                                src="/images/utils/ecoScoreB.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <span className="stats-slider-text">
                                {">"} EcoScore C : {this.props.ecoScoreData.c}{" "}
                                {this.props.ecoScoreData.c > 1 ? " produits" : " produit"}
                            </span>
                            <img
                                className="stats-ecoscore-image"
                                src="/images/utils/ecoScoreC.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <span className="stats-slider-text">
                                {">"} EcoScore D : {this.props.ecoScoreData.d}{" "}
                                {this.props.ecoScoreData.d > 1 ? " produits" : " produit"}
                            </span>
                            <img
                                className="stats-ecoscore-image"
                                src="/images/utils/ecoScoreD.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <span className="stats-slider-text">
                                {">"} EcoScore E : {this.props.ecoScoreData.e}{" "}
                                {this.props.ecoScoreData.e > 1 ? " produits" : " produit"}
                            </span>
                            <img
                                className="stats-ecoscore-image"
                                src="/images/utils/ecoScoreE.png"
                                alt=""
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <span className="stats-slider-text">
                                {">"} EcoScore Inconnu : {this.props.ecoScoreData.unknown}{" "}
                                {this.props.ecoScoreData.unknown > 1 ? " produits" : " produit"}
                            </span>
                        </div>
                    </SwiperSlide>
                </React.Fragment>
            );
        }
        return slides;
    };

    render = () => {
        return (
            <React.Fragment>
                <div className="stats-chart-pie">{this.displayChart()}</div>
                <div className="stats-chart-slider">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        centeredSlides={true}
                        onSlideChange={(i) => this.onSlideChange(i.activeIndex)}
                        onSwiper={(swiper) => this.setState({ swiper: swiper })}
                    >
                        {this.displaySlides()}
                    </Swiper>
                </div>
            </React.Fragment>
        );
    };
}

export default DoughnutChartEcoScore;
