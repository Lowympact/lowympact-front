import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.css";
import "./Labels.css";

class Labels extends React.Component {

  displaySpecies = () => {
    if(this.props.dataEcoScore?.adjustments?.threatened_species?.length === 0){
        return(<div></div>);
    }
    else{
        if(this.props.dataEcoScore?.adjustments?.threatened_species?.value < 0){
            return(
            <SwiperSlide>
                <div className="labels-container-bad">
                    <span class="material-icons">
                        warning_amber
                    </span>
                    {this.props.dataEcoScore?.adjustments?.threatened_species?.ingredient}
                </div>
            </SwiperSlide>
            );
        }
        else{
            return(
            <SwiperSlide>
                <div className="labels-container-good">
                    <span class="material-icons">
                        task_alt
                    </span>
                    {this.props.dataEcoScore?.adjustments?.threatened_species?.ingredient}
                </div>
            </SwiperSlide>
            );
        }
    }
  }

  displayProduction = () => {
    if(this.props.dataEcoScore?.adjustments?.production_system?.warning === "no_label"){
        return(<div></div>);
    }
    else{
        if(this.props.dataEcoScore?.adjustments?.production_system?.value < 0){
            return(
            <SwiperSlide>
                <div className="labels-container-bad">
                    <span class="material-icons">
                        warning_amber
                    </span>
                    {this.props.dataEcoScore?.adjustments?.production_system?.label}
                </div>
            </SwiperSlide>
            );
        }
        else{
            return(
            <SwiperSlide>
                <div className="labels-container-good">
                    <span class="material-icons">
                        task_alt
                    </span>
                    {this.props.dataEcoScore?.adjustments?.production_system?.label}
                </div>
            </SwiperSlide>
            );
        }
    }
  }

  render(){
      return(
    <div>
        <h1>
            Labels
        </h1>
        <div className="labels-container">
            {this.displaySpecies()}
            {this.displayProduction()}
        </div>
    </div>
    );
  }
  
}

export default Labels;
