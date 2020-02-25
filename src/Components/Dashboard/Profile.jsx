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
        <div>
            <div className="profileBlock">
                <h2>Name: {props.firstname} {props.lastname}</h2>
                <h2>email: {props.email}</h2>
                <h2>Age: {props.age}</h2>
                <h2>Location: {props.location}</h2>
                <h2>Position: {props.position}</h2>
                <h2>Summary: {props.summary}</h2>
            </div>
            <h1>hey</h1>
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
