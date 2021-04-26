import './Navbar.css';
import React from 'react';
import ButtonHistory from '../Button/ButtonHistory';
import ButtonProfil from '../Button/ButtonProfil';
import ButtonScan from '../Button/ButtonScan';

function Navbar() {
  return (
   <React.Fragment>
      <div className="navbar-container">
          <div className="navbar-text-left">
            <ButtonHistory />
          </div>
          <div>
            <ButtonScan />
          </div>
          <div className="navbar-text-right">
            < ButtonProfil />
          </div>
      </div>
  </React.Fragment>
  );
}

export default Navbar;