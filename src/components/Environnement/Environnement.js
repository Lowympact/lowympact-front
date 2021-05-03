import React from "react";
import "./Environnement.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";

class Environnement extends React.Component {
	state = {
		swiper: undefined,
		currentIndex: 0,
	};

	getMaterialIcon = (mode) => {
		switch (mode) {
			case "Recyclable":
				return "check_circle_outline";
			case "Non recyclable":
				return "highlight_off";
			default:
				return "view_in_ar";
		}
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

	getLabel = (note) => {
		if (note > 67) {
			return "Bonne";
		}
		if (note <= 33) {
			return "Mauvais";
		}
		return "Moyen";
	};

	displaySlides = () => {
		let slides = <React.Fragment></React.Fragment>;

		if (
			this.props.dataEcoScore &&
			this.props.dataEcoScore?.adjustments?.packaging?.packagings
				.length >= 1
		) {
			slides = this.props.dataEcoScore?.adjustments?.packaging?.packagings.map(
				(data) => {
					var recyclable = "";
					if (data.recycling) {
						recyclable = data.recycling.split(":")[1];
					}
					if (recyclable && recyclable == "recycle") {
						recyclable = "Recyclable";
					} else if (recyclable && recyclable == "discard") {
						recyclable = "Non recyclable";
					} else {
						recyclable = "";
					}

					return (
						<SwiperSlide>
							<div className="env-product-slide-container ">
								<div className="env-product-slide-icon">
									<span class="material-icons env-icon-label">
										{this.getMaterialIcon("")}
									</span>
								</div>
								<div className="env-product-slide-wrapper">
									<div className="product-slide-name">
										{data?.material.split(":")[1]}
									</div>
									<div className="product-ecoscore">
										Ecoscore :{" "}
										{data?.ecoscore_material_score}
									</div>

									<div className="env-history-label-container">
										<span
											className="packaging-label-color"
											style={{
												color: this.getColor(
													data?.ecoscore_material_score
												),
											}}
										>
											●
										</span>
										<div className="env-history-label">
											{this.getLabel(
												data?.ecoscore_material_score
											)}
										</div>
									</div>
									<div className="product-slide-recyclable">
										{recyclable}
										<div className="material-icons icon-label-recyclable">
											{this.getMaterialIcon(recyclable)}
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
					);
				}
			);
		}
		return slides;

		// return slides;
	};

	displayPackaging = () => {
		let res = (
			<React.Fragment>
				<p>Matériaux utilisés</p>
			</React.Fragment>
		);
		//if (this.props.dataEcoScore.adjustments.packaging) {
		res = this.props.dataEcoScore?.adjustments?.packaging?.packagings.map(
			(product) => {
				console.log(product);
				return (
					<div>
						<p>Matériel : {product?.material}</p>
					</div>
				);
			}
		);
		//}
		return res;
	};

	onSlideChange = (index) => {
		this.setState({ currentIndex: index });
	};

	render = () => {
		return (
			<React.Fragment>
				<span className="title-part-environnement">
					Impact de l'emballage
				</span>
				<Swiper
					spaceBetween={10}
					slidesPerView={1}
					centeredSlides={true}
					onSlideChange={(i) => this.onSlideChange(i.activeIndex)}
					onSwiper={(swiper) => this.setState({ swiper: swiper })}
				>
					{this.displaySlides()}
				</Swiper>
				{/* <Swiper
					spaceBetween={50}
					slidesPerView={1}
					onSlideChange={() => console.log("slide change")}
					onSwiper={(swiper) => console.log(swiper)}
				>
					{this.displaySlides()}
					<SwiperSlide>
						<div className="test">Slide 1</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="test">Slide 2</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="test">Slide 3</div>
					</SwiperSlide>
				</Swiper> */}
			</React.Fragment>
		);
	};
}
/*
   <div>
          <p>
            Note du transport des ingrédients :
            {
              this.props.dataEcoScore?.adjustments?.origins_of_ingredients
                ?.transportation_value_fr
            }
          </p>
          <p>Note de l'éco score : {this.props.dataEcoScore?.score} </p>
        </div>
        <div>
          <p>Informations emballages </p>
          {this.displayPackaging()}
        </div>
*/

export default Environnement;
