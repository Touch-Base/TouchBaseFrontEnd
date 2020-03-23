import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../helpers/Error";
import "../../Styling/dashboard/jobs.scss";
import { addJob, editJob } from "../../actions/index";

function JobForm(props) {
  /// this sets up the interview switch button since it is not handled within Formik
  const [interview, setInterview] = useState(props.initialValues.interview);

  const interviewSwitch = event => {
    event.preventDefault();

    setInterview(!interview);
  };

  //  This validation schema comes from the Yup library, it checks
  //  the Formik values to make sure everything entered suits the database
  //  and that the passwords match

  const validationSchema = Yup.object().shape({
    position: Yup.string()
      .min(1, "Must have a character")
      .max(20, "Must be shorter than 20")
      .required("Must enter a company"),
    company: Yup.string()
      .min(1, "Must have a character")
      .max(20, "Must be shorter than 20")
      .required("Must enter a company"),
    link: Yup.string()
      .min(1, "Must have a character")
      .max(20, "Must be shorter than 20"),
    appDate: Yup.string()
      .min(1, "Must have a character")
      .max(20, "Must be shorter than 20"),
    notes: Yup.string().max(400, "Must be under 400 characters.")
  });

  return (
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        const { position, company, link, method, appDate, notes } = values;

        // payload for adding a job
        const addPayload = {
          position: position,
          company: company,
          link: link,
          method: method,
          appDate: appDate,
          notes: notes,
          interview: interview
        };

        // payload for updating a job
        const editPayload = {
          ...addPayload,
          id: props.id
        };

        /// checks if form is either adding or updating a job
        /// before submitting
        if (props.adding) {
          props
            .addJob(addPayload)

            .then(() => {
              console.log("added job!");
            })
            .catch(err => {
              console.error("Here", err);
            });
        } else {
          props
            .editJob(editPayload)

            .then(() => {
              console.log("updated job!");
            })
            .catch(err => {
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
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          {/* POSITION INPUT */}
          <div className="positionAndCompany">
            <div className="position">
              <h4 className="inputTitle">
                {!props.adding ? "Position" : null}
              </h4>
              <input
                type="text"
                placeholder="Position"
                name="position"
                onChange={handleChange}
                value={values.position}
                onBlur={handleBlur}
                className={
                  touched.position && errors.position
                    ? "jobError"
                    : "validInput"
                }
              />
              <Error touched={touched.position} message={errors.position} />
            </div>
            {/* COMPANY INPUT */}
            <div className="company">
              <h4 className="inputTitle">{!props.adding ? "Company" : null}</h4>
              <input
                type="text"
                placeholder="Company"
                name="company"
                onChange={handleChange}
                value={values.company}
                onBlur={handleBlur}
                className={
                  touched.company && errors.company ? "jobError" : "validInput"
                }
              />
              <Error touched={touched.company} message={errors.company} />
            </div>
          </div>

          {/* LINK INPUT */}
          <div className="linkAndDate">
            <div className="joblink">
              <h4 className="inputTitle">
                {!props.adding ? "Posting Link" : null}
              </h4>
              <input
                type="text"
                placeholder="Link"
                name="link"
                onChange={handleChange}
                value={values.link}
                onBlur={handleBlur}
                className={
                  touched.link && errors.link ? "jobError" : "validInput"
                }
              />
              <Error touched={touched.link} message={errors.link} />
            </div>

            {/* APP DATE INPUT */}
            <div className="appDate">
              <h4 className="inputTitle">
                {!props.adding ? "Application Date" : null}
              </h4>
              <input
                type="text"
                id="appDate"
                placeholder="Application Date"
                name="appDate"
                onChange={handleChange}
                value={values.appDate}
                onBlur={handleBlur}
                className={
                  touched.appDate && errors.appDate ? "hasError" : "validInput"
                }
              />
              <Error touched={touched.appDate} message={errors.appDate} />
            </div>
          </div>

          {/* METHOD INPUT */}
          <div className="methodAndInterview">
            <div className="method">
              <h4 className="inputTitle">Method</h4>
              <select
                name="method"
                value={values.method}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" label="Select a method" />
                <option value="LinkedIn" label="LinkedIn" />
                <option value="Connection" label="Connection" />
                <option value="Job Website" label="Job Website" />
                <option value="Company Site" label="Company Site" />
                <option value="Other" label="Other" />
              </select>
              {errors.method && touched.method && (
                <div className="input-feedback">{errors.method}</div>
              )}
            </div>

            {/* INTERVIEW INPUT/ HANDLED USING HOOKS NOT FORMIK*/}
            <div className="interview">
              <button
                type="button"
                className={interview ? "interviewButton" : "noInterviewButton"}
                onClick={interviewSwitch}
              >
                {interview ? "INTERVIEW" : "NO INTERVIEW"}
              </button>
            </div>
          </div>

          {/* NOTES INPUT */}
          <div className="jobInput">
            <h4 className="inputTitle" id="notesTitle">
              {!props.adding ? "Notes" : null}
            </h4>
            <textarea
              rows="7"
              cols="60"
              type="text"
              placeholder="Notes"
              name="notes"
              onChange={handleChange}
              value={values.notes}
              onBlur={handleBlur}
              className={
                touched.notes && errors.notes ? "jobError" : "validInput"
              }
            />
            <Error touched={touched.notes} message={errors.notes} />
          </div>

          {/* this button checks if it is adding a job or updating one */}
          <button
            className={props.adding ? "addButton" : "updateButton"}
            type="submit"
          >
            {props.adding ? "ADD JOB" : "UPDATE JOB"}
          </button>
        </form>
      )}
    </Formik>
  );
}

const mapDispatchToProps = {
  addJob: addJob,
  editJob: editJob
};

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    jobs: state.user.jobs
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobForm);
