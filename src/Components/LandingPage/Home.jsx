import React from "react";
import "../../Styling/home.scss";
import logo from "../../img/touchbasewhite.png";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  // variants for animations
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delay: 0.5
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        delay: 0.5
      }
    }
  };

  return (
    <motion.div
      key="test"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={list}
      className="homeBlock"
    >
      <img className="logo" src={logo} alt="logo" />
      <h1>
        Your entire <span className="jobWord">job</span> search,
        <br />
        <span className="secondLine">all in one place.</span>
      </h1>
      <div className="homeLinks">
        <div className="homeLink">
          <i className="fas fa-clipboard-list"></i>
          <a id="reg" href="/register">
            Register
          </a>
        </div>
        <div className="homeLink">
          <i className="fas fa-arrow-circle-down"></i>
          <a id="log" href="/login">
            Login
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
