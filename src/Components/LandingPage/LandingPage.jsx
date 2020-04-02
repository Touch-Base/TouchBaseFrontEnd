import React from "react";
import TopNav from "./TopNav";
import "../../Styling/home.scss";
import Particles from "./Particles";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Learn from "./Learn";
import Demo from "./Demo";
import Support from "./Support";
import Developer from "./Developer";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
    zIndex: 1,
    top: 0,
    left: 0
  }
};

function LandingPage(props) {
  const location = useLocation();

  return (
    <div className="landing">
      <TopNav props={props} />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/learn" component={Learn} />
          <Route exact path="/demo" component={Demo} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/developer" component={Developer} />
        </Switch>
      </AnimatePresence>
      <div style={styles.root}>
        <Particles />
      </div>
    </div>
  );
}

export default LandingPage;
