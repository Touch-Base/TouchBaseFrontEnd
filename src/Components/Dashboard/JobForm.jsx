import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../helpers/Error';
import '../../Styling/dashboard/jobs.scss';
import { addJob, editJob } from '../../actions/index';

function JobForm(props) {

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
    notes: Yup.string()
    .max(400, "Must be under 400 characters.")
    })

    return (
        <Formik 
        enableReinitialize
        initialValues={props.initialValues} 
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);

          const { position, company, link, method, appDate, notes, interview } = values;
          
          // payload for adding a job
          const addPayload = {
            position: position,
            company: company,
            link: link,
            method: method,
            appDate: appDate,
            notes: notes,
            interview: interview
            }
          
          // payload for updating a job
          const editPayload = {
            ...addPayload,
            id: props.id
            }
          
          /// checks if form is either adding or updating a job
          /// before submitting
          if(props.adding) {

            props.addJob(addPayload)

            .then(() => {
                console.log("added job!")
                  
            })
            .catch((err) => {
                console.error("Here", err)
            })}
          else {
            props.editJob(editPayload)
            
            .then(() => {
                console.log("updated job!")
                  
            })
            .catch((err) => {
                console.error("Here", err)
            })}
          }
        }
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
              <div className="jobInput">
                <input 
                  type="text" 
                  placeholder="Position"
                  name="position"
                  onChange={handleChange}
                  value={values.position}
                  onBlur={handleBlur} 
                  className={(touched.position && errors.position) ? "hasError" : "validInput"}
                />
                <Error touched={touched.position} message={errors.position} />
              </div>
              
              {/* COMPANY INPUT */}
              <div className="jobInput">
                <input 
                  type="text" 
                  placeholder="Company"
                  name="company"
                  onChange={handleChange}
                  value={values.company}
                  onBlur={handleBlur} 
                  className={(touched.company && errors.company) ? "hasError" : "validInput"}
                />
                <Error touched={touched.company} message={errors.company} />
              </div>

              {/* LINK INPUT */}
              <div className="jobInput">
                <input 
                  type="text" 
                  placeholder="Link"
                  name="link"
                  onChange={handleChange}
                  value={values.link}
                  onBlur={handleBlur} 
                  className={(touched.link && errors.link) ? "hasError" : "validInput"}
                />
                <Error touched={touched.link} message={errors.link} />
              </div>

              {/* METHOD INPUT */}
              <div className="jobInput">
                <label>
                    Method
                </label>
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
                {errors.method && touched.method &&
                <div className="input-feedback">{errors.method}</div>}
              </div>

              {/* APP DATE INPUT */}
              <div className="jobInput">
                <input 
                  type="text"  
                  placeholder="Application Date"
                  name="appDate"
                  onChange={handleChange}
                  value={values.appDate}
                  onBlur={handleBlur} 
                  className={(touched.appDate && errors.appDate) ? "hasError" : "validInput"}
                />
                <Error touched={touched.appDate} message={errors.appDate} />
              </div>

              {/* NOTES INPUT */}
              <div className="jobInput">
                <input 
                  type="text" 
                  placeholder="Notes"
                  name="notes"
                  onChange={handleChange}
                  value={values.notes}
                  onBlur={handleBlur} 
                  className={(touched.notes && errors.notes) ? "hasError" : "validInput"}
                />
                <Error touched={touched.notes} message={errors.notes} />
              </div>

              {/* INTERVIEW INPUT */}
              <div className="jobInput">
                <label>
                    Interview
                </label>
                <input
                    name="interview"
                    type="checkbox"
                    value={values.interview}
                    checked={values.interview}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Error touched={touched.interview} message={errors.interview} />
              </div>

              {/* this button checks if it is adding a job or updating one */}
              <button type="submit">{props.adding ? "ADD JOB" : "UPDATE JOB"}</button>
          </form>
        )}
      </Formik>
    )
}

const mapDispatchToProps = {
    addJob: addJob,
    editJob: editJob
}


const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        jobs: state.user.jobs
    }
  }

export default(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(JobForm)
  );
