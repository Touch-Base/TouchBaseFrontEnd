import React from "react";
import { motion } from "framer-motion";
import "../../Styling/demo.scss";

function Demo() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-50%" }}
      className="contactBlock"
    >
      <iframe
        src="https://player.vimeo.com/video/406958066"
        width="640"
        height="360"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
      ></iframe>
    </motion.div>
  );
}

export default Demo;
