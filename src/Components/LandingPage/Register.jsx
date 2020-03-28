import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../helpers/Error";
import { registerUser } from "../../actions/index";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import "../../Styling/register.scss";
import { motion, AnimatePresence } from "framer-motion";

function Register(props) {
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
      [Yup.ref("password"), null],
      "Passwords must match"
    )
  });

  // variants for animations
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delay: 0.5
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        delay: 0.5
      }
    }
  };

  // This is the Sign Up form, using Formik
  return (
    <motion.div
      key="test"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={list}
      className="register"
    >
      <h1>SIGN UP</h1>
      <a className="loginLink" href="/login">
        Already have an account?
      </a>
      {/* These initial values make up the values necessary to complete the form,
      we update these values using Formik properties. */}

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          const { firstName, lastName, email, password } = values;

          props
            .registerUser({
              firstname: firstName,
              lastname: lastName,
              email: email,
              password: password
            })
            // successful register prompts to main page

            .then(() => {
              navigate("/dashboard/");
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
                  className={
                    touched.firstName && errors.firstName
                      ? "hasError"
                      : "validInput"
                  }
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
                  className={
                    touched.lastName && errors.lastName
                      ? "hasError"
                      : "validInput"
                  }
                />
                <Error touched={touched.lastName} message={errors.lastName} />
              </div>
            </div>
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
            <input
              type="password"
              id="confirmPassword"
              placeholder="CONFIRM PASSWORD *"
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword}
              onBlur={handleBlur}
              className={
                touched.confirmPassword && errors.confirmPassword
                  ? "hasError"
                  : "validInput"
              }
            />
            <Error
              touched={touched.confirmPassword}
              message={errors.confirmPassword}
            />
            <button type="submit" disabled={isSubmitting}>
              REGISTER
            </button>
          </form>
        )}
      </Formik>
    </motion.div>
  );
}

const mapDispatchToProps = {
  registerUser: registerUser
};

export default connect(null, mapDispatchToProps)(Register);
