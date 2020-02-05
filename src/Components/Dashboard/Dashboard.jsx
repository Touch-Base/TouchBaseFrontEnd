import React from 'react';
import { connect } from 'react-redux';


function Dashboard(props) {

    return(
        <div className="mainDashboard">
            {/* props.children is needed to show all the data in reach router
            and the protected routes */}
            {props.children}
        </div>
        )
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
        null
    )(Dashboard)
  );