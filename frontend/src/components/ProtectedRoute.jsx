import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isSignedIn = useSelector(state => state.auth.token);

  console.log('Protected user sign in is:', isSignedIn);

  if (!isSignedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
  // return isSignedIn ? element : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;