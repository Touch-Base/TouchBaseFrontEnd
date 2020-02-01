import React, { Component } from 'react';
import Error from '../helpers/Error';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { Formik } from 'formik';
import { loginUser } from '../../actions/index';
import * as Yup from 'yup';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {}
    }
    
    //  This validation schema comes from the Yup library, it checks
    //  the Formik values to make sure everything entered suits the database
    //  and that the passwords match

    validationSchema = Yup.object().shape({
        email: Yup.string()
        .email("Must be a valid email address")
        .required("Must enter an email"),
        password: Yup.string()
        .min(8, "Password must be 8 characters or longer")
        .required("Password is required")
    })


    render() {
        return(
        <div className="login">
            <h1>LOGIN</h1>
            <a className="loginLink" href="/register">Don't have an account?</a>
            {/* These initial values make up the values necessary to complete the form,
            we update these values using Formik properties. */}

            <Formik 
                initialValues={{ 
                    email: '', 
                    password: ''
                }} 
                    validationSchema={this.validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);

                        const { email, password } = values;

                        this.props.loginUser({
                        "email": email,
                        "password": password
                    })
                    // successful login prompts to main page 

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
                            <input 
                            type="email" 
                            id="email" 
                            placeholder="EMAIL *" 
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur} 
                            className={touched.email && errors.email ? "hasError" : "validInput"}
                            />
                            <Error touched={touched.email} message={errors.email} />
                            <input 
                            type="password" 
                            id="password" 
                            placeholder="PASSWORD *" 
                            name="password"
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur} 
                            className={touched.password && errors.password ? "hasError" : "validInput"}
                            />
                            <Error touched={touched.password} message={errors.password} />
                            <button type="submit" disabled={isSubmitting}>LOGIN</button>
                        </form>
                )}
        </Formik>
        </div>
        )
    }
}

const mapDispatchToProps = {
    loginUser: loginUser
  }
  
  export default(
    connect(
        null,
        mapDispatchToProps
    )(Login)
  );
