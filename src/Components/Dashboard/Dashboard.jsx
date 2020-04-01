import React from "react";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import "../../Styling/dashboard/dashboard.scss";
import Overview from "../Dashboard/Overview";
import Jobs from "../Dashboard/Jobs";
import Networking from "../Dashboard/Networking";
import Events from "../Dashboard/Events";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function Dashboard(props) {
  const location = useLocation();

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

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email
  };
};

export default connect(mapStateToProps, null)(Dashboard);
