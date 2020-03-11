import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import Modal from './Modal';
import { connect } from 'react-redux';
import '../../Styling/dashboard/profile.scss'

function Profile(props) {
    
    
    // this sets the visibility for the updating profile form
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
                <div className="imageAndInfo">
                    <img src="https://image.shutterstock.com/image-photo/portrait-young-beautiful-cute-cheerful-260nw-666258808.jpg" width="200px" alt="portrait" />
                    <div className="mainSummary">
                        <h2 className="positionTitle">{props.position || "Position"}</h2>
                        <h2 className="fullName">{props.firstname} {props.lastname}</h2>
                        <h2>Summary: {props.summary || "Summary"}</h2>
                    </div>
                </div>
                <div className="profileContact">
                    <div className="profileContactSec">
                        <i className="fas fa-at"></i>
                        <h5 className="userEmail"> {props.email}</h5>
                    </div>
                    <div className="profileContactSec">
                        <i className="fas fa-map-marker-alt"></i>
                        <h5 className="userLocation"> {props.location || "Location"}</h5>
                    </div>
                    <div className="profileContactSec">
                        <i className="fab fa-pagelines"></i>
                        <h5 className="age">{props.age || "Age"} Years Old</h2>
                    </div>
                </div>
            </div>

        
            <button className={visibleProfile ? "exOut" : "updateProfile"} onClick={showProfileForm}>
                <i className={visibleProfile ? "fas fa-times" : "fas fa-plus"}></i>
            </button>
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
