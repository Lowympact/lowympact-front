import React from "react";
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "./Traceability.css";
import { Swiper, SwiperSlide } from "swiper/react";

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
				let line = (
					<Polyline
						positions={[
							[lat1, long1],
							[lat2, long2],
						]}
						color={"red"}
					/>
				);
				return (
					<React.Fragment>
						{line}
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
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
						url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png" //'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png' //'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>
					<Marker position={[10, 50]}>
						<Popup>YOO</Popup>
					</Marker>
					<Marker position={[50, 10]}>
						<Popup>YOO</Popup>
					</Marker>
					<Polyline
						positions={[
							[10, 50],
							[50, 10],
						]}
						color={"red"}
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
