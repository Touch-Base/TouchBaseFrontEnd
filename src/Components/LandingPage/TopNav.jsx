import React, { useState } from "react";
import "../../Styling/topnav.scss";
import "../../Styling/landingPageMobile/topnavMobile.scss";
import navLogo from "../../img/touchbase3.png";
import { NavLink } from "react-router-dom";
import useWindowDimensions from "../Helpers/WindowSize";

function TopNav() {
  const { width } = useWindowDimensions();

  // this is for the mobile side nav
  const [sidenav, showNav] = useState(false);

  // show side nav
  const openNav = event => {
    event.preventDefault();

    showNav(!sidenav);
  };

  if (width > 465) {
    return (
      <div className="topBar">
        <nav className="homePageLink">
          <NavLink exact to="/">
            <img src={navLogo} alt="navLogo" />
          </NavLink>
        </nav>
        <nav>
          <NavLink activeClassName="clickedLan" to="/learn">
            learn
          </NavLink>
          <NavLink activeClassName="clickedLan" to="/demo">
            demo
          </NavLink>
          <NavLink activeClassName="clickedLan" to="/support">
            support
          </NavLink>
          <NavLink activeClassName="clickedLan" to="/developer">
            developer
          </NavLink>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="topNavMobile">
        <div className="mobileBar">
          <button onClick={openNav}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={"mobileLanNav"}
          style={sidenav ? { marginLeft: "-180px" } : { marginLeft: 0 }}
        >
          <nav>
            <NavLink activeClassName="clickedLan" exact to="/">
              home
            </NavLink>
            <NavLink activeClassName="clickedLan" to="/learn">
              learn
            </NavLink>
            <NavLink activeClassName="clickedLan" to="/demo">
              demo
            </NavLink>
            <NavLink activeClassName="clickedLan" to="/support">
              support
            </NavLink>
            <NavLink activeClassName="clickedLan" to="/developer">
              developer
            </NavLink>
          </nav>
        </div>
      </div>
    );
  }
}

export default TopNav;
