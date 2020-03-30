import React from "react";
import { connect } from "react-redux";
import "../../Styling/dashboard/overview.scss";
import "../../Styling/dashboard/profile.scss";
import Profile from "./Profile.jsx";
import { motion } from "framer-motion";

function Overview(props) {
  const goToJobs = event => {
    event.preventDefault();

    props.history.push("dashboard/jobs");
  };

  // variants for parent animation
  const parentList = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    }
  };

  return (
    <motion.div
      variants={parentList}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="overviewPage"
    >
      <div className="overviewBlocks">
        <Profile />

        {/* this block is the right side of the overview */}
        <div className="countAndInfo">
          <div className="profileContact">
            <div className="profileContactSec">
              <i className="fas fa-at"></i>
              <h5
                className={
                  props.email.length < 22 ? "userEmail" : "userEmailLong"
                }
              >
                {" "}
                {props.email}
              </h5>
            </div>
            <div className="profileContactSec">
              <i className="fas fa-map-marker-alt"></i>
              <h5 className="userLocation">
                {" "}
                {props.location || "(Add location)"}
              </h5>
            </div>
            <div className="profileContactSec">
              <i className="fab fa-pagelines"></i>
              <h5 className="age">
                {props.age ? `${props.age} Years Old` : "(Add age)"}
              </h5>
            </div>
          </div>
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
    </motion.div>
  );
}

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    jobsTotal: state.user.jobsTotal,
    age: state.user.age,
    location: state.user.location,
    connectionsTotal: state.user.connectionsTotal
  };
};

export default connect(mapStateToProps, null)(Overview);
