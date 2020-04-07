import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { removeError } from "../actions/index";
import "../Styling/dashboard/dashboard.scss";

const ErrorPopUp = props => {
  if (props.error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="errorPopup"
      >
        The information entered may be in use or invalid.
        <button onClick={props.removeError}>
          <i className="fas fa-times"></i>
        </button>
      </motion.div>
    );
  } else {
    return null;
  }
};

// passes the remove error from redux into component state

const mapDispatchToProps = {
  removeError: removeError
};

export default connect(null, mapDispatchToProps)(ErrorPopUp);
