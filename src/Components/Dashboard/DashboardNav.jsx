import React, { useState } from "react";
import "../../Styling/dashboard/dashboardnav.scss";
import "../../Styling/dashboard/mobile/navMobile.scss";
import { connect } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { logOutState } from "../../actions/index";
import navLogo from "../../img/touchbasewhite.png";
import useWindowDimensions from "../Helpers/WindowSize";

function DashboardNav(props) {
  // width of window from window component
  const { width } = useWindowDimensions();

  // this changes the value for the sign out warning
  const [warning, setWarning] = useState(false);

  // location
  const location = useLocation();

  // this is for the mobile side nav
  const [sidenav, showNav] = useState(false);

  // show side nav
  const openNav = (event) => {
    event.preventDefault();

    showNav(!sidenav);
  };

  // adds a 2 second delay to signing out
  const signOut = () => {
    window.localStorage.clear();
    setTimeout(() => props.props.history.push("/"), 1000);
    setTimeout(() => document.body.classList.remove("dashBody"), 1000);
    setTimeout(() => props.logOutState(), 1001);
  };

  // change warning value
  const warningHandler = (event) => {
    event.preventDefault();

    setWarning(!warning);
  };

  if (width > 620) {
    return (
      <nav className="dashboardNav">
        <img src={navLogo} alt="navLogo" />
        <NavLink exact activeClassName="clickedDash" to="/dashboard">
          profile
        </NavLink>
        <NavLink activeClassName="clickedDash" to="/dashboard/jobs">
          jobs
        </NavLink>
        <NavLink activeClassName="clickedDash" to="/dashboard/networking">
          networking
        </NavLink>
        <NavLink activeClassName="clickedDash" to="/dashboard/events">
          events
        </NavLink>
        <button
          id="signOutButton"
          onMouseEnter={warningHandler}
          onMouseLeave={warningHandler}
          onClick={signOut}
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
        <h3
          className="signOut"
          style={warning ? { opacity: 1 } : { opacity: 0 }}
        >
          sign out?
        </h3>
      </nav>
    );
  } else {
    return (
      <div className="dashNavMobile">
        <div className="dashBar">
          <img src={navLogo} alt="navLogo" />
          <h3>
            {location.pathname === "/dashboard"
              ? "dashboard"
              : location.pathname.substring(11)}
          </h3>
          <button onClick={openNav}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          onClick={openNav}
          className="mobileDashNav"
          style={!sidenav ? { marginLeft: "-180px" } : { marginLeft: 0 }}
        >
          <nav onClick={openNav}>
            <NavLink exact activeClassName="clickedDash" to="/dashboard">
              profile
            </NavLink>
            <NavLink activeClassName="clickedDash" to="/dashboard/jobs">
              jobs
            </NavLink>
            <NavLink activeClassName="clickedDash" to="/dashboard/networking">
              networking
            </NavLink>
            <NavLink activeClassName="clickedDash" to="/dashboard/events">
              events
            </NavLink>
          </nav>
          <button
            id="signOutButton"
            onMouseEnter={warningHandler}
            onMouseLeave={warningHandler}
            onClick={signOut}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  logOutState: logOutState,
};

export default connect(null, mapDispatchToProps)(DashboardNav);
