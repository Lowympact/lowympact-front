import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";

//Import Bar Chart
import Chart from "react-apexcharts";

import fruits from "../../assets/images/fruits-vegetables-basket-by-oblik-studio.svg";
import { motion } from "framer-motion";

const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

class BarChartCarbonImpact extends React.Component {
    state = {
        selectedSegment: 0,
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 2,
                    opacity: 0.5,
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    horizontal: true,
                },
            },
            xaxis: {
                categories: ["Janvier", "Février", "Mars", "Avril", "Mai"],
                labels: {
                    style: {
                        fontSize: "12px",
                        fontFamily: "Comfortaa",
                        fontColor: "#1b3044",
                    },
                },
                title: {
                    text: "CO₂ équivalent (kg)",
                    style: {
                        fontSize: "12px",
                        fontFamily: "Comfortaa",
                        fontColor: "#1b3044",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: "12px",
                        fontFamily: "Comfortaa",
                        fontColor: "#1b3044",
                    },
                },
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: "10px",
                    fontFamily: "Comfortaa",
                },
            },
            noData: {
                text: "Chargement...",
            },
            fill: {
                colors: ["#ff914d"],
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
        },
    };

    displayChart = () => {
        let chart = <React.Fragment></React.Fragment>;
        if (this.props.carbonImpactData && this.props.cartedProduct > 0) {
            let dataSize = this.props.carbonImpactData.data.length;
            let xaxis = [];
            let now;

            switch (this.props.carbonImpactData.unit) {
                case "weekly":
                    let d = new Date();
                    d.setHours(0, 0, 0, 0);
                    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
                    let yearStart = new Date(d.getFullYear(), 0, 1);
                    now = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
                    for (let i = dataSize - 1; i >= 0; i--) {
                        xaxis.push("Semaine " + (now - i));
                    }
                    break;
                case "monthly":
                    now = new Date().getMonth();
                    let year = new Date().getFullYear();
                    for (let i = dataSize - 1; i >= 0; i--) {
                        let monthNum = now - i;
                        if (monthNum < 0) {
                            xaxis.push(monthNames[monthNum + 12] + " " + (year - 1));
                        } else {
                            xaxis.push(monthNames[monthNum] + " " + year);
                        }
                    }
                    break;
                case "yearly":
                    now = new Date().getFullYear();
                    for (let i = dataSize - 1; i >= 0; i--) {
                        xaxis.push((now - i).toString());
                    }
                    break;
                default:
                    now = new Date().getFullYear();
                    for (let i = dataSize - 1; i >= 0; i--) {
                        xaxis.push((now - i).toString());
                    }
                    break;
            }
            let options = this.state.options;
            if (options.xaxis) options.xaxis.categories = xaxis;
            this.setState({ options: options });

            let series = [
                {
                    name: "CO₂ équivalent (kg)",
                    data: [],
                },
            ];

            let sortedData = this.props.carbonImpactData.data;
            console.log(sortedData);
            sortedData.sort((a, b) => (a.offset > b.offset ? 1 : -1));
            console.log(sortedData);

            for (let i = 0; i < sortedData.length; i++) {
                let finalValue =
                    this.state.selectedSegment === 0
                        ? sortedData[i].impact.toFixed(2)
                        : (sortedData[i].impact / sortedData[i].nbProducts).toFixed(2);
                series[0].data.push(finalValue);
            }

            chart = (
                <React.Fragment>
                    <div className="stats-chart-bar">
                        <Chart
                            options={this.state.options}
                            series={series}
                            type="bar"
                            height={350}
                        ></Chart>
                    </div>
                </React.Fragment>
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
        this.setState({ selectedSegment: this.state.selectedSegment === 0 ? 1 : 0 });
    };

    displaySlides = () => {
        let slides = <React.Fragment></React.Fragment>;
        if (this.props.carbonImpactData && this.props.cartedProduct > 0) {
            slides = (
                <React.Fragment>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <span className="stats-slider-text">{">"} Impact Carbone total</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="stats-slider">
                            <span className="stats-slider-text">
                                {">"} Impact Carbone par produit
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
                {this.displayChart()}
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

export default BarChartCarbonImpact;
