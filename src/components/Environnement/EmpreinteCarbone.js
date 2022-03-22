import React from "react";

class EmpreinteCarbone extends React.Component {
    state = {
        alea: 3,
    };

    setAlea = (nb) => {
        // this.setState({ alea: Math.floor(Math.random() * 11) });
        let alea = this.state.alea + nb;
        if (alea > 11) alea = 0;
        if (alea < 0) alea = 11;
        this.setState({ alea: alea });
    };

    render = () => {
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
                        (parseFloat(this.props.dataEcoScore?.agribalyse?.co2_transportation) *
                            100) /
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
                    <div className="empreinte-single" key={i.name}>
                        <div className="material-icons">{i.image}</div>
                        <div className="name">{i.name} : </div>
                        <div className="pourcent">{i.percent} %</div>
                    </div>
                );
            });

            let equivalent = getEquivalent(
                parseFloat(9.9),
                this.state.alea
            );

            let circle = "cmauve";
            if (this.props.dataEcoScore?.agribalyse?.co2_total < 15) circle = "cred";
            if (this.props.dataEcoScore?.agribalyse?.co2_total < 7) circle = "corange";
            if (this.props.dataEcoScore?.agribalyse?.co2_total < 3) circle = "cgreen";
            if (this.props.dataEcoScore?.agribalyse?.co2_total < 1) circle = "cdarkgreen";
            return (
                <React.Fragment>
                    <div className="empreinte-carbone-container">
                        <div className="empreinte-carbone-header">
                            <div className="header-text">
                                <div className="header-main">Empreinte Carbone</div>
                            </div>
                            <div className="empreinte-carbone-number">
                                <span>
                                    {parseFloat(
                                        9.9
                                    ).toFixed(2)}
                                    kg CO2e
                                </span>
                                <div className={"circle " + circle}></div>
                            </div>
                        </div>
                        <div className="empreinte-carbone-equivalent">
                            <div className="icon-container">
                                <div className="material-icons">
                                    <img
                                        src={`/images/alternatives/${equivalent[1]}`}
                                        alt="alternative"
                                    />
                                </div>
                            </div>
                            <div className="equivalent-container">
                                <div className="text-small">Soit l'équivalent...</div>
                                <div className="text-big">{equivalent[0]}</div>
                            </div>
                        </div>
                        <div className="arrow">
                            <div className="material-icons" onClick={() => this.setAlea(1)}>
                                arrow_back_ios
                            </div>
                            <div className="material-icons" onClick={() => this.setAlea(-1)}>
                                arrow_forward_ios
                            </div>
                        </div>
                    </div>
                    { this.props.dataEcoScore ?
                        <div className="empreinte-carbone-container no-margin-container">
                        <div className="empreinte-carbone-header">
                            <div className="header-text">
                                <div className="header-main">
                                    Répartition de l'empreinte Carbone
                                </div>
                                <div className="header-small">
                                    selon les différentes étapes du cycle de vie
                                </div>
                            </div>
                            {/* <div className="empreinte-carbone-number">
                                <span>
                                    {parseFloat(
                                        this.props.dataEcoScore?.agribalyse?.co2_total
                                    ).toFixed(2)}
                                    kg CO2e
                                </span>
                                <div className="circle"></div>
                            </div> */}
                        </div>
                        <div className="empreinte-carbone-repartition">{repartition}</div>
                        </div>
                    : null }
                </React.Fragment>
            );
    };
}

export default EmpreinteCarbone;

function getEquivalent(co2, alea) {
    switch (alea) {
        case 0:
            return [
                "De la production de " +
                    (co2 / 0.0046).toFixed(0) +
                    " feuilles de papier blanc 80g",
                "paper.png",
            ];
        case 1:
            return [
                "De la production de " +
                    (co2 / 0.6).toFixed(1) +
                    " kg de pommes de terre en France",
                "potatoe.png",
            ];
        case 2:
            return [
                "De la production de " + (co2 / 0.53).toFixed(1) + " kg de fraises en France",
                "strawberry.png",
            ];
        case 3:
            return [
                "De " + (co2 / 0.193).toFixed(1) + " km parcourus par une personne en voiture",
                "car.svg",
            ];
        case 4:
            return [
                "De " + (co2 / 0.137).toFixed(1) + " km parcourus par une personne en Bus de ville",
                "bus.svg",
            ];
        case 5:
            return [
                "De " +
                    (co2 / 0.019).toFixed(0) +
                    " e-mails envoyés contenant une pièce jointe d'1mo",
                "mail.svg",
            ];
        case 6:
            return [
                "De " +
                    (co2 / 0.5).toFixed(1) +
                    " jour(s) d'éclairage d'une ampoule à incandescence",
                "light.svg",
            ];
        case 7:
            return [
                "De " +
                    (co2 / 0.24).toFixed(1) +
                    " heures de chauffage au gaz d'un appartement moyen de 70m²",
                "appartment.svg",
            ];
        case 8:
            return [
                "De la production de " +
                    ((co2 * 1000) / 33.8).toFixed(0) +
                    " grammes de steak haché de boeuf cru",
                "steak.png",
            ];
        case 9:
            return [
                "De " +
                    (co2 / 0.083).toFixed(1) +
                    " jours d'éclairage d'une ampoule basse consommation",
                "light.svg",
            ];
        case 10:
            return [
                "De " +
                    (co2 / 0.105).toFixed(1) +
                    " kilomètres parcourus en Trotinette électrique (en France)",
                "trotinette.png",
            ];
        case 11:
            return [
                "D'une personne parcourant " +
                    (co2 / 0.3).toFixed(0) * 100 +
                    " kilomètres en TGV (en France)",
                "train.png",
            ];
        default:
            return [
                "De " +
                    (co2 / 0.105).toFixed(1) +
                    " kilomètres parcourus en Trotinette électrique (en France)",
                "trotinette.png",
            ];
    }
}
