import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../Helpers/Error";
import "../../../Styling/dashboard/events/events.scss";
import "../../../Styling/dashboard/events/eventform.scss";
import { addEvent, editEvent } from "../../../actions/index";
import Loader from "../../Helpers/Loader";

function EventForm(props) {
  //  This validation schema comes from the Yup library, it checks
  //  the Formik values to make sure everything entered suits the database
  //  and that the passwords match

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Must have a character")
      .max(20, "Must be shorter than 20")
      .required("Must enter a name"),
    location: Yup.string()
      .min(1, "Must have a character")
      .max(15, "Must be shorter than 15")
      .required("Must enter a location"),
    date: Yup.string()
      .min(1, "Must have a character")
      .required("Must enter a date"),
    time: Yup.string()
      .min(1, "Must have a character")
      .required("Must enter a time"),
    description: Yup.string()
      .max(400, "Must be under 400 characters.")
      .nullable(),
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

        const { name, location, date, description, attended, time } = values;

        /// this is the payload for adding an event
        const addPayload = {
          name: name,
          location: location,
          date: date,
          description: description,
          attended: attended,
          time: time,
        };

        /// this is the payload for editing an event
        const editPayload = {
          ...addPayload,
          id: props.id,
        };
        if (props.addingEvt) {
          isLoading(true);
          console.log(addPayload);
          props
            .addEvent(addPayload)
            .then(() => {
              isLoading(false);
            })
            .catch((err) => {
              console.error("Here", err);
            });
        } else {
          isLoading(true);
          props
            .editEvent(editPayload)
            .then(() => {
              isLoading(false);
            })
            .catch((err) => {
              console.error("Here", err);
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
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="updateEventForm">
          <Loader loading={loading} />
          {/* NAME INPUT */}
          <div className="eventInput">
            <input
              type="text"
              placeholder="Event Name"
              name="name"
              onChange={handleChange}
              value={values.name}
              onBlur={handleBlur}
              className={
                touched.name && errors.name ? "hasError" : "validInput"
              }
            />
            <Error event={true} touched={touched.name} message={errors.name} />
          </div>

          {/* LOCATION INPUT */}
          <div className="eventInput">
            <input
              type="text"
              placeholder="Location"
              name="location"
              onChange={handleChange}
              value={values.location}
              onBlur={handleBlur}
              className={
                touched.location && errors.location ? "hasError" : "validInput"
              }
            />
            <Error
              event={true}
              touched={touched.location}
              message={errors.location}
            />
          </div>

          {/* DATE INPUT */}
          <div className="eventInput">
            <input
              type="date"
              data-date=""
              data-date-format="DD MMMM YYYY"
              placeholder="Date"
              name="date"
              onChange={handleChange}
              value={values.date.slice(0, 10)}
              onBlur={handleBlur}
              className={
                touched.date && errors.date ? "hasError" : "validInput"
              }
            />
            <Error event={true} touched={touched.date} message={errors.date} />
          </div>

          {/* TIME INPUT */}
          <div className="timeInput">
            <label>Time</label>
            <input
              type="time"
              placeholder="Time"
              name="time"
              onChange={handleChange}
              value={values.time}
              onBlur={handleBlur}
              className={
                touched.time && errors.time ? "hasError" : "validInput"
              }
            />
            <Error event={true} touched={touched.time} message={errors.time} />
          </div>

          {/* DESCRIPTION INPUT */}
          <div className="eventInput">
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={values.description}
              onBlur={handleBlur}
              className={
                touched.description && errors.description
                  ? "hasError"
                  : "validInput"
              }
            />
            <Error
              event={true}
              touched={touched.description}
              message={errors.description}
            />
          </div>

          <button
            className={props.addingEvt ? "evtAdd" : "updateEvtButton"}
            type="submit"
          >
            {props.addingEvt ? "ADD EVENT" : "UPDATE EVENT"}
          </button>
        </form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = {
  addEvent: addEvent,
  editEvent: editEvent,
};

const mapStateToProps = (state) => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    events: state.user.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
