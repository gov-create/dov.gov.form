// src/components/Footer.js
import React from 'react';

const Footer = () => {
    const navbarStyle = {
        backgroundColor: '#0E4174',
        color: '#DEEEFF'
      };
  return (
    <footer className="pt-4 pb-0 mt-4" style={navbarStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h4 className='text-uppercase text-light fw-semibold' style={{color: 'white'}}>U.S. Department of Labor</h4>
            <br />
            <h6>
              200 Constitution Ave NW
              <br />
              Washington, DC 20210
            </h6>
            <p>
              © Connect With DOL  |   Privacy & Security Statement
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
