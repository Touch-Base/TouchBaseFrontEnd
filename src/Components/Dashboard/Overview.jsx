import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/overview.scss'

function Overview(props) {

    return(
        <div className="overviewPage">
            <h1>Welcome {props.firstname}!</h1>
            <p>
                Take a load off of your job search with TouchBase, 
                the best tool for organizing your career development. 
                Add and search through jobs you've applied to, and
                make optimal use of the connections you've made along the way.
                TouchBase brings you closer to that final offer letter.
            </p>
            <div className="jobsAndConnections">
                <div className="jobsCount">
                    <h2>Jobs Applied:</h2><h2 className="numberOne">{props.jobsTotal}</h2>
                </div>
                <div className="connectionsCount">
                    <h2>Connections:</h2><h2 className="numberTwo">{props.connectionsTotal}</h2>
                </div>
            </div>
            <button>Get Started!</button>
        </div>
        )
    }

const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        jobsTotal: state.user.jobsTotal,
        connectionsTotal: state.user.connectionsTotal
    }
  }
  
  export default(
    connect(
        mapStateToProps,
        null
    )(Overview)
  );
