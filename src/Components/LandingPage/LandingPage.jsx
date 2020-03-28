import React from "react";
import TopNav from "../LandingPage/TopNav";
import "../../Styling/home.scss";
import Particles from "./Particles";

const styles = {
  root: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    background: "none",
    zIndex: 5,
    top: 0,
    left: 0
  }
};

function LandingPage(props) {
  return (
    <div className="landing">
      <TopNav />
      {props.children}
      <div style={styles.root}>
        <Particles />
      </div>
    </div>
  );
}

export default LandingPage;
