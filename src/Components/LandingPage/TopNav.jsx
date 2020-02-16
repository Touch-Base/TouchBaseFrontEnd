import React from 'react';
import '../../Styling/topnav.scss'
import navLogo from '../../img/touchbaseblack.png';

function TopNav(props) {

    console.log(props);
    
    if(props.uri === "/dashboard") {

      return (
        <div>
          WOAH WOAH OWAH
        </div>
      );
    }

    else {
      return(
        <div className="topBar">
            <a href="/">
              <img src={navLogo} alt="navLogo" />
            </a>
            <nav>
              <a href="/">Teams</a>
              <a href="/">Learn</a>
              <a href="/">Blog</a>
              <a href="/">Support</a>
              <a href="/">Pricing</a>
            </nav>
          </div>
      )
    }
  }
  
  export default TopNav;
  