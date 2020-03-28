import React from "react";
import { connect } from "react-redux";
import "../../Styling/dashboard/overview.scss";
import Profile from "./Profile.jsx";
import { navigate } from "@reach/router";
import { motion, AnimatePresence } from "framer-motion";

function Overview(props) {
  const goToJobs = event => {
    event.preventDefault();

    navigate("dashboard/jobs");
  };

  // variants for animations
  const list = {
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

  // variants for card animation
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -25 }
  };

  const item2 = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 25 }
  };

  const item3 = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };

  const item4 = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -1000 },
    leaving: { opacity: 0, x: 1000 }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="test"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={list}
        className="overviewPage"
      >
        <motion.h1
          transition={{ ease: "easeIn" }}
          variants={item4}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            initial="visible"
            animate="leaving"
            variants={item4}
            transition={{ delay: 2.3, ease: "easeIn" }}
            className="hideH1"
          >
            Welcome {props.firstname}!
          </motion.div>
        </motion.h1>

        <div className="overviewBlocks">
          <Profile />
          <div className="countAndInfo">
            <motion.div
              variants={item2}
              transition={{ delay: 0.3, ease: "easeIn" }}
              className="jobsAndConnections"
            >
              {/* jobs applied block */}
              <div className="count">
                <i className="fas fa-hammer"></i>
                <div className="nameAndNumber">
                  <h2>JOBS APPLIED</h2>
                  <motion.h2
                    variants={item3}
                    transition={{ delay: 1.2, ease: "easeIn" }}
                    className="number"
                  >
                    {props.jobsTotal}
                  </motion.h2>
                </div>
              </div>

              {/* connections made block */}
              <div className="count">
                <i className="fas fa-people-arrows"></i>
                <div className="nameAndNumber">
                  <h2>CONNECTIONS</h2>
                  <motion.h2
                    variants={item3}
                    transition={{ delay: 1.2, ease: "easeIn" }}
                    className="number"
                  >
                    {props.connectionsTotal}
                  </motion.h2>
                </div>
              </div>
            </motion.div>
            <motion.button
              variants={item2}
              transition={{ delay: 0.4, ease: "easeIn" }}
              onClick={goToJobs}
              className="homeAddJob"
            >
              <h2>ADD A JOB</h2>
              <i className="fas fa-arrow-right"></i>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
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
