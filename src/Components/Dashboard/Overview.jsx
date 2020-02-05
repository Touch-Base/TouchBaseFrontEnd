import React from 'react';
import { connect } from 'react-redux';


function Overview(props) {

    return(
        <div className="overviewPage">
            <h1>Welcome {props.firstname}!</h1>
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
    )(Overview)
  );