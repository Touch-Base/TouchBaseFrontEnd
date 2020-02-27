import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/profile.scss'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../helpers/Error';
import { updateUser } from '../../actions/index';

function ProfileForm(props) {

//  This validation schema comes from the Yup library, it checks
//  the Formik values to make sure everything entered suits the database
//  and that the passwords match

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
        .min(1, "Must have a character")
        .max(20, "Must be shorter than 20")
        .required("Must enter a first name"),
        lastname: Yup.string()
        .min(1, "Must have a character")
        .max(20, "Must be shorter than 20")
        .required("Must enter a last name"),
        email: Yup.string()
        .email("Must be a valid email address")
        .required("Must enter an email"),
        location: Yup.string()
        .max(20, "Must be shorter than 20"),
        position: Yup.string()
        .max(30, "Must be shorter than 30"),
        summary: Yup.string()
        .max(1000, "Must be under 1000 characters.")
        })

    return(
        <div className="profileForm">
  
            
    {/* These initial values make up the values necessary to complete the form,
      we update these values using Formik properties. */}

      <Formik 
        enableReinitialize
        initialValues={props.initialValues} 
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);

          const { firstname, lastname, email, age, location, position, summary } = values;
          const headers = {
            Authorization: localStorage.getItem('token'),
          }

          console.log(values);

          props.updateUser({
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
            console.log("updated!")
              
        })
        .catch((err) => {
            console.error("Here", err)
        })
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
              
              {/* FIRST NAME INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="firstname" 
                  placeholder={props.firstname}
                  name="firstname"
                  onChange={handleChange}
                  value={values.firstname}
                  onBlur={handleBlur} 
                  className={(touched.firstname && errors.firstname) ? "hasError" : "validInput"}
                />
                <Error touched={touched.firstname} message={errors.firstname} />
              </div>
              
              {/* LAST NAME INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="lastname" 
                  placeholder={props.lastname}
                  name="lastname"
                  onChange={handleChange}
                  value={values.lastname}
                  onBlur={handleBlur} 
                  className={(touched.lastname && errors.lastname) ? "hasError" : "validInput"}
                />
                <Error touched={touched.lastname} message={errors.lastname} />
              </div>

              {/* EMAIL INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="email" 
                  placeholder={props.email}
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur} 
                  className={(touched.email && errors.email) ? "hasError" : "validInput"}
                />
                <Error touched={touched.email} message={errors.email} />
              </div>

              {/* AGE INPUT */}
              <div className="userInput">
                <input 
                  type="integer" 
                  id="age" 
                  placeholder={props.age}
                  name="age"
                  onChange={handleChange}
                  value={values.age}
                  onBlur={handleBlur} 
                  className={(touched.age && errors.age) ? "hasError" : "validInput"}
                />
                <Error touched={touched.age} message={errors.age} />
              </div>

              {/* LOCATION INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="location" 
                  placeholder={props.location}
                  name="location"
                  onChange={handleChange}
                  value={values.location}
                  onBlur={handleBlur} 
                  className={(touched.location && errors.location) ? "hasError" : "validInput"}
                />
                <Error touched={touched.location} message={errors.location} />
              </div>

              {/* POSITION INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="position" 
                  placeholder={props.position}
                  name="position"
                  onChange={handleChange}
                  value={values.position}
                  onBlur={handleBlur} 
                  className={(touched.position && errors.position) ? "hasError" : "validInput"}
                />
                <Error touched={touched.position} message={errors.position} />
              </div>

              {/* SUMMARY INPUT */}
              <div className="userInput">
                <input 
                  type="text" 
                  id="summary" 
                  placeholder={props.summary}
                  name="summary"
                  onChange={handleChange}
                  value={values.summary}
                  onBlur={handleBlur} 
                  className={(touched.summary && errors.summary) ? "hasError" : "validInput"}
                />
                <Error touched={touched.summary} message={errors.summary} />
              </div>


              <button type="submit">UPDATE USER</button>
          </form>
        )}
      </Formik>
    </div>
        )
    }

// passes the user update action from redux into component state

const mapDispatchToProps = {
    updateUser: updateUser
}
  
  export default(
    connect(
        null,
        mapDispatchToProps
    )(ProfileForm)
  );