import React from "react";

import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

const ValidatedLoginForm = () => (
  <Formik
  validate={values => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!EmailValidator.validate(values.email)) {
      errors.email = "Invalid email address.";
    }

    const passwordRegex = /(?=.*[0-9])/;
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters long.";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Invalid password. Must contain one number.";
    }

    return errors;
  }}
  validationSchema={Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Required")
  })}
  validationSchema={Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
  })}

                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    console.log("Logging in", values);
                    setSubmitting(false);
                }, 500);
                }}
            >
  {props => { const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

      return (
          <> 
          <div className="container"> 
          <div className="row">
              <div className="col-sm-6 offset-sm-3 border border-4">
                <div> 
                     <form className="m-5" onSubmit={handleSubmit} >

                            <label className="my-5" htmlFor="email">Email:</label>
                            <input
                            id="email"
                            name="email"
                            type="text" className="m-5"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email && "error"}
                            />
                                {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                                )}
                                <br></br>

                                <label htmlFor="password">Password:</label>
                                <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.password && touched.password && "error"}
                                />
                                {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                                )}
                                    <br></br>
                                    <button className="btn btn-primary text-center" type="submit" disabled={isSubmitting}>
                                    Login
                                    </button>


                            </form>
                        </div>
                    </div>
                </div>
             </div>
        </>
      );
    }}
  </Formik>
);

export default ValidatedLoginForm;