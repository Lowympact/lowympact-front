import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import "./Traceability.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Curve } from "./leaflet-curve";
import L from "leaflet";
// Import Swiper styles
import "swiper/swiper-bundle.css";

class Traceability extends React.Component {
	map = undefined;
	state = {
		zoom: 12,
		swiper: undefined,
		currentIndex: 0,
		map: undefined,
	};

	getMaterialIcon = (mode) => {
		switch (mode) {
			case "Charette":
				return "directions_bike";
			case "Plane":
				return "flight_takeoff";
			case "Train":
				return "train";
			case "Boat":
				return "directions_boat_filled";
			case "Truck":
				return "local_shipping";
			default:
				return "nature_people";
		}
	};

	getTransportMode = (mode) => {
		switch (mode) {
			case "Charette":
				return "vélo";
			case "Plane":
				return "avion";
			case "Train":
				return "train";
			case "Boat":
				return "bateau";
			case "Truck":
				return "camion";
			default:
				return mode;
		}
	};
	getTranslation = (mode) => {
		switch (mode) {
			case "maker":
				return "Fabricant";
			case "productor":
				return "Producteur";
			case "shop":
				return "Revendeur";
			default:
				return mode;
		}
	};

	displaySlides = () => {
		let slides = <React.Fragment />;
		if (this.props.products) {
			slides = this.props.products.map((product) => {
				let pastille = "product-slide-pastille past-green";
				if (product.TransportCO2Impact?.value > 10) {
					pastille = "product-slide-pastille past-orange";
				}
				if (product.TransportCO2Impact?.value > 100) {
					pastille = "product-slide-pastille past-red";
				}

				return (
					<SwiperSlide>
						<div className="product-slide-container">
							<div className="product-slide-icon">
								<span class="material-icons">
									{this.getMaterialIcon(product.transport)}
								</span>

								<div className="product-slide-name">
									<span className="product-slide-name-product">
										{product.productsOutput[0].productName}
									</span>
									<span className="product-slide-name-transport">
										Transport en{" "}
										{this.getTransportMode(
											product.transport
										)}
									</span>
								</div>
							</div>
							<div className="product-slide-origin-wrapper">
								<div className="product-transport-ui">
									<div className="transport-ui-circle"></div>
									<div className="transport-ui-tiret"></div>
									<div className="transport-ui-circle circle-bis"></div>
								</div>
								<div className="product-slide-transport-container">
									<div className="product-slide-bigname">
										<span>
											{product.seller.localisation.city},{" "}
											{
												product.seller.localisation
													.country
											}
										</span>
									</div>
									<div className="product-slide-lowername2">
										{this.getTranslation(
											product.seller?.type
										)}
										{": "}
										{product.seller?.name}
									</div>

									<div className="product-slide-bigname bigname-lower">
										<span>
											{product.buyer.localisation.city},{" "}
											{product.buyer.localisation.country}
										</span>
									</div>
									<div className="product-slide-lowername2">
										{this.getTranslation(
											product.buyer?.type
										)}
										{": "}
										{product.buyer?.name}
									</div>
								</div>
							</div>
							<div className="product-slide-arrow">{">"}</div>
							<div className="product-slide-consumption">
								<div className={pastille}></div>
								<div>{Math.round(product.dist.value)} km </div>
								<div>
									{product.TransportCO2Impact?.value > 1
										? Math.round(
												product.TransportCO2Impact
													?.value
										  )
										: "< 1"}{" "}
									kg CO2{" "}
								</div>
							</div>
						</div>
					</SwiperSlide>
				);
			});
		}
		return slides;
	};

	handleMarkerClick = (latlng, index) => {
		// window.scrollTo({ top: "8000px", behavior: "smooth" });
		let elem = document.getElementsByClassName("swiper-container");
		if (elem[0]) {
			elem[0].scrollIntoView({ behavior: "smooth" });
		}
		console.log(index);
		if (index >= this.props.products?.length) {
			this.state.swiper.slideTo(index - 1, 500);
		} else {
			this.state.swiper.slideTo(index, 500);
		}
		let zoom = 5;
		if (this.props.products && this.props.products[index]) {
			let p = this.props.products[index];
			console.log(
				[p.buyer.localisation.latitude, p.buyer.localisation.longitude],
				[
					p.seller.localisation.latitude,
					p.seller.localisation.longitude,
				]
			);
			zoom = getZoomRatio(
				[p.buyer.localisation.latitude, p.buyer.localisation.longitude],
				[
					p.seller.localisation.latitude,
					p.seller.localisation.longitude,
				]
			);
		}
		console.log(zoom);
		this.map.leafletElement.flyTo(latlng, zoom, { duration: 0.5 });
	};

	onSlideChange = (index) => {
		this.setState({ currentIndex: index });
		let zoom = 5;
		if (this.props.products && this.props.products[index]) {
			let p = this.props.products[index];

			zoom = getZoomRatio(
				[p.buyer.localisation.latitude, p.buyer.localisation.longitude],
				[
					p.seller.localisation.latitude,
					p.seller.localisation.longitude,
				]
			);

			let lat =
				(parseFloat(p.seller.localisation.latitude) +
					parseFloat(p.buyer.localisation.latitude)) /
				2;
			let long =
				(parseFloat(p.seller.localisation.longitude) +
					parseFloat(p.buyer.localisation.longitude)) /
				2;
			console.log(zoom);
			this.map.leafletElement.flyTo([lat, long], zoom, { duration: 0.5 });
		}
	};

