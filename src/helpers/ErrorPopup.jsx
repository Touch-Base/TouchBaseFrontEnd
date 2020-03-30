import React from "react";
import { motion } from "framer-motion";

const ErrorPopUp = ({ visible }) => {
  if (visible) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="errorPopup"
      >
        The information entered may be in use or invalid.
      </motion.div>
    );
  } else {
    return null;
  }
};

export default ErrorPopUp;
