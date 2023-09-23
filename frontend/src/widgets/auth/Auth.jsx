import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { Close, LockOpen, PersonAdd, Send } from '@mui/icons-material';
import { setUser, setToken } from '../../State/auth/authSlice';
import * as Yup from 'yup';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageType, setPageType] = useState('login');
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [title, setTitle] = useState('Login');
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // Use useEffect to change the title of the page
  useEffect(() => {
    setTitle(isRegister ? 'Register' : 'Login');
  }, [isRegister]);

  const handleRegister = async (values) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const userData = {
      name,
      email,
      password,
      confirmPassword
    };

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`${serverURL}/api/users/register`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      // Display a message to the user about activation
      alert('Please check your email to activate your account!');

      // if (response.ok) {
      //   dispatch(setRegister(data));
      //   navigate('/login');
      // }

      // Clear the form
      nameRef.current.value = '';
      emailRef.current.value = '';
      passwordRef.current.value = '';
      confirmPasswordRef.current.value = '';
      
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong!');
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }

    // Clear the form
    // nameRef.current.value = '';
    // emailRef.current.value = '';
    // passwordRef.current.value = '';
    // confirmPasswordRef.current.value = '';
  };

  const handleLogin = async (values) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      email,
      password
    };

      setIsSubmitting(true);
      setError(null);
    try {
      const response = await fetch(`${serverURL}/api/users/login`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log('Response from API:', data);
      setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      if (response.ok) {
        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        // onSignIn(data.token, data.user);
        navigate('/dashboard')
      }
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong!');
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }

    // Clear the form
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleRegisterClick = () => {
    setIsRegister(true);
    setIsLogin(false);
  };

  const handleLoginClick = () => {
    setIsRegister(false);
    setIsLogin(true);
  };

  const handleCloseLogin = () => {
    setIsRegister(false);
    setIsLogin(false);
  };

  return (
    <>
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">Shop Eye</a>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">{title}</p>

              <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                  <DialogContentText>Please enter your details here.</DialogContentText>
                  {isRegister && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      type="text"
                      fullWidth
                      inputRef={nameRef}
                      inputProps={{ minLength: 2, maxLength: 50 }}
                      required
                    />
                  )}

                  {/* Sign up and Login */}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    inputRef={emailRef}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    inputRef={passwordRef}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />
                  {isRegister && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      inputRef={confirmPasswordRef}
                      inputProps={{ minLength: 6, maxLength: 50 }}
                      required
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  <Button 
                    type="submit"
                    color="primary" 
                    endIcon={<Send />}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </form>
              <DialogActions
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {isRegister
                  ? "Do you have an account? Sign in here!"
                  : "Don't have an account? Sign up here!"
                }
                <Button
                  color="primary"
                  onClick={() => 
                    setIsRegister(!isRegister)}
                    variant="text"
                >
                  {isRegister ? 'Sign in' : 'Sign up'}
                </Button>
              </DialogActions>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

// const RegisterSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'Name too short!')
//     .max(50, 'Name too long!')
//     .required('Name is required'),
//   email: Yup.string()
//     .email('Invalid email')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password too short!')
//     .max(50, 'Password too long!')
//     .required('Password is required'),
//   confirm_password: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
// });

// const LoginSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password too short!')
//     .max(50, 'Password too long!')
//     .required('Password is required')
// });

// const Auth = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [pageType, setPageType] = useState('login');

//   const isRegister = pageType === 'register';
//   const isLogin = pageType === 'login';

//   const handleRegister = async (values) => {
//     setIsSubmitting(true);
//     setError(null);
//     try {
//       const response = await fetch('http://localhost:5000/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(values)
//       });
//       const data = await response.json();
//       setIsSubmitting(false);
//       if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong!');
//       }
//       navigate('/login');
//     } catch (err) {
//       console.log(err);
//       setError(err.message || 'Something went wrong!');
//       setIsSubmitting(false);
//     }
//   };

//   const handleLogin = async (values) => {
//     setIsSubmitting(true);
//     setError(null);
//     try {
//       const response = await fetch('http://localhost:5000/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(values)
//       });
//       const data = await response.json();
//       setIsSubmitting(false);

//       if (response.ok) {
//         localStorage.setItem('userInfo', JSON.stringify(data));
//         navigate('/');
//       }
//     } catch (err) {
//       console.log(err);
//       setError(err.message || 'Something went wrong!');
//       setIsSubmitting(false);
//     }
//   };

//   const handleSubmit = async (event, { setSubmitting, resetForm }) => {
//     event.preventDefault();
//     setError(null);
//     setSubmitting(true);

//     const formData = new FormData(event.target);
//     const values = {};

//     formData.forEach((value, key) => {
//       values[key] = value;
//     });

//     try {
//       if (isRegister) {
//         await RegisterSchema.validate(values, { abortEarly: false });
//         await handleRegister(values);
//       } else if (isLogin) {
//         await LoginSchema.validate(values, { abortEarly: false });
//         await handleLogin(values);
//       }

//       resetForm();
//     } catch (err) {
//       console.log(err);
//       setError(err.message || 'Something went wrong!');
//     }

//     setSubmitting(false);
//     setIsSubmitting(false);
//   };

//   return (
//     <>
//       <div className="register-box">
//         <div className="register-logo">
//           <a href="../../index2.html">Shop Eye</a>
//         </div>
//         <div className="card">
//           <div className="card-body register-card-body">
//             <p className="login-box-msg">
//               {isRegister ? 'Register a new membership' : 'Login'}
//             </p>

//             <form onSubmit={handleSubmit}>
//               {isRegister && (
//                 <div className="input-group mb-3">
//                   <TextField
//                     type="text"
//                     name="name"
//                     className="form-control"
//                     placeholder="Full name"
//                   />
//                 </div>
//               )}

//               <div className="input-group mb-3">
//                 <TextField
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   placeholder="Email"
//                 />
//               </div>

//               <div className="input-group mb-3">
//                 <TextField
//                   type="password"
//                   name="password"
//                   className="form-control"
//                   placeholder="Password"
//                 />
//               </div>

//               {isRegister && (
//                 <div className="input-group mb-3">
//                   <TextField
//                     type="password"
//                     name="confirm_password"
//                     className="form-control"
//                     placeholder="Confirm Password"
//                   />
//                 </div>
//               )}

//               <div className="row">
//                 <div className="col-8">
//                   <div className="icheck-primary">
//                     <input
//                       type="checkbox"
//                       id="agreeTerms"
//                       name="terms"
//                       className="form-check-input"
//                     />
//                     <label htmlFor="agreeTerms">
//                       I agree to the <a href="#">terms</a>
//                     </label>
//                   </div>
//                 </div>
//                 <div className="col-4">
//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-block"
//                     disabled={isSubmitting}
//                   >
//                     {isRegister ? 'Register' : 'Login'}
//                   </button>
//                 </div>
//               </div>

//               <div className="social-auth-links text-center">
//                   <p>- OR -</p>
//                   <a href="#" className="btn btn-block btn-primary">
//                     <i className="fab fa-facebook mr-2" />
//                     Sign up using Facebook
//                   </a>
//                   <a href="#" className="btn btn-block btn-danger">
//                     <i className="fab fa-google-plus mr-2" />
//                     Sign up using Google+
//                   </a>
//               </div>

//               <h5
//                 onClick={() => {
//                   setPageType(isRegister ? 'login' : 'register');
//                   setError(null);
//                 }}
//               >
//                 {isRegister ? 'I already have a membership' : 'Register a new membership'}
//               </h5>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

export default Auth;
