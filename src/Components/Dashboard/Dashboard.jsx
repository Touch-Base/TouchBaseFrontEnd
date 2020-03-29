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
      <DashboardNav />
      <Switch>
        <Route exact path="/" component={Overview} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/networking" component={Networking} />
        <Route exact path="/events" component={Events} />
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
