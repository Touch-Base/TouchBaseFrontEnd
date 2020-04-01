import React, { useState } from "react";
import "../../Styling/dashboard/dashboardnav.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOutState } from "../../actions/index";
import navLogo from "../../img/touchbasewhite.png";

function DashboardNav(props) {
  // this changes the value for the sign out warning
  const [warning, setWarning] = useState(false);

  // adds a 2 second delay to signing out
  const signOut = () => {
    window.localStorage.clear();
    setTimeout(() => props.props.history.push("/"), 1000);
    setTimeout(() => props.logOutState(), 1001);
  };

  // change warning value
  const warningHandler = event => {
    event.preventDefault();

    setWarning(!warning);
  };

  return (
    <nav className="dashboardNav">
      <a href="/">
        <img src={navLogo} alt="navLogo" />
      </a>
      <NavLink to="/dashboard">profile</NavLink>
      <NavLink to="/dashboard/jobs">jobs</NavLink>
      <NavLink to="/dashboard/networking">networking</NavLink>
      <NavLink to="/dashboard/events">events</NavLink>
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

const mapDispatchToProps = {
  logOutState: logOutState
};

export default connect(null, mapDispatchToProps)(DashboardNav);
