import React from "react";
import { Map, TileLayer, Polygon } from "react-leaflet";

class Origins extends React.Component {
    state = {
        polygon: [],
        activeCountry: "",
    };

    componentDidMount = () => {
        this.getCountries();
    };

    setActiveCountry = (country) => {
        console.log(country);
        this.setState({ activeCountry: country });
    };

    getCountries = () => {
        this.props.origins?.map((origin) => {
            if (origin !== "en:ghana") {
                fetch(`https://api.lowympact.fr/api/v1/countries/${origin}`)
                    .then((res) => res.json())
                    .then((res) => {
                        let polygon = this.state.polygon;
                        console.log(res);
                        if (res.success && res.data?.country) {
                            polygon.push({
                                geo: res.data.country.coordinates,
                                name: res.data.country.name,
                            });
                            this.setState({
                                polygon: polygon,
                                activeCountry:
                                    this.state.activeCountry + res.data.country.name + ", ",
                            });
                        }
                    });
            }
            return true;
        });
    };

    render = () => {
        if (this.state.polygon.length === 0) return <React.Fragment />;
        else {
            return (
                <div className="environnement-map-container">
                    <div className="product-co2-impact-header">
                        <div className="product-co2-impact-logo">
                            <div className="material-icons icon-label-co2-impact">place</div>
                        </div>
                        <div className="product-co2-impact-title">
                            <div className="product-co2-impact-title-text">
                                Provenance des ingrédients
                            </div>
                            <div className="product-co2-impact-title-label">
                                Pays d'origine : {this.state.activeCountry}
                            </div>
                        </div>
                    </div>

                    <Map
                        center={[51.505, -0.09]}
                        zoom={-1}
                        minZoom={0}
                        className="environnement-map"
                        scrollWheelZoom={true}
                        dragging={false}
                        maxBounds={[
                            [-90, -180],
                            [90, 180],
                        ]}
                        maxBoundsViscosity={1}
                        whenCreated={(map) => this.setState({ map })}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png" //'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png' //'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        {this.state.polygon.map((poly, i) => {
                            if (poly)
                                return (
                                    <Polygon
                                        onClick={() => this.setActiveCountry(poly.name)}
                                        color={"color:white"}
                                        fillColor={
                                            this.activeCountry === poly.name ? "blue" : "green"
                                        }
                                        opacity={"1"}
                                        positions={poly.geo}
                                        key={i}
                                    />
                                );
                            else return <React.Fragment />;
                        })}
                    </Map>
                </div>
            );
        }
    };
}

export default Origins;
