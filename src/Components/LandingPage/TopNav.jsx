import React from "react";
import "../../Styling/topnav.scss";
import "../../Styling/landingPageMobile/topnavMobile.scss";
import navLogo from "../../img/touchbase3.png";
import { NavLink } from "react-router-dom";
import useWindowDimensions from "../Helpers/WindowSize";

function TopNav() {
  const { width } = useWindowDimensions();

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
    return <h1>hi</h1>;
  }
}

export default TopNav;
