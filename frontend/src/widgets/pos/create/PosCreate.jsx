import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { Close, LockOpen, PersonAdd, Send } from '@mui/icons-material';
import { setPos } from '../../../State/POS/posSlice';
import * as Yup from 'yup';

const PosCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [setIsPos, setIsPossetIsPos] = useState(false);
  const aliasRef = useRef();
  const emailRef = useRef();
  const serial_numberRef = useRef();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePos = async (values) => {
    const alias = aliasRef.current.value;
    const email = emailRef.current.value;
    const serial_number = serial_numberRef.current.value;

    const posData = {
      alias,
      email,
      serial_number
    };

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/pos/create-pos', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(posData)
      });

      const data = await response.json();
      console.log('POD data', data)
      setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      if (response.ok) {
        dispatch(setPos(data));
        navigate('/dashboard');
      }

      // Clear the form
      aliasRef.current.value = '';
      emailRef.current.value = '';
      serial_numberRef.current.value = '';
      
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong!');
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePos();
  };

  return (
    <>
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">Shop Eye</a>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Create POS</p>

              <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                  <DialogContentText>Please enter your details here.</DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="alias"
                      label="Name"
                      type="text"
                      fullWidth
                      inputRef={aliasRef}
                      inputProps={{ minLength: 2, maxLength: 50 }}
                      required
                    />
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
                    id="serial_number"
                    label="Serial Number"
                    type="serial_number"
                    fullWidth
                    inputRef={serial_numberRef}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />
    
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default PosCreate;
