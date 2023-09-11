import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Send } from '@mui/icons-material';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { setBranch } from '../../../State/POS/posSlice';
import '../../Common.scss';

const CreateBranch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const imageRef = useRef();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const showPreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImagePreview(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handlePos = async (values) => {
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const imageFile = imageRef.current.files[0]; // Get the selected image file

    const formData = new FormData(); // Create a new FormData object
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('image', imageFile); // Append the image file to FormData

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('http://localhost:5000/api/branches/create-branch', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData, // Use the FormData object directly
      });

      const data = await response.json();
      console.log('POD data', data)
      setIsSubmitting(false);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      if (response.ok) {
        dispatch(setBranch(data));
        navigate('/dashboard');
      }

      // Clear the form
      nameRef.current.value = '';
      phoneRef.current.value = '';
      addressRef.current.value = '';
      imageRef.current.value = '';
      
    } catch (err) {
      console.error(err);
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
      <div className="register-box main">
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
                    id="phone"
                    label="phone Address"
                    type="number"
                    fullWidth
                    inputRef={phoneRef}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="address"
                    label="Serial Number"
                    type="address"
                    fullWidth
                    inputRef={addressRef}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />

                  {/* Create image */}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="image"
                    label="Image"
                    type="file"
                    fullWidth
                    inputRef={imageRef}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                    onChange={showPreviewImage}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ height: '100px', width: '100px' }}
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default CreateBranch;
