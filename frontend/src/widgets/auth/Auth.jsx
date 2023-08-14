import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name too short!')
    .max(50, 'Name too long!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password too short!')
    .max(50, 'Password too long!')
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password too short!')
    .max(50, 'Password too long!')
    .required('Password is required')
});

const initialValuesLogin = {
  email: '',
  password: ''
};

const initialValuesRegister = {
  name: '',
  email: '',
  password: '',
  confirm_password: ''
};

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageType, setPageType] = useState('login');

  const isRegister = pageType === "register";
  const isLogin = pageType === "login";

  const handleRegister = async (values) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      setIsSubmitting(false);
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong!');
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      setSubmitting(false);
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong!');
      setSubmitting(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);

    try {
      if (isRegister) {
        await RegisterSchema.validate(values, { abortEarly: false });
        await handleRegister(values);
      } else if (isLogin) {
        await LoginSchema.validate(values, { abortEarly: false });
        await handleLogin(values);
      }

      resetForm();
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong!');
      setSubmitting(false);
    }

    setIsSubmitting(false);
    setSubmitting(false);
  }

  return (
    <>
    <div className="register-box">
  <div className="register-logo">
    <a href="../../index2.html">Shop Eye</a>
  </div>
  <div className="card">
    <div className="card-body register-card-body">
      <p className="login-box-msg">Register a new membership</p>

      <Formik
        initialValues={isRegister ? initialValuesRegister : initialValuesLogin}
        validationSchema={isRegister ? RegisterSchema : LoginSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          setFieldValue
        }) => (
      <>
      <form onSubmit={handleSubmit}>
        {isRegister && (
        <div className="input-group mb-3">
          <input 
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className={
              errors.name && touched.name
                ? 'form-control is-invalid'
                : 'form-control'
            } 
            placeholder="Full name"
          />
          {/* <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div> */}
          {errors.name && touched.name ? (
            <small id="passwordHelp" className="text-danger">
              {errors.name}
            </small>
          ) : null}
        </div>
        )}

        {/* Common fields for registration and login */}
        <div className="input-group mb-3">
          <input 
            type="text"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={
              errors.email && touched.email
                ? 'form-control is-invalid'
                : 'form-control'
            } 
            placeholder="Email"
          />
          {/* <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div> */}
          {errors.email && touched.email ? (
            <small id="passwordHelp" className="text-danger">
              {errors.email}
            </small>
          ) : null}
        </div>

        <div className="input-group mb-3">
          <input 
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={
              errors.password && touched.password
                ? 'form-control is-invalid'
                : 'form-control'
            } 
            placeholder="Password"
          />
          {/* <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div> */}
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>

        <div className="input-group mb-3">
          <input 
            type="password"
            name="confirm_password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirm_password}
            className={
              errors.confirm_password && touched.confirm_password
                ? 'form-control is-invalid'
                : 'form-control'
            } 
            placeholder="Confirm Password"
          />
          {/* <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div> */}
          {errors.confirm_password && touched.confirm_password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.confirm_password}
            </small>
          ) : null}
        </div>

        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
              <label htmlFor="agreeTerms">
                I agree to the <a href="#">terms</a>
              </label>
            </div>
          </div>
          {/* BUTTON */}
          <div className="col-4">
            <button
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >{isRegister ? "Register" : "Login"}</button>
          </div>
        </div>
      </form>
      <div className="social-auth-links text-center">
        <p>- OR -</p>
        <a href="#" className="btn btn-block btn-primary">
          <i className="fab fa-facebook mr-2" />
          Sign up using Facebook
        </a>
        <a href="#" className="btn btn-block btn-danger">
          <i className="fab fa-google-plus mr-2" />
          Sign up using Google+
        </a>
      </div>

      <h5
        onClick={() => {
          setPageType(isRegister ? "login" : "register");
          setError(null);
          resetForm();
        }}
      >
        {isRegister 
          ? "I already have a membership" 
          : "Register a new membership"}
      </h5>
      </>
      )}
      </Formik>
    </div>
  </div>
</div>
</>
  )
}

export default Auth;