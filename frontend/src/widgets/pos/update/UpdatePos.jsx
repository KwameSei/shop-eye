import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import '../../Common.scss';

const UpdatePos = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    alias: '',
    email: '',
    serial_number: '',
  });

  const token = useSelector((state) => state.auth.token);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // Function to fetch the POS data by ID
  const getPOS = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${serverURL}/api/pos/get-single-pos/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Make sure to provide the token
        },
      });
      const data = await response.json();
      setFormData(data.pos);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${serverURL}/api/pos/update-pos/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        navigate('/display-pos');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log('Component re-rendered.');
    console.log('formData:', formData);
    getPOS();
  }, []);

  return (
    <div className="wrapper main">
      <Box width="80%" sx={{ margin: '0 auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Edit POS Machine
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="alias"
            name="alias"
            label="Alias"
            inputProps={{ shrink: 'true' }}
            placeholder="Enter Name"
            value={formData?.alias || ''}
            onChange={handleFieldChange}
          />

          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="email"
            name="email"
            label="Email"
            inputProps={{ shrink: 'true' }}
            placeholder="Enter Email"
            value={formData?.email || ''}
            onChange={handleFieldChange}
          />

          <TextField
            className="input-field"
            sx={{ mb: 2 }}
            fullWidth
            id="serial_number"
            name="serial_number"
            label="Serial Number"
            inputProps={{ shrink: 'true' }}
            placeholder="Enter Serial Number"
            value={formData?.serial_number || ''}
            onChange={handleFieldChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#000',
              },
            }}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update POS'}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default UpdatePos;
