import React, { useState } from "react";
import { connect } from "react-redux";
import "../../Styling/dashboard/profile.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../helpers/Error";
import { updateUser } from "../../actions/index";
import Loader from "./Loader";

function ProfileForm(props) {
  //  This validation schema comes from the Yup library, it checks
  //  the Formik values to make sure everything entered suits the database
  //  and that the passwords match

  // this is the loader
  const [loading, isLoading] = useState(false);

  // this is error state
  const [error, setError] = useState(false);

  // this closes the error
  const exOut = event => {
    event.preventDefault();

    setError(false);
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(1, "Must have a character")
      .max(12, "Must be shorter than 12")
      .required("Must enter a first name"),
    lastname: Yup.string()
      .min(1, "Must have a character")
      .max(12, "Must be shorter than 12")
      .required("Must enter a last name"),
    email: Yup.string()
      .email("Must be a valid email address")
      .max(30, "Must be shorter than 30")
      .required("Must enter an email"),
    location: Yup.string()
      .max(20, "Must be shorter than 20")
      .nullable(),
    position: Yup.string()
      .max(180, "Must be shorter than 18")
      .nullable(),
    age: Yup.string()
      .max(2, "Must be 2 digits")
      .nullable(),
    summary: Yup.string()
      .max(225, "Must be under 225 characters.")
      .nullable()
  });

  return (
    <div className="profileForm">
      <h1 className="editProfileTitle">UPDATE PROFILE</h1>

      {/* These initial values make up the values necessary to complete the form,
      we update these values using Formik properties. */}

      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          isLoading(true);

          const {
            firstname,
            lastname,
            email,
            age,
            location,
            position,
            summary
          } = values;
          const headers = {
            Authorization: localStorage.getItem("token")
          };

          props
            .updateUser(
              {
                firstname: firstname,
                lastname: lastname,
                email: email,
                age: age,
                location: location,
                summary: summary,
                position: position
              },
              headers
            )

            // successful user update
            .then(() => {
              console.log("Updated user!", props);
              isLoading(false);
            })
            .catch(err => {
              console.error("Error:", err);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} className="updateUserForm">
            <div className="inputSec">
              {/* FIRST NAME INPUT */}
              <div className="userInput">
                <input
                  type="text"
                  id="firstname"
                  placeholder={props.firstname || "First Name"}
                  name="firstname"
                  onChange={handleChange}
                  value={values.firstname}
                  onBlur={handleBlur}
                  className={
                    touched.firstname && errors.firstname
                      ? "hasError"
                      : "validInput"
                  }
                />
                <Error touched={touched.firstname} message={errors.firstname} />
              </div>

              {/* LAST NAME INPUT */}
              <div className="userInput">
                <input
                  type="text"
                  id="lastname"
                  placeholder={props.lastname || "Last Name"}
                  name="lastname"
                  onChange={handleChange}
                  value={values.lastname}
                  onBlur={handleBlur}
                  className={
                    touched.lastname && errors.lastname
                      ? "hasError"
                      : "validInput"
                  }
                />
                <Error touched={touched.lastname} message={errors.lastname} />
              </div>
            </div>

            <div className="inputSec">
              {/* EMAIL INPUT */}
              <div className="userInput">
                <input
                  type="text"
                  id="email"
                  placeholder={props.email || "Email"}
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  className={
                    touched.email && errors.email ? "hasError" : "validInput"
                  }
                />
                <Error touched={touched.email} message={errors.email} />
              </div>

              {/* AGE INPUT */}
              <div className="userInput">
                <input
                  type="integer"
                  id="age"
                  placeholder={props.age || "Age"}
                  name="age"
                  onChange={handleChange}
                  value={values.age}
                  onBlur={handleBlur}
                  className={
                    touched.age && errors.age ? "hasError" : "validInput"
                  }
                />
                <Error touched={touched.age} message={errors.age} />
              </div>
            </div>

            <div className="inputSec">
              {/* LOCATION INPUT */}
              <div className="userInput">
                <input
                  type="text"
                  id="location"
                  placeholder={props.location || "Location"}
                  name="location"
                  onChange={handleChange}
                  value={values.location}
                  onBlur={handleBlur}
                  className={
                    touched.location && errors.location
                      ? "hasError"
                      : "validInput"
                  }
                />
                <Error touched={touched.location} message={errors.location} />
              </div>

              {/* POSITION INPUT */}
              <div className="userInput">
                <input
                  type="text"
                  id="position"
                  placeholder={props.position || "Position"}
                  name="position"
                  onChange={handleChange}
                  value={values.position}
                  onBlur={handleBlur}
                  className={
                    touched.position && errors.position
                      ? "hasError"
                      : "validInput"
                  }
                />
                <Error touched={touched.position} message={errors.position} />
              </div>
            </div>

            <div className="inputSec">
              {/* SUMMARY INPUT */}
              <div className="userInput">
                <textarea
                  type="text"
                  id="summary"
                  placeholder={props.summary || "Add a summary!"}
                  name="summary"
                  onChange={handleChange}
                  value={values.summary}
                  onBlur={handleBlur}
                  className={
                    touched.summary && errors.summary
                      ? "hasError"
                      : "validInput"
                  }
                />
                <Error touched={touched.summary} message={errors.summary} />
              </div>
            </div>
            <Loader loading={loading} />
            <Error visible={error} exOut={exOut} />
            <button type="submit">UPDATE</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

// passes the user update action from redux into component state

const mapDispatchToProps = {
  updateUser: updateUser
};

export default connect(null, mapDispatchToProps)(ProfileForm);
