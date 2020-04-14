import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../Helpers/Error";
import "../../../Styling/dashboard/networking/networking.scss";
import { addConnection, editConnection } from "../../../actions/index";
import Loader from "../../Helpers/Loader";

function ConnectionForm(props) {
  //  This validation schema comes from the Yup library, it checks
  //  the Formik values to make sure everything entered suits the database
  //  and that the passwords match

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(1, "Must have a character")
      .max(12, "Must be shorter than 12")
      .required("Must enter a first name"),
    lastname: Yup.string()
      .min(1, "Must have a character")
      .max(12, "Must be shorter than 12")
      .required("Must enter a last name"),
    title: Yup.string()
      .min(1, "Must have a character")
      .max(20, "Must be shorter than 20")
      .required("Must enter a title"),
    company: Yup.string()
      .min(1, "Must have a character")
      .max(20, "Must be shorter than 20")
      .required("Must enter a company"),
    phone: Yup.string()
      .max(10, "Must be shorter than 10")
      .nullable(),
    email: Yup.string()
      .max(32, "Must be shorter than 32")
      .nullable(),
    notes: Yup.string()
      .max(300, "Must be under 300 characters.")
      .nullable()
  });

  // this is the loader
  const [loading, isLoading] = useState(false);

  return (
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        /// this checks to see if the form is updating or adding a connection
        const {
          firstname,
          lastname,
          title,
          company,
          phone,
          email,
          notes
        } = values;

        // payload for adding a connection
        const addPayload = {
          firstname: firstname,
          lastname: lastname,
          title: title,
          company: company,
          phone: phone,
          email: email,
          notes: notes
        };

        // payload for updating a connection
        const editPayload = {
          ...addPayload,
          id: props.id
        };

        // add connection function
        if (props.addingCnx) {
          isLoading(true);
          props
            .addConnection(addPayload)
            .then(() => {
              isLoading(false);
              console.log("added connection!");
            })
            .catch(err => {
              console.error(err);
            });

          // update connection
        } else {
          isLoading(true);
          props
            .editConnection(editPayload)
            .then(() => {
              isLoading(false);
              console.log("updated connection!");
            })
            .catch(err => {
              console.error(err);
            });
        }
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
        <form onSubmit={handleSubmit}>
          <Loader loading={loading} />
          <div className="inputCnxBlocks">
            <div className="cnxNameAndTitle">
              {/* FIRSTNAME INPUT */}
              <div className="connectionInput">
                {props.editing ? <h3>First Name</h3> : null}
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  onChange={handleChange}
                  value={values.firstname}
                  onBlur={handleBlur}
                  className={
                    touched.firstname && errors.firstname
                      ? "cnxError"
                      : "validInput"
                  }
                />
                <Error
                  network={true}
                  touched={touched.firstname}
                  message={errors.firstname}
                />
              </div>

              {/* LASTNAME INPUT */}
              <div className="connectionInput">
                {props.editing ? <h3>Last Name</h3> : null}
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  onChange={handleChange}
                  value={values.lastname}
                  onBlur={handleBlur}
                  className={
                    touched.lastname && errors.lastname
                      ? "cnxError"
                      : "validInput"
                  }
                />
                <Error
                  network={true}
                  touched={touched.lastname}
                  message={errors.lastname}
                />
              </div>

              {/* TITLE INPUT */}
              <div className="connectionInput">
                {props.editing ? <h3>Title</h3> : null}
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                  onBlur={handleBlur}
                  className={
                    touched.title && errors.title ? "cnxError" : "validInput"
                  }
                />
                <Error
                  network={true}
                  touched={touched.title}
                  message={errors.title}
                />
              </div>
            </div>

            <div className="cnxCompanyAndContact">
              {/* COMPANY INPUT */}
              <div className="connectionInput">
                {props.editing ? <h3>Company</h3> : null}
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  onChange={handleChange}
                  value={values.company}
                  onBlur={handleBlur}
                  className={
                    touched.company && errors.company
                      ? "cnxError"
                      : "validInput"
                  }
                />
                <Error
                  network={true}
                  touched={touched.company}
                  message={errors.company}
                />
              </div>

              {/* PHONE INPUT */}
              <div className="connectionInput">
                {props.editing ? <h3>Phone</h3> : null}
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                  onBlur={handleBlur}
                  className={
                    touched.phone && errors.phone ? "cnxError" : "validInput"
                  }
                />
                <Error
                  network={true}
                  touched={touched.phone}
                  message={errors.phone}
                />
              </div>

              {/* EMAIL INPUT */}
              <div className="connectionInput">
                {props.editing ? <h3>Email</h3> : null}
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  className={
                    touched.email && errors.email ? "cnxError" : "validInput"
                  }
                />
                <Error
                  network={true}
                  touched={touched.email}
                  message={errors.email}
                />
              </div>
            </div>
          </div>

          {/* NOTES INPUT */}
          <div className="notesArea">
            {props.editing ? <h3>Notes</h3> : null}
            <textarea
              type="text"
              placeholder="Notes"
              name="notes"
              onChange={handleChange}
              value={values.notes}
              onBlur={handleBlur}
              className={
                touched.notes && errors.notes ? "cnxError" : "validInput"
              }
            />
            <Error
              network={true}
              touched={touched.notes}
              message={errors.notes}
            />
          </div>
          {/* button switch for either adding or editing */}
          {props.addingCnx ? (
            <button className="cnxAdd" type="submit">
              ADD CONNECTION
            </button>
          ) : (
            <button className="updateCnxButton" type="submit">
              UPDATE
            </button>
          )}
        </form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = {
  addConnection: addConnection,
  editConnection: editConnection
};

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    connections: state.user.connections
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionForm);
