import React, { useState } from "react";
import { connect } from "react-redux";
import "../../../Styling/dashboard/profile.scss";
import "../../../Styling/dashboard/mobile/overviewMobile.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../Helpers/Error";
import { updateUser } from "../../../actions/index";
import Loader from "../../Helpers/Loader";

function ProfileForm(props) {
  //  This validation schema comes from the Yup library, it checks
  //  the Formik values to make sure everything entered suits the database
  //  and that the passwords match

  // this is the loader
  const [loading, isLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(1, "Must have a character")
      .max(12, "Must be shorter than 12")
      .required("Must enter a first name"),
    lastname: Yup.string()
      .min(1, "Must have a character")
      .max(12, "Must be shorter than 12")
      .required("Must enter a last name"),
    phone: Yup.string().max(13, "Must be shorter than 13"),
    location: Yup.string()
      .max(20, "Must be shorter than 20")
      .nullable(),
    position: Yup.string()
      .max(15, "Must be shorter than 15")
      .nullable(),
    age: Yup.string()
      .max(2, "Must be 2 digits")
      .nullable(),
    summary: Yup.string()
      .max(300, "Must be under 300 characters.")
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
            age,
            location,
            phone,
            position,
            summary
          } = values;
          const headers = {
            Authorization: localStorage.getItem("token")
          };

          props
            .updateUser(
              {
                firstname: firstname || null,
                lastname: lastname || null,
                age: age || null,
                location: location || null,
                summary: summary || null,
                position: position || null,
                phone: phone || null
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
              {/* PHONE NUMBER INPUT */}
              <div className="userInput">
                <input
                  type="text"
                  id="phonenumber"
                  placeholder={props.phone || "Phone"}
                  name="phone"
                  onChange={handleChange}
                  value={values.phone || ""}
                  onBlur={handleBlur}
                  className={
                    touched.phone && errors.phone ? "hasError" : "validInput"
                  }
                />
                <Error touched={touched.phone} message={errors.phone} />
              </div>

              {/* AGE INPUT */}
              <div className="userInput">
                <input
                  type="integer"
                  id="age"
                  placeholder={props.age || "Age"}
                  name="age"
                  onChange={handleChange}
                  value={values.age || ""}
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
                  value={values.location || ""}
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
                  value={values.position || ""}
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
                  value={values.summary || ""}
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
