import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/profile.scss'

function Profile(props) {

    return(
        <div className="profilePage">
            <div className="profileBlock">
                <h2>Name: {props.firstname} {props.lastname}</h2>
                <h2>email: {props.email}</h2>
                <h2>Age: </h2>
                <h2>Location: </h2>
                <h2>Position: </h2>
                <h2>About: </h2>
            </div>
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
    )(Profile)
  );
