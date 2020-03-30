import React, { useState } from "react";
import "../../Styling/dashboard/dashboardnav.scss";
import { Link } from "react-router-dom";

import navLogo from "../../img/touchbasewhite.png";

function DashboardNav(props) {
  // this changes the value for the sign out warning
  const [warning, setWarning] = useState(false);

  // adds a 2 second delay to signing out
  const signOut = () => {
    window.localStorage.clear();
    setTimeout(() => props.props.history.push("/"), 1000);
  };

  // checks for active link
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { id: "activeLink" } : {};
  };

  // change warning value
  const warningHandler = event => {
    event.preventDefault();

    setWarning(!warning);
  };

  return (
    <nav className="dashboardNav">
      <a href="#">
        <img src={navLogo} alt="navLogo" />
      </a>
      <Link getProps={isActive} to="/dashboard">
        profile
      </Link>
      <Link getProps={isActive} to="/dashboard/jobs">
        jobs
      </Link>
      <Link getProps={isActive} to="/dashboard/networking">
        networking
      </Link>
      <Link getProps={isActive} to="/dashboard/events">
        events
      </Link>
      <button
        id="signOutButton"
        onMouseEnter={warningHandler}
        onMouseLeave={warningHandler}
        onClick={signOut}
      >
        <i className="fas fa-sign-out-alt"></i>
      </button>
      <h3 className="signOut" style={warning ? { opacity: 1 } : { opacity: 0 }}>
        sign out?
      </h3>
    </nav>
  );
}

export default DashboardNav;
