import React, { useState } from "react";
import "../../Styling/topnav.scss";
import "../../Styling/landingPageMobile/topnavMobile.scss";
import navLogo from "../../img/touchbase3.png";
import navLogoMobile from "../../img/touchbasewhite.png";
import { NavLink } from "react-router-dom";
import useWindowDimensions from "../Helpers/WindowSize";
import { useLocation } from "react-router-dom";

function TopNav() {
  // width of window from window component
  const { width } = useWindowDimensions();

  // location
  const location = useLocation();

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
          <img src={navLogoMobile} alt="navLogo" />
          <h3>{location.pathname.substring(1)}</h3>
          <button onClick={openNav}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          onClick={openNav}
          className={"mobileLanNav"}
          style={!sidenav ? { marginLeft: "-180px" } : { marginLeft: 0 }}
        >
          <nav onClick={openNav}>
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
          <nav onClick={openNav} className="regLogMobile">
            <NavLink activeClassName="clickedLan" exact to="/register">
              sign up
            </NavLink>
            <NavLink activeClassName="clickedLan" to="/login">
              login
            </NavLink>
          </nav>
        </div>
      </div>
    );
  }
}

export default TopNav;
