import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/profile.scss'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../helpers/Error';

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

//  This validation schema comes from the Yup library, it checks
//  the Formik values to make sure everything entered suits the database
//  and that the passwords match

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
        .min(1, "Must have a character")
        .max(20, "Must be shorter than 20")
        .required("Must enter a first name"),
        lastName: Yup.string()
        .min(1, "Must have a character")
        .max(20, "Must be shorter than 20")
        .required("Must enter a last name"),
        email: Yup.string()
        .email("Must be a valid email address")
        .required("Must enter an email"),
        password: Yup.string()
        .min(8, "Password must be 8 characters or longer")
        .required("Password is required"),
        confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
        )
    })
        
    const [user, setUser] = useState(dummyUser);
    
    const changeHandler = (event) => {
        event.preventDefault();
        
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    
    const updateProfile = (event) => {
        event.preventDefault();
    }

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
            
    {/* These initial values make up the values necessary to complete the form,
      we update these values using Formik properties. */}

      <Formik 
        initialValues={{ 
          firstName: '', 
          lastName: '', 
          email: '', 
          password: '', 
          confirmPassword: '' 
        }} 
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);

          const { firstName, lastName, email, password } = values;

          this.props.registerUser({
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "password": password
        })
        // successful register prompts to main page 

        .then(() => {
            navigate('/dashboard/');
              
        })
        .catch((err) => {
            console.error(err)
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
          <form onSubmit={handleSubmit} className="registerForm">
            <div className="firstLast">
              <div className="oneInput">
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder="FIRST NAME *" 
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur} 
                  className={(touched.firstName && errors.firstName) ? "hasError" : "validInput"}
                />
                <Error touched={touched.firstName} message={errors.firstName} />
              </div>
              <div className="oneInput">
                <input 
                  type="text" 
                  id="lastName" 
                  placeholder="LAST NAME *" 
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  onBlur={handleBlur} 
                  className={touched.lastName && errors.lastName ? "hasError" : "validInput"}
                />
                <Error touched={touched.lastName} message={errors.lastName} />
              </div>
              <button type="submit" disabled={isSubmitting}>REGISTER</button>
              </div>
          </form>
        )}
      </Formik>
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
