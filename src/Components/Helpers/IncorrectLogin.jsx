import React from "react";
import "../../Styling/dashboard/dashboard.scss";
import { motion } from "framer-motion";

function IncorrectLogin(props) {
  if (props.error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="invalidLogin"
      >
        The information entered is invalid.
      </motion.div>
    );
  } else {
    return null;
  }
}

export default IncorrectLogin;
