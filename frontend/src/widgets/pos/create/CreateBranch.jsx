import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Send } from '@mui/icons-material';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import Select from 'react-select';
import { setBranch, setPos } from '../../../State/POS/posSlice';
import '../../Common.scss';
import './Create.scss';

const CreateBranch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [selectedPosMachines, setSelectedPosMachines] = useState([]); // For the multiselect dropdown
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [title, setTitle] = useState('Login');
  const [posMachines, setPosMachines] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);


  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const branch = useSelector((state) => state.pos.branch);

  const isLogin = !isRegister;

  useEffect(() => {
    setTitle(isRegister ? 'Register' : 'Login');
    console.log('selectedPosMachines:', selectedPosMachines);
    console.log('posMachines:', posMachines);
  }, [selectedPosMachines, posMachines, isRegister]);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    // Fetch available POS machines
    axios.get(`${serverURL}/api/branches/get-branches`)
      .then((response) => {
        console.log('API Response:', response.data);
  
        if (Array.isArray(response.data.branches)) {
          // Extract the available POS machines from the branches data
          const posOptions = response.data.branches.flatMap((branch) =>
            branch.pos_machine.map((pos_machine) => ({
              value: pos_machine._id,
              label: pos_machine.alias,
            }))
          );
  
          console.log('POS Options:', posOptions);
  
          setPosMachines(posOptions);
        } else {
          console.log('No branches found in the API response.');
          setPosMachines([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching POS machines:', error);
      });
  }, []);  

  // useEffect(() => {
  //   // Fetch available products
  //   axios.get(`${serverURL}/api/branches/get-branches`)
  //   .then((response) => {
  //     console.log('API Response:', response.data);

  //     if (Array.isArray(response.data.products)) {
  //       const productOptions = response.data.products.map((product) => ({
  //         value: product._id,
  //         label: product.name,
  //       }));

  //       const posOptions = response.data.posMachines.map((pos_machine) => ({
  //         value: pos_machine._id,
  //         label: pos_machine.alias,
  //       }));

  //       console.log('Product Options:', productOptions);
  //       console.log('Category Options:', categoryOptions);

  //       setPosMachines(posOptions);
  //       setProducts(productOptions);
  //     } else {
  //       console.log('No products found in the API response.');
  //       setCategories([]);
  //       setProducts([]);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching Products with Categories:', error);
  //   });
  // }, []);

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

  const handleBranchRegister = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('image', image);
    formData.append('pos_machine', selectedPosMachines.map((pos) => pos.value).join(','));
    
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post(`${serverURL}/api/branches/create-branch`, formData, {
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

  const handleBranchLogin = async () => {
    const userData = {
      email,
      password,
    };

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post(`${serverURL}/api/branches/login`, userData, {
        headers: {
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
      setEmail('');
      setPassword('');
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
    if (isLogin) {
      handleBranchLogin();
    } else {
      handleBranchRegister();
    }
  };

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLoginClick = () => {
    setIsRegister(false);
  };

  return (
    <>
      <div className="register main">
          <div className="register-card">
              <p className="heading">Create your store</p>
              <p className='title'>{title}</p>
              <form onSubmit={handleSubmit}>
                {/* <DialogContent dividers> */}
                  <DialogContentText>Please enter your shop details here.</DialogContentText>
                  {isRegister && (
                    <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Shop Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  </>
                )}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Shop Email"
                    type="text"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Shop Password"
                    type="password"
                    fullWidth
                    value={password}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />
                  {isRegister && (
                    <>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="phone"
                    label="Shop Phone"
                    type="number"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="address"
                    label="Shop Address"
                    type="address"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    inputProps={{ minLength: 6, maxLength: 50 }}
                    required
                  />
                  {/* Create image */}
                  <input
                    type="file"
                    name='image'
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImage(file);
                      showPreviewImage(e);
                    }}
                    className='image-input'
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
                    // onChange={(selectedOptions) => setSelectedPosMachines(selectedOptions)}
                  />
                    </>
                  )}

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
                  ? "Do you have a shop account? Sign in here!"
                  : "Don't have a shop account? Sign up here!"
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
