import React from "react";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import "../../Styling/dashboard/dashboard.scss";
import Overview from "../Dashboard/Overview";
import Jobs from "../Dashboard/Jobs";
import Networking from "../Dashboard/Networking";
import Events from "../Dashboard/Events";
import { Route, Redirect, Switch } from "react-router-dom";

function Dashboard(props) {
  console.log("on the dashboard");

  return (
    <div className="mainDashboard">
      <DashboardNav props={props} />
      <Switch>
        <Route exact path="/dashboard" component={Overview} />
        <Route exact path="/dashboard/jobs" component={Jobs} />
        <Route exact path="/dashboard/networking" component={Networking} />
        <Route exact path="/dashboard/events" component={Events} />
      </Switch>
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
