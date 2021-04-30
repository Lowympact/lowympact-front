import React from "react";
import {
	Map,
	TileLayer,
	Marker,
	Popup,
	Polyline,
	GeoJSON,
} from "react-leaflet";
import "./Traceability.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Curve } from "./leaflet-curve";
// Import Swiper styles
import "swiper/swiper-bundle.css";

class Traceability extends React.Component {
	state = {
		zoom: 12,
		swiper: undefined,
	};

	handleMapZoom = () => {
		this.setState({ zoom: this.map && this.map.leafletElement.getZoom() });
	};

	displaySlides = () => {
		let slides = <React.Fragment />;
		if (this.props.products) {
			slides = this.props.products.map((product) => {
				console.log(product);
				return (
					<SwiperSlide>
						<div className="product-slide-container">
							<div className="product-slide-icon">
								<span class="material-icons">
									nature_people
								</span>
							</div>
							<div className="product-slide-wrapper">
								<div className="product-slide-name">
									Transport en {product.transport}
								</div>
								<div className="product-slide-lowername">
									De {product.seller?.name}
								</div>
								<div className="product-slide-lowername">
									À {product.buyer?.name}
								</div>
							</div>
						</div>
					</SwiperSlide>
				);
			});
		}
		return slides;
	};

	getCurveOptions = (lat1, long1, lat2, long2) => {
		var latlng1 = [lat1, long1],
			latlng2 = [lat2, long2];

		var offsetX = latlng2[1] - latlng1[1],
			offsetY = latlng2[0] - latlng1[0];

		var r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
			theta = Math.atan2(offsetY, offsetX);

		var thetaOffset = 3.14 / 10;

		var r2 = r / 2 / Math.cos(thetaOffset),
			theta2 = theta + thetaOffset;

		var midpointX = r2 * Math.cos(theta2) + latlng1[1],
			midpointY = r2 * Math.sin(theta2) + latlng1[0];

		var midpointLatLng = [midpointY, midpointX];

		return ["M", latlng1, "Q", midpointLatLng, latlng2];
	};

	displayMarker = () => {
		let markers = <React.Fragment />;
		if (this.props.products) {
			markers = this.props.products.map((product) => {
				let marker1 = <React.Fragment />;
				let lat1 = parseFloat(product?.buyer?.localisation?.latitude);
				let long1 = parseFloat(product?.buyer?.localisation?.longitude);
				let marker2 = <React.Fragment />;
				let lat2 = parseFloat(product?.seller?.localisation?.latitude);
				let long2 = parseFloat(
					product?.seller?.localisation?.longitude
				);
				if (lat1 && long1) {
					marker1 = (
						<Marker position={[lat1, long1]}>
							<Popup>{product.buyer.name}</Popup>
						</Marker>
					);
				}
				if (lat2 && long2) {
					marker2 = (
						<Marker position={[lat2, long2]}>
							<Popup>{product.seller.name}</Popup>
						</Marker>
					);
				}

				let animate = {
					duration: 1000,
					iterations: Infinity,
					easing: "ease-in-out",
					direction: "alternate",
				};

				return (
					<React.Fragment>
						<Curve
							positions={this.getCurveOptions(
								lat2,
								long2,
								lat1,
								long1
							)}
							option={{
								color: "#1b3044",
								fill: false,
								// animate: animate,
							}}
						/>
						{marker1}
						{marker2}
					</React.Fragment>
				);
			});
		}
		return markers;
	};

	render = () => {
		return (
			<div>
				<Map
					center={[51.505, -0.09]}
					zoom={1}
					minZoom={1}
					scrollWheelZoom={true}
					whenReady={(r) => console.log(r)}
					maxBounds={[
						[-90, -180],
						[90, 180],
					]}
					maxBoundsViscosity={1}
					ref={(ref) => {
						this.map = ref;
					}}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
						url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png" //'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png' //'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>

					{this.displayMarker()}
				</Map>
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					// onSlideChange={() => console.log("slide change")}
					onSwiper={(swiper) => this.setState({ swiper: swiper })}
				>
					{this.displaySlides()}
				</Swiper>
			</div>
		);
	};
}

export default Traceability;
