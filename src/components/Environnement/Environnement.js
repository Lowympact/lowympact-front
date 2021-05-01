import React from "react";
import "./Environnement.css";

class Environnement extends React.Component {
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

  render = () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };
}

export default Environnement;
