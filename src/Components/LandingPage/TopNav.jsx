import React, { useState } from "react";
import "../../Styling/topnav.scss";
import navLogo from "../../img/touchbase3.png";
import { motion, AnimatePresence } from "framer-motion";

function TopNav(props) {
  if (props.uri === "/dashboard") {
    return <div>WOAH WOAH OWAH</div>;
  } else {
    return (
      <div className="topBar">
        <a href="/">
          <img src={navLogo} alt="navLogo" />
        </a>
        <nav>
          <a href="/">learn</a>
          <a href="/">blog</a>
          <a href="/">support</a>
          <a href="/">pricing</a>
        </nav>
      </div>
    );
  }
}

export default TopNav;
