import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { Close, LockOpen, PersonAdd, Send } from '@mui/icons-material';
import { setProductCategory } from '../../../State/product/productSlice';
import * as Yup from 'yup';
import '../../Common.scss';

const CreateProductCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handleCategory = async (values) => {
    const name = nameRef.current.value;

    const categoryData = {
      name,
    };

    const serverURL = import.meta.env.VITE_SERVER_URL;

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`${serverURL}/api/product-categories/create-product-category`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      });

      const data = await response.json();
      console.log('Category data', data)
      setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      if (response.ok) {
        dispatch(setProductCategory(data));
        navigate('/dashboard');
      }

      // Clear the form
      nameRef.current.value = '';
      
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
    handleCategory();
  };

  return (
    <>
      <div className="register-box main">
        <div className="register-logo">
          <a href="../../index2.html">Shop Eye</a>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Create Product Categories</p>

              <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                  <DialogContentText>Please enter product category details here.</DialogContentText>
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

export default CreateProductCategory;
