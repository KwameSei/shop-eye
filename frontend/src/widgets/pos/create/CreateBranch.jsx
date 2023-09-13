import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Send } from '@mui/icons-material';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import Select from 'react-select';
import { setBranch, setPos } from '../../../State/POS/posSlice';
import '../../Common.scss';

const CreateBranch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [selectedPosMachines, setSelectedPosMachines] = useState([]); // For the multiselect dropdown
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [posMachines, setPosMachines] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const imageRef = useRef();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const branch = useSelector((state) => state.pos.branch);

  useEffect(() => {
    console.log('selectedPosMachines:', selectedPosMachines);
    console.log('posMachines:', posMachines);
  }, [selectedPosMachines, posMachines]);

  useEffect(() => {
    // Fetch available POS machines
    axios.get('http://localhost:5000/api/branches/get-branches')
      .then((response) => {
        const posOptions = response.data.posMachines.map((pos) => ({
          value: pos._id,
          label: pos.alias,
        }));
        setPosMachines(posOptions);
      })
      .catch((error) => {
        console.error('Error fetching POS machines:', error);
      });
  }, []);

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

  const handleBranch = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('image', image);
    formData.append('pos_machines', selectedPosMachines.map((pos) => pos.value).join(','));
    
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post('http://localhost:5000/api/branches/create-branch', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response:', response);
      const { data } = response;
      dispatch(setBranch(data.branch));
      dispatch(setPos(data.posMachines));
      navigate('/dashboard');
      setSelectedBranch(data.branch);

      // Reset the form
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
    handleBranch();
  };

  return (
    <>
      <div className="register-box main">
        <div className="register-logo">
          <a href="../../index2.html">Shop Eye</a>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Create Branch</p>

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
                    label="Phone Address"
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

                  <Select
                    isMulti
                    options={posMachines}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={selectedPosMachines}
                    onChange={(selectedOptions) => setSelectedPosMachines(selectedOptions)}
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
  );
};

export default CreateBranch;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from '@mui/material';

// const CreateBranch = () => {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [image, setImage] = useState(null);
//   const [posMachines, setPosMachines] = useState([]);
//   const [selectedPosMachines, setSelectedPosMachines] = useState([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     // Fetch available POS machines
//     axios.get('http://localhost:5000/api/branches/get-branches')
//       .then((response) => {
//         const posOptions = response.data.posMachines.map((pos) => ({
//           value: pos._id,
//           label: pos.alias,
//         }));
//         setPosMachines(posOptions);
//       })
//       .catch((error) => {
//         console.error('Error fetching POS machines:', error);
//       });
//   }, []);

//   const handleCreateBranch = () => {
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('address', address);
//     formData.append('phone', phone);
//     formData.append('image', image);
//     formData.append('pos_machines', selectedPosMachines.map((pos) => pos.value).join(','));

//     axios.post('http://localhost:5000/api/branches/create-branch', formData)
//       .then((response) => {
//         setOpen(true);
//       })
//       .catch((error) => {
//         console.error('Error creating branch:', error);
//       });
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <h2>Create Branch</h2>
//       <TextField
//         label="Name"
//         variant="outlined"
//         fullWidth
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <TextField
//         label="Address"
//         variant="outlined"
//         fullWidth
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <TextField
//         label="Phone"
//         variant="outlined"
//         fullWidth
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//       <Select
//         isMulti
//         options={posMachines}
//         value={selectedPosMachines}
//         onChange={(selectedOptions) => setSelectedPosMachines(selectedOptions)}
//       />
//       <Button variant="contained" color="primary" onClick={handleCreateBranch}>
//         Create Branch
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Branch Created"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Branch created successfully.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary" autoFocus>
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CreateBranch;
