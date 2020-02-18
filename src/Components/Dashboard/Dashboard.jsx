import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';
import { fillStateJobs } from '../../actions/index';
import '../../Styling/dashboard/dashboard.scss';


function Dashboard(props) {

    useEffect(() => {
        // code to run on component mount
        props.fillStateJobs();
        console.log('adding everything')
      }, [])

    return(
        <div className="mainDashboard">
            <DashboardNav />
            {/* props.children is needed to show all the data in reach router
            and the protected routes */}
            {props.children}
        </div>
        )
    }

const mapDispatchToProps = {
    fillStateJobs: fillStateJobs
    }

const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email
    }
  }
  
  export default(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
  );