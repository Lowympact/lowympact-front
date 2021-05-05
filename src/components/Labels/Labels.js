import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";
import "./Labels.css";

class Labels extends React.Component {
	displaySpecies = () => {
		if (
			this.props.dataEcoScore?.adjustments?.threatened_species?.length ===
			0
		) {
			return <div></div>;
		} else {
			if (
				this.props.dataEcoScore?.adjustments?.threatened_species
					?.value < 0
			) {
				return (
					<div>
						<div className="labels-container-bad">
							<span class="material-icons">warning_amber</span>
							{
								this.props.dataEcoScore?.adjustments
									?.threatened_species?.ingredient
							}
						</div>
					</div>
				);
			} else {
				return (
					<div>
						<div className="labels-container-good">
							<span class="material-icons">task_alt</span>
							{
								this.props.dataEcoScore?.adjustments
									?.threatened_species?.ingredient
							}
						</div>
					</div>
				);
			}
		}
	};

	displaySpecies = () => {
		if (
			!this.props.dataEcoScore?.adjustments?.threatened_species
				?.ingredient
		) {
			return <div></div>;
		} else {
			if (
				this.props.dataEcoScore?.adjustments?.threatened_species
					?.value < 0
			) {
				return (
					<div>
						<div className="labels-container-bad">
							<span class="material-icons">warning_amber</span>
							{
								this.props.dataEcoScore?.adjustments
									?.threatened_species?.ingredient
							}
						</div>
					</div>
				);
			} else {
				return (
					<div>
						<div className="labels-container-good">
							<span class="material-icons">task_alt</span>
							{
								this.props.dataEcoScore?.adjustments
									?.threatened_species?.ingredient
							}
						</div>
					</div>
				);
			}
		}
	};

	displayProduction = () => {
		if (!this.props.dataEcoScore?.adjustments?.production_system?.label) {
			return <div></div>;
		} else {
			if (
				this.props.dataEcoScore?.adjustments?.production_system?.value <
				0
			) {
				return (
					<div>
						<div className="labels-container-bad">
							<span class="material-icons">warning_amber</span>
							{
								this.props.dataEcoScore?.adjustments
									?.production_system?.label
							}
						</div>
					</div>
				);
			} else {
				return (
					<div>
						<div className="labels-container-good">
							<span class="material-icons">task_alt</span>
							{
								this.props.dataEcoScore?.adjustments
									?.production_system?.label
							}
						</div>
					</div>
				);
			}
		}
	};

	render() {
		if (
			this.props.dataEcoScore?.adjustments?.threatened_species?.length !=
				0 &&
			this.props.dataEcoScore?.adjustments?.production_system?.label
		) {
			return (
				<div>
					<h1>Labels</h1>

					<div className="labels-container">
						{this.displaySpecies()}
						{this.displayProduction()}
					</div>
				</div>
			);
		} else {
			return <React.Fragment />;
		}
	}
}

export default Labels;
