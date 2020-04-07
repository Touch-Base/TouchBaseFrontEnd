import React from "react";
import { motion } from "framer-motion";
function Demo() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-50%" }}
      className="contactBlock"
    >
      DEMO PLACEHOLDER
    </motion.div>
  );
}

export default Demo;
