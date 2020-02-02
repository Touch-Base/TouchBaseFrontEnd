import React from 'react';
import '../../Styling/topnav.scss'
import navLogo from '../../img/touchbaseblack.png';

function TopNav() {
    return (
      <div className="topBar">
        <a href="/">
          <img src={navLogo} alt="navLogo" />
        </a>
        <nav>
          <a href="#">Teams</a>
          <a href="#">Learn</a>
          <a href="#">Blog</a>
          <a href="#">Support</a>
          <a href="#">Pricing</a>
        </nav>
      </div>
    );
  }
  
  export default TopNav;
  