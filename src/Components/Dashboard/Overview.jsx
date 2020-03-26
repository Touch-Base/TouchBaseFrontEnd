import React from "react";
import { connect } from "react-redux";
import "../../Styling/dashboard/overview.scss";
import Profile from "./Profile.jsx";
import { navigate } from "@reach/router";

function Overview(props) {
  const goToJobs = event => {
    event.preventDefault();

    navigate("dashboard/jobs");
  };

  return (
    <div className="overviewPage">
      <h1>Welcome {props.firstname}!</h1>
      <div className="overviewBlocks">
        <Profile />
        <div className="countAndInfo">
          <div className="jobsAndConnections">
            {/* jobs applied block */}
            <div className="count">
              <i className="fas fa-hammer"></i>
              <div className="nameAndNumber">
                <h2>JOBS APPLIED</h2>
                <h2 className="number">{props.jobsTotal}</h2>
              </div>
            </div>

            {/* connections made block */}
            <div className="count">
              <i className="fas fa-people-arrows"></i>
              <div className="nameAndNumber">
                <h2>CONNECTIONS</h2>
                <h2 className="number">{props.connectionsTotal}</h2>
              </div>
            </div>
          </div>
          <button onClick={goToJobs} className="homeAddJob">
            <h2>ADD A JOB</h2>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    jobsTotal: state.user.jobsTotal,
    connectionsTotal: state.user.connectionsTotal
  };
};

export default connect(mapStateToProps, null)(Overview);
