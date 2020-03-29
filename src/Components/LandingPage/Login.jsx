import React, { Component } from "react";
import Error from "../../helpers/Error";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Formik } from "formik";
import {
  loginUser,
  fillStateJobs,
  fillStateEvents,
  fillStateConnections
} from "../../actions/index";
import * as Yup from "yup";
import "../../Styling/login.scss";
import { motion, AnimatePresence } from "framer-motion";

function Login(props) {
  console.log(props.history);

  //  This validation schema comes from the Yup library, it checks
  //  the Formik values to make sure everything entered suits the database
  //  and that the passwords match

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Must enter an email"),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required("Password is required")
  });

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-50%" }}
      className="register"
      className="login"
    >
      <h1>LOGIN</h1>
      <a className="loginLink" href="/register">
        Don't have an account?
      </a>
      {/* These initial values make up the values necessary to complete the form,
            we update these values using Formik properties. */}

      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const { email, password } = values;

          props
            .loginUser({
              email: email,
              password: password
            })
            // successful login prompts to main page

            .then(() => {
              props.fillStateJobs();
              props.fillStateConnections();
              props.fillStateEvents();
              props.history.push("/dashboard");
            })
            .catch(err => {
              console.error(err);
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
          <form onSubmit={handleSubmit} className="registerForm">
            <input
              type="email"
              id="email"
              placeholder="EMAIL *"
              name="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              className={
                touched.email && errors.email ? "hasError" : "validInput"
              }
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
              className={
                touched.password && errors.password ? "hasError" : "validInput"
              }
            />
            <Error touched={touched.password} message={errors.password} />
            <button type="submit" disabled={isSubmitting}>
              LOGIN
            </button>
          </form>
        )}
      </Formik>
    </motion.div>
  );
}

const mapDispatchToProps = {
  loginUser: loginUser,
  fillStateConnections: fillStateConnections,
  fillStateJobs: fillStateJobs,
  fillStateEvents: fillStateEvents
};

export default connect(null, mapDispatchToProps)(Login);