	displayMarker = () => {
		let markers = <React.Fragment />;
		if (this.props.products) {
			markers = this.props.products.map((product, i) => {
				let marker1 = <React.Fragment />;
				let lat1 = parseFloat(product?.buyer?.localisation?.latitude);
				let long1 = parseFloat(product?.buyer?.localisation?.longitude);
				let marker2 = <React.Fragment />;
				let lat2 = parseFloat(product?.seller?.localisation?.latitude);
				let long2 = parseFloat(
					product?.seller?.localisation?.longitude
				);
				let icon;
				let icon2;
				let zIndex = 0;
				if (i === this.state.currentIndex) {
					icon = new L.Icon({
						iconUrl: "/images/utils/map.png", //require('../../images/logo/logo.svg'),
						iconRetinaUrl: "/images/utils/map.png", //"/images/images_volume/1-l.png", //require('../../images/logo/logo.svg'),
						iconSize: new L.Point(32, 32),
						className: "leaflet-mark-icon",
					});
					icon2 = new L.Icon({
						iconUrl: "/images/utils/map.png", //require('../../images/logo/logo.svg'),
						iconRetinaUrl: "/images/utils/map3.png", //"/images/images_volume/1-l.png", //require('../../images/logo/logo.svg'),
						iconSize: new L.Point(32, 32),
						className: "leaflet-mark-icon",
					});
					zIndex = 5;
				} else {
					icon = new L.Icon({
						iconUrl: "/images/utils/map2.png", //require('../../images/logo/logo.svg'),
						iconRetinaUrl: "/images/utils/map2.png", //"/images/images_volume/1-l.png", //require('../../images/logo/logo.svg'),
						iconSize: new L.Point(25, 25),
						className: "leaflet-mark-icon",
					});
					icon2 = new L.Icon({
						iconUrl: "/images/utils/map2.png", //require('../../images/logo/logo.svg'),
						iconRetinaUrl: "/images/utils/map2.png", //"/images/images_volume/1-l.png", //require('../../images/logo/logo.svg'),
						iconSize: new L.Point(25, 25),
						className: "leaflet-mark-icon",
					});
				}

				if (lat1 && long1) {
					marker1 = (
						<Marker
							zIndexOffset={zIndex}
							icon={icon}
							position={[lat1, long1]}
							onClick={() =>
								this.handleMarkerClick(
									[
										parseFloat(
											product.buyer.localisation.latitude
										),
										parseFloat(
											product.buyer.localisation.longitude
										),
									],
									i + 1
								)
							}
						>
							{/* <Popup>{product.buyer.name}</Popup> */}
						</Marker>
					);
				}
				if (lat2 && long2) {
					marker2 = (
						<Marker
							zIndexOffset={zIndex}
							icon={icon2}
							position={[lat2, long2]}
							onClick={() =>
								this.handleMarkerClick(
									[
										parseFloat(
											product.seller.localisation.latitude
										),
										parseFloat(
											product.seller.localisation
												.longitude
										),
									],
									i
								)
							}
						>
							{/* <Popup>{product.seller.name}</Popup> */}
						</Marker>
					);
				}

				let color = "#1b3044";
				let curves = document.getElementsByClassName(
					"leaflet-interactive"
				);

				if (curves && curves[i] && i === this.state.currentIndex) {
					curves[i].setAttribute("stroke", "#78be95");
				} else if (curves && curves[i]) {
					curves[i].setAttribute("stroke", "#1b3044");
				}

				return (
					<React.Fragment>
						<div className="test">
							<Curve
								positions={getCurveOptions(
									lat2,
									long2,
									lat1,
									long1
								)}
								option={{
									color: color,
									fill: false,
									// animate: animate,
									delay: 5000,
								}}
							/>
						</div>
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
					maxBounds={[
						[-90, -180],
						[90, 180],
					]}
					maxBoundsViscosity={1}
					ref={(ref) => {
						this.map = ref;
						this.props.getBottomRef(ref);
					}}
					whenCreated={(map) => this.setState({ map })}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
						url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png" //'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png' //'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>

					{this.displayMarker()}
				</Map>
				<Swiper
					spaceBetween={10}
					slidesPerView={1.2}
					centeredSlides={true}
					onSlideChange={(i) => this.onSlideChange(i.activeIndex)}
					onSwiper={(swiper) => this.setState({ swiper: swiper })}
				>
					{this.displaySlides()}
				</Swiper>
			</div>
		);
	};
}

export default Traceability;

function getDistance(origin, destination) {
	// return distance in meters
	var lon1 = toRadian(origin[1]),
		lat1 = toRadian(origin[0]),
		lon2 = toRadian(destination[1]),
		lat2 = toRadian(destination[0]);

	var deltaLat = lat2 - lat1;
	var deltaLon = lon2 - lon1;

	var a =
		Math.pow(Math.sin(deltaLat / 2), 2) +
		Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
	var c = 2 * Math.asin(Math.sqrt(a));
	var EARTH_RADIUS = 6371;
	return c; //* EARTH_RADIUS * 1000;
}

function toRadian(degree) {
	return (degree * Math.PI) / 180;
}

function getZoomRatio(origin, destination) {
	var distance = getDistance(origin, destination);
	console.log(distance);
	return 9 - Math.sqrt(distance * 150);
}

function getCurveOptions(lat1, long1, lat2, long2) {
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
}

function getChildElementIndex(node) {
	return Array.prototype.indexOf.call(node.parentNode.children, node);
}
