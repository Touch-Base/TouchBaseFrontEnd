import React from "react";
import TopNav from "./TopNav";
import "../../Styling/home.scss";
import Particles from "./Particles";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Learn from "./Learn";
import Blog from "./Blog";
import Support from "./Support";
import Pricing from "./Pricing";
import { Route, Switch } from "react-router-dom";

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
  return (
    <div className="landing">
      <TopNav props={props} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/learn" component={Learn} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/pricing" component={Pricing} />
      </Switch>
      <div style={styles.root}>
        <Particles />
      </div>
    </div>
  );
}

export default LandingPage;
