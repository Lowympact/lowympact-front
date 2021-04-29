import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./Traceability.css";

class Traceability extends React.Component {
	state = {
		zoom: 12,
	};

	handleMapZoom = () => {
		this.setState({ zoom: this.map && this.map.leafletElement.getZoom() });
	};

	render = () => {
		return (
			<div>
				<Map center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
						url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png" //'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png' //'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>
					<Marker position={[51.505, -0.09]}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</Map>
			</div>
		);
	};
}

export default Traceability;
