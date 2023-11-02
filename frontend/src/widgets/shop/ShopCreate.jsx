import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import { setUser, setToken, loadUserSuccess, setLoading } from '../../State/auth/authSlice';
import { useLoading } from '../../components/Loading.jsx';
import { toast } from 'react-toastify';
import { Loader } from '../../components';

import './Shop.scss';

const ShopCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageType, setPageType] = useState('login');
  const [users, setUsers] = useState([]); // Users state
  const [isRegister, setIsRegister] = useState(false);
  const [title, setTitle] = useState('Login');
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setLoading] = useState(false); // Loading state

  const isLogin = !isRegister;

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // Use useEffect to change the title of the page
  useEffect(() => {
    setTitle(isRegister ? 'Register' : 'Login');
  }, [isRegister]);

  const handleRegister = async () => {
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
      setLoading(true);
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
        toast.error(data.message || 'Something went wrong!');
        throw new Error(data.message || 'Something went wrong!');
      }

      // Display a message to the user about activation
      // alert('Please check your email to activate your account!');

      // // Clear the form
      // nameRef.current.value = '';
      // emailRef.current.value = '';
      // passwordRef.current.value = '';
      // confirmPasswordRef.current.value = '';

      dispatch(loadUserSuccess(data.user));
      dispatch(setToken(data.token));
      toast.success('Registration successful!');
      navigate('/dashboard');

    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      email,
      password
    };

    try {
      setLoading(true);
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`${serverURL}/api/users/login`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      // const data = await response.json();
      // setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      // dispatch(setUser(data.user));
      // dispatch(setToken(data.token));
      // toast.success('Login successful!');
      // navigate('/dashboard');

      const data = await response.json();
      dispatch(loadUserSuccess(data.user)); // Dispatch the action
      dispatch(setToken(data.token));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      toast.error(err.message || 'Something went wrong!');
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
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
  };

  const handleLoginClick = () => {
    setIsRegister(false);
  };

  const handleCloseLogin = () => {
    setIsRegister(false);
  };

  return (
    <div className="auth">
      <h3 className="welcome">Welcome to Shop Eye POS</h3>
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
            <DialogActions
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
              }}
            >
              {isLogin && (
                <>
                  <div className='sub-sub-fields'>
                    <div>
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                      />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <div className="forgot-password">
                      <Link to="" className="link">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </DialogActions>
            <DialogActions
              sx={{
                display: 'flex',
                right: 0,
                top: '0',
              }}
            >
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
              onClick={isRegister ? handleLoginClick : handleRegisterClick}
              variant="text"
            >
              {isRegister ? 'Sign in' : 'Sign up'}
            </Button>
          </DialogActions>
        </div>
      </div>
      {isLoading && (
        <Loader />
        )
      }
    </div>
  );
};

export default ShopCreate;
