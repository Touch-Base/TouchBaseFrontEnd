import React from "react";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import "../../Styling/dashboard/dashboard.scss";
import Overview from "./Overview/Overview";
import Jobs from "./Jobs/Jobs";
import Networking from "./Networking/Networking";
import Events from "../Dashboard/Events/Events";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Footer from "../Helpers/Footer";

function Dashboard(props) {
  const location = useLocation();

  // this checks what background should be used on the body

  if (location.pathname.includes("/dashboard")) {
    document.body.classList.add("dashBody");
    document.body.classList.remove("lgBody");
  } else {
    document.body.classList.add("lgBody");
    document.body.classList.remove("dashBody");
  }

  return (
    <div className="mainDashboard">
      <DashboardNav props={props} />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/dashboard" component={Overview} />
          <Route exact path="/dashboard/jobs" component={Jobs} />
          <Route exact path="/dashboard/networking" component={Networking} />
          <Route exact path="/dashboard/events" component={Events} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
