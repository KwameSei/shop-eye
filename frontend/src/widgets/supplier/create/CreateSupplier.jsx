import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { Close, LockOpen, PersonAdd, Send } from '@mui/icons-material';
import { setSupplier } from '../../../State/POS/posSlice';
import * as Yup from 'yup';
import '../../Common.scss';

const CreateSupplier = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const vatRef = useRef();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  const handleSupplier = async (values) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    const vat = vatRef.current.value;

    const supplierData = {
      name,
      email,
      address,
      phone,
      vat
    };

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`${serverURL}/api/suppliers/create-supplier`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplierData)
      });

      const data = await response.json();
      console.log('Supplier data', data)
      setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      if (response.ok) {
        dispatch(setSupplier(data));
        navigate('/dashboard');
      }

      // Clear the form
      nameRef.current.value = '';
      emailRef.current.value = '';
      addressRef.current.value = '';
      phoneRef.current.value = '';
      vatRef.current.value = '';
      
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
    handleSupplier();
  };

  return (
    <>
      <div className="register-box main">
        <div className="register-logo">
          <a href="../../index2.html">Shop Eye</a>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Create Supplier</p>

              <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                  <DialogContentText>Please enter supplier details here.</DialogContentText>
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
                    id="address"
                    label="Serial Number"
                    type="text"
                    fullWidth
                    inputRef={addressRef}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="phone"
                    label="Phone Number"
                    type="number"
                    fullWidth
                    inputRef={phoneRef}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="vat"
                    label="VAT Number"
                    type="number"
                    fullWidth
                    inputRef={vatRef}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />

                  {error && <p className="error">{error}</p>}
    
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

export default CreateSupplier;
