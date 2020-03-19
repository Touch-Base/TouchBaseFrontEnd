import React, { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import Modal from "./Modal";
import { connect } from "react-redux";
import "../../Styling/dashboard/profile.scss";
import "../../Styling/dashboard/profileform.scss";
import axios from "axios";

function Profile(props) {
  // this sets the visibility for the updating profile form
  const [visibleProfile, setVisibility] = useState(false);

  // current image hook
  const [image, setImage] = useState("");

  // loading image
  const [loading, setLoading] = useState(false);

  // this is the function for form visibility
  const showProfileForm = event => {
    event.preventDefault();

    setVisibility(!visibleProfile);
  };

  useEffect(() => {
    // checks to see if the user was updated
    // and closes the edit box
    setVisibility(false);
  }, [props]);

  const initialValues = {
    firstname: props.firstname,
    lastname: props.lastname,
    email: props.email,
    age: props.age,
    location: props.location,
    position: props.position,
    summary: props.summary
  };

  // function to upload image
  const imgUploadHandler = event => {
    event.preventDefault();

    const files = event.target.files;
    const data = new FormData();

    data.append("file", files[0]);
    data.append("upload_preset", "touchbase");

    setLoading(true);

    // adds the image to cloudinary
    axios
      .post("https://api.cloudinary.com/v1_1/dthd6avfb/image/upload", data)
      .then(res => {
        console.log(res);
        setLoading(false);
        setImage(res.data.secure_url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="profilePage">
      <div className="profileBlock">
        <div className="imageAndInfo">
          <input
            type="file"
            name="file"
            placeholder="Upload an image"
            onChange={imgUploadHandler}
          />
          {loading ? <h3>Loading...</h3> : <img src={image} />}
          <img
            src="https://image.shutterstock.com/image-photo/portrait-young-beautiful-cute-cheerful-260nw-666258808.jpg"
            width="200px"
            alt="portrait"
          />
          <div className="mainSummary">
            <h2 className="positionTitle">{props.position || "Position"}</h2>
            <h2 className="fullName">
              {props.firstname} {props.lastname}
            </h2>
            <p>{props.summary || "Add a summary about yourself!"}</p>
          </div>
        </div>
        <div className="profileContact">
          <div className="profileContactSec">
            <i className="fas fa-at"></i>
            <h5 className="userEmail"> {props.email}</h5>
          </div>
          <div className="profileContactSec">
            <i className="fas fa-map-marker-alt"></i>
            <h5 className="userLocation">
              {" "}
              {props.location || "Add location"}
            </h5>
          </div>
          <div className="profileContactSec">
            <i className="fab fa-pagelines"></i>
            <h5 className="age">{props.age || "Add age"} Years Old</h5>
          </div>
        </div>
      </div>

      <button
        className={visibleProfile ? "exOut" : "updateProfile"}
        onClick={showProfileForm}
      >
        <i
          className={visibleProfile ? "fas fa-times" : "fas fa-pencil-alt"}
        ></i>
      </button>
      <Modal visible={visibleProfile}>
        <ProfileForm initialValues={initialValues} />
      </Modal>
    </div>
  );
}

// passes the user state from redux into component state

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    age: state.user.age,
    location: state.user.location,
    position: state.user.position,
    summary: state.user.summary
  };
};

export default connect(mapStateToProps, null)(Profile);
