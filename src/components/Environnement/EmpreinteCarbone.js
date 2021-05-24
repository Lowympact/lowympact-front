import React from "react";
import trainImage from "../../assets/images/train.png";

class EmpreinteCarbone extends React.Component {
    state = {
        visible: false,
    };

    setVisible = () => {
        this.setState({ visible: !this.state.visible });
    };

    render = () => {
        console.log(this.props.dataEcoScore);
        let repartition = [
            {
                image: "agriculture",
                name: "Agriculture",
                percent: (
                    (parseFloat(this.props.dataEcoScore?.agribalyse?.co2_agriculture) * 100) /
                    parseFloat(this.props.dataEcoScore?.agribalyse?.co2_total)
                ).toFixed(0),
            },
            {
                image: "local_shipping",
                name: "Transport",
                percent: (
                    (parseFloat(this.props.dataEcoScore?.agribalyse?.co2_transportation) * 100) /
                    parseFloat(this.props.dataEcoScore?.agribalyse?.co2_total)
                ).toFixed(0),
            },
            {
                image: "view_in_ar",
                name: "Emballage",
                percent: (
                    (parseFloat(this.props.dataEcoScore?.agribalyse?.co2_packaging) * 100) /
                    parseFloat(this.props.dataEcoScore?.agribalyse?.co2_total)
                ).toFixed(0),
            },
            {
                image: "transform",
                name: "Transformation",
                percent: (
                    (parseFloat(this.props.dataEcoScore?.agribalyse?.co2_processing) * 100) /
                    parseFloat(this.props.dataEcoScore?.agribalyse?.co2_total)
                ).toFixed(0),
            },
            {
                image: "store",
                name: "Distribution",
                percent: (
                    (parseFloat(this.props.dataEcoScore?.agribalyse?.co2_distribution) * 100) /
                    parseFloat(this.props.dataEcoScore?.agribalyse?.co2_total)
                ).toFixed(0),
            },
            {
                image: "microwave",
                name: "Consommation",
                percent: (
                    (parseFloat(this.props.dataEcoScore?.agribalyse?.co2_consumption) * 100) /
                    parseFloat(this.props.dataEcoScore?.agribalyse?.co2_total)
                ).toFixed(0),
            },
        ];
        repartition = repartition.map((i) => {
            return (
                <div className="empreinte-single">
                    <div className="material-icons">{i.image}</div>
                    <div className="name">{i.name} : </div>
                    <div className="pourcent">{i.percent} %</div>
                </div>
            );
        });
        return (
            <React.Fragment>
                <div className="empreinte-carbone-container" onClick={this.setVisible}>
                    <div className="empreinte-carbone-header">
                        <div className="header-text">
                            <div className="header-main">Empreinte Carbone</div>
                            <div className="header-small">Estimée en kg de CO2 équivalent</div>
                        </div>
                        <div className="empreinte-carbone-number">
                            <span>
                                {parseFloat(this.props.dataEcoScore?.agribalyse?.co2_total).toFixed(
                                    2
                                )}
                                kg
                            </span>
                            <div className="circle"></div>
                        </div>
                    </div>
                    <div className="empreinte-carbone-equivalent">
                        <div className="icon-container">
                            <div className="material-icons">
                                <img src={trainImage} />
                            </div>
                        </div>
                        <div className="equivalent-container">
                            <div className="text-small">Soit l'équivalent...</div>
                            <div className="text-big">
                                {getEquivalent(
                                    parseFloat(this.props.dataEcoScore?.agribalyse?.co2_total)
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="empreinte-carbone-repartition">
                        <div
                            className={
                                this.state.visible ? " animation-appear" : "animation-disappear"
                            }
                        >
                            {repartition}
                        </div>
                    </div>
                    <div className="arrow">
                        <div className="material-icons">
                            {this.state.visible ? "arrow_drop_up" : "arrow_drop_down"}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };
}

export default EmpreinteCarbone;

function getEquivalent(co2) {
    if (co2 < 0.5) return "D'un aller Paris-Angers en TGV (300km)";
    if (co2 >= 0.5 && co2 < 1) return "D'un aller Paris-Lyon en TGV (420km)";
    if (co2 >= 1 && co2 < 1.5) return "D'un aller Lyon-Nantes en TGV (800km)";
    if (co2 >= 1.5 && co2 < 2) return "D'un aller Lille-Marseille en TGV (960km)";
    if (co2 >= 2 && co2 < 2.5) return "D'un aller Nantes-Nice en TGV (1350km)";
    if (co2 >= 2.5 && co2 < 3) return "D'un aller-retour Lyon-Nantes en TGV (1600km)";
    if (co2 >= 3 && co2 < 4) return "D'un aller-retour Paris-Nice en TGV (2000km)";
    if (co2 >= 4 && co2 < 5) return "De 3 allers Paris-Nice en TGV (3000km)";
    if (co2 >= 5 && co2 < 6) return "De 2 aller-retours Paris-Nice en TGV (4000km)";
    if (co2 >= 6 && co2 < 8) return "De 3 aller-retours Paris-Nice en TGV (6000km)";
    if (co2 >= 8 && co2 < 12) return "De 4 aller-retours Paris-Nice en TGV (8000km)";
    if (co2 >= 12) return "De plus de 5 aller-retours Paris-Nice en TGV (>10 000km)";
}
