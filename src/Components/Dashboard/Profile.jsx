import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/profile.scss'

function Profile(props) {
    
    const dummyUser = {
        firstname: '',
        lastname: '',
        email: '',
        age: '',
        location: '',
        position: '',
        about: ''
    }
        
    const [user, setUser] = useState(dummyUser);
    
    const changeHandler = (event) => {
        event.preventDefault();
        
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    
    const updateProfile = () => {
        event.preventDefault();

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
            
            <form className="editForm">
              <input 
                  type="text" 
                  value={user.firstname} 
                  name="firstname" 
                  placeholder="firstname" 
                  onChange={changeHandler}
               />
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
