// import { useNavigate } from 'react-router-dom';

// const SecuredRoute = ({ children, ...rest }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   if (!token) {
//     navigate('/login');
//     return null;
//   }
//   return ( 
//     <Route {...rest}>{children}</Route>
//   );
// };

// export default SecuredRoute;

// // const SecuredRoute = ({ children, ...rest }) => {
// //   if (!isAuthenticated()) {
// //     navigate('/login');
// //     return null;
// //   }
// //   return <Route {...rest}>{children}</Route>;
// // };

import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const SecuredRoute = () => {
  console.log('SecuredRoute accessed');
  let auth = localStorage.token

  if (!auth) {
    return(<Navigate to="/login" />)
  } else {
    return(<Outlet />)
  }
}

export default SecuredRoute;