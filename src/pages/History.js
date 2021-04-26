import React from 'react';
import fruits from '../assets/images/fruits-vegetables-basket-by-oblik-studio.svg';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';

function Homepage() {
  return (
    <React.Fragment>
      <Header/>
      <Navbar/>
      <div className="App">
        <img src={fruits} className="logo"/>
      </div>
    </React.Fragment>
  );
}

export default Homepage;