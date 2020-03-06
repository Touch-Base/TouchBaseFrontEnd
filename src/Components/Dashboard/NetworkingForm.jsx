import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../helpers/Error';
import '../../Styling/dashboard/networking.scss';
import { addConnection } from '../../actions/index';

function ConnectionForm(props) {

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
    title: Yup.string()
    .min(1, "Must have a character")
    .max(20, "Must be shorter than 20")
    .required("Must enter a title"),
    company: Yup.string()
    .min(1, "Must have a character")
    .max(20, "Must be shorter than 20")
    .required("Must enter a company"),
    phone: Yup.string()
    .max(20, "Must be shorter than 20"),
    email: Yup.string()
    .max(20, "Must be shorter than 20"),
    notes: Yup.string()
    .max(1000, "Must be under 1000 characters.")
    })

    return (
        <Formik 
        enableReinitialize
        initialValues={props.initialValues} 
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);

          const { firstname, lastname, title, company, phone, email, notes } = values;

          props.addConnection({
                firstname: firstname,
                lastname: lastname,
                title: title,
                company: company,
                phone: phone,
                email: email,
                notes: notes
            }
        )
        .then(() => {
            console.log("added connection!")
              
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
          <form onSubmit={handleSubmit}>
              
              {/* FIRSTNAME INPUT */}
              <div className="connectionInput">
                <input 
                  type="text" 
                  id="firstname" 
                  placeholder="First Name"
                  name="firstname"
                  onChange={handleChange}
                  value={values.firstname}
                  onBlur={handleBlur} 
                  className={(touched.firstname && errors.firstname) ? "hasError" : "validInput"}
                />
                <Error touched={touched.firstname} message={errors.firstname} />
              </div>
              
              {/* LASTNAME INPUT */}
              <div className="connectionInput">
                <input 
                  type="text" 
                  id="lastname" 
                  placeholder="Last Name"
                  name="lastname"
                  onChange={handleChange}
                  value={values.lastname}
                  onBlur={handleBlur} 
                  className={(touched.lastname && errors.lastname) ? "hasError" : "validInput"}
                />
                <Error touched={touched.lastname} message={errors.lastname} />
              </div>

              {/* TITLE INPUT */}
              <div className="connectionInput">
                <input 
                  type="text" 
                  id="title" 
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                  onBlur={handleBlur} 
                  className={(touched.title && errors.title) ? "hasError" : "validInput"}
                />
                <Error touched={touched.title} message={errors.title} />
              </div>

              {/* COMPANY INPUT */}
              <div className="connectionInput">
                <input 
                  type="text" 
                  id="company" 
                  placeholder="Company"
                  name="company"
                  onChange={handleChange}
                  value={values.company}
                  onBlur={handleBlur} 
                  className={(touched.company && errors.company) ? "hasError" : "validInput"}
                />
                <Error touched={touched.company} message={errors.company} />
              </div>

              {/* PHONE INPUT */}
              <div className="connectionInput">
                <input 
                  type="text" 
                  id="phone" 
                  placeholder="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                  onBlur={handleBlur} 
                  className={(touched.phone && errors.phone) ? "hasError" : "validInput"}
                />
                <Error touched={touched.phone} message={errors.phone} />
              </div>

              {/* EMAIL INPUT */}
              <div className="connectionInput">
                <input 
                  type="text" 
                  id="email" 
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur} 
                  className={(touched.email && errors.email) ? "hasError" : "validInput"}
                />
                <Error touched={touched.email} message={errors.email} />
              </div>

              {/* NOTES INPUT */}
              <div className="connectionInput">
                <input 
                  type="text" 
                  id="notes" 
                  placeholder="Notes"
                  name="notes"
                  onChange={handleChange}
                  value={values.notes}
                  onBlur={handleBlur} 
                  className={(touched.notes && errors.notes) ? "hasError" : "validInput"}
                />
                <Error touched={touched.notes} message={errors.notes} />
              </div>


              <button type="submit">ADD CONNECTION</button>
          </form>
        )}
      </Formik>
    )
}

const mapDispatchToProps = {
    addConnection: addConnection
}


const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        connections: state.user.connections
    }
  }

export default(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ConnectionForm)
  );
