import React from "react";
import Alternatives from "./Alternatives";
import Origins from "./Origins";
import "./Environnement.css";
import EmpreinteCarbone from "./EmpreinteCarbone";

class Environnement extends React.Component {
    state = {
        width: undefined,
        materials: [],
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
            return "Impact faible";
        }
        if (note < -2) {
            return "Impact fort";
        }
        return "Impact moyen";
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

    displayPackagingDetailImpact = () => {
        let res = <React.Fragment></React.Fragment>;

        if (this.props.dataEcoScore?.adjustments?.packaging?.packagings) {
            var materials = [];
            let slides = <React.Fragment></React.Fragment>;

            this.props.dataEcoScore?.adjustments?.packaging?.packagings.map((data) => {
                if (data?.material.split(":")[1] !== "unknown") {
                    materials.push(data?.material.split(":")[1]);
                }
                return true;
            });

            slides = materials
                .filter(function (item, pos) {
                    return materials.indexOf(item) === pos;
                })
                .map((data) => {
                    var separator = "";
                    if (materials.indexOf(data) < materials.length - 1) {
                        separator = " ; ";
                    }
                    return (
                        <React.Fragment key={data}>
                            <span>
                                {data} {separator}
                            </span>
                        </React.Fragment>
                    );
                });

            if (materials.length > 0) {
                res = (
                    <React.Fragment>
                        <div className="product-co2-impact-content">
                            <div className="product-packaging-impact-content-details-text">
                                Matériaux utilisés : &nbsp;{slides}
                            </div>
                        </div>
                    </React.Fragment>
                );
            } else {
                res = (
                    <React.Fragment>
                        <div className="product-co2-impact-content">
                            <div className="product-packaging-impact-content-details-text">
                                Matériaux utilisés : &nbsp; Inconnu
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
        }

        return res;
    };

    displayPackagingImpact = () => {
        let res = <React.Fragment></React.Fragment>;

        if (this.props.dataEcoScore?.adjustments?.packaging?.value) {
            return (
                <div className="product-co2-impact-container">
                    <div className="product-co2-impact-header">
                        <div className="product-co2-impact-logo">
                            <div className="material-icons icon-label-co2-impact">view_in_ar</div>
                        </div>
                        <div className="product-co2-impact-title">
                            <div className="product-co2-impact-title-text">
                                Impact de l'emballage
                            </div>
                            <div className="product-co2-impact-title-label">
                                {this.getLabelImpactPackaging(
                                    this.props.dataEcoScore?.adjustments?.packaging?.value
                                )}
                            </div>
                        </div>
                        <div
                            className="product-transport-impact-color-label"
                            style={{
                                color: this.getColorImpactPackaging(
                                    this.props.dataEcoScore?.adjustments?.packaging?.value
                                ),
                            }}
                        >
                            ●
                        </div>
                    </div>
                    {this.displayPackagingDetailImpact()}
                </div>
            );
        } else {
            return res;
        }
    };

    render = () => {
        if (this.props.barcode) {
            return (
                <React.Fragment>
                    <EmpreinteCarbone dataEcoScore={this.props.dataEcoScore} />

                    {this.props.origins ? (
                        <Origins origins={this.props.origins} />
                    ) : (
                        <React.Fragment />
                    )}
                    {/* {this.displayPackagingImpact()} */}

                    <Alternatives
                        barcode={this.props.barcode}
                        ecoScore={this.props.ecoScore}
                        ciqual_code={this.props.dataEcoScore?.agribalyse?.code}
                    />
                </React.Fragment>
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    };
}

export default Environnement;
