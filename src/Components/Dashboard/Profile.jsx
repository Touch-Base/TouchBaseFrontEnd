import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import Modal from './Modal';
import { connect } from 'react-redux';
import '../../Styling/dashboard/profile.scss'

function Profile(props) {

    const [ visibleProfile, setVisibility ] = useState(false);

    const showProfileForm = event => {
      event.preventDefault();

      setVisibility(!visibleProfile)
    }

    const initialValues = { 
        firstname: props.firstname, 
        lastname: props.lastname, 
        email: props.email, 
        age: props.age,
        location: props.location,
        position: props.position,
        summary: props.summary
      }

    return (
        <div className="profilePage">
            <div className="profileBlock">
                <div className="namePosition">
                    <img src="https://image.shutterstock.com/image-photo/portrait-young-beautiful-cute-cheerful-260nw-666258808.jpg" width="200px" alt="portrait" />
                    <h2 className="fullName">{props.firstname} {props.lastname}</h2>
                    <h2 className="positionTitle">{props.position || "Position"}</h2>
                    <h2 className="age">{props.age || "Age"}</h2>
                </div>
                <div className="locationEmail">
                    <h2>email: {props.email}</h2>
                    <h2>Location: {props.location || "Location"}</h2>
                </div>
                <div className="summary">
                    <h2>Summary: {props.summary || "Summary"}</h2>
                </div>
            </div>
            <button onClick={showProfileForm}>show form</button>
            <Modal visible={visibleProfile}>
                <ProfileForm initialValues={initialValues} />
            </Modal>
        </div>
    )
}

// passes the user state from redux into component state

const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        age: state.user.age,
        location: state.user.location,
        position: state.user.position,
        summary: state.user.summary
    }
  }

  
  export default(
    connect(
        mapStateToProps,
        null
    )(Profile)
  );
