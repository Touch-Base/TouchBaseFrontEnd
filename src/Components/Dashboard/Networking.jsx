import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/networking.scss'


function Networking(props) {

    return(
        <div className="networkingPage">
            networking page
        </div>
        )
    }


const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        jobs: state.user.jobs
    }
  }
  
  export default(
    connect(
        mapStateToProps,
        null
    )(Networking)
  );
