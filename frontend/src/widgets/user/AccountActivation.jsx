import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Container, Typography, CircularProgress } from '@mui/material';

const useStyles = styled((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  message: {
    color: theme.palette.primary.contrastText,
  },
  loading: {
    color: theme.palette.primary.contrastText,
  },
  success: {
    color: theme.palette.primary.contrastText,
  },
  error: {
    color: theme.palette.primary.contrastText,
  },
}));

const AccountActivation = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = useSelector(state => state.auth);
  const [activationResult, setActivationResult] = useState('');

  const serverURL = import.meta.env.VITE_SERVER_URL;

  const getActivation = async () => {
    const response = await fetch(`${serverURL}/api/users/activate-account/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const data = await response.json();
    console.log('Activation data:', data);
    setActivationResult(data);
    setLoading(false);
    
    if (data.success) {
      setSuccess(true);
      setError(false);

      // Redirect to login page after 5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  useEffect(() => {
    getActivation();
  }, [token]);

  return (
    <div>
      {/* {loading && <div>Loading...</div>}
      {success && <div>Account activated successfully!</div>}
      {error && <div>Account activation failed!</div>}
      <div>{activationResult.message}</div> */}

      <Container maxWidth="sm" className={classes.container}>
        {loading && <CircularProgress className={classes.loading} />}
        {activationResult.success && (
          <Typography variant="h5" component="div" className={classes.success}>
            Account activated successfully!
          </Typography>
        )}
        {activationResult.error && (
          <Typography variant="h5" component="div" className={classes.error}>
            Account activation failed!
          </Typography>
        )}
        <Typography variant="body1" gutterBottom>
          {activationResult.message}
        </Typography>
      </Container>
    </div>
  )
}

export default AccountActivation