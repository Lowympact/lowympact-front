import React from 'react';
import logo from '../assets/images/logo.svg';
import Navbar from '../components/Navbar/Navbar';

function Homepage() {
  return (
    <React.Fragment>
      <Navbar/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="logo" alt="logo" />
          <h1>Lowympact</h1>

        </header>
      </div>
    </React.Fragment>
  );
}

export default Homepage;