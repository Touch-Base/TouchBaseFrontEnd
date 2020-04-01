import React from "react";
import "../../Styling/topnav.scss";
import navLogo from "../../img/touchbase3.png";
import { NavLink } from "react-router-dom";

function TopNav() {
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
        <NavLink activeClassName="clickedLan" to="/blog">
          blog
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
}

export default TopNav;
