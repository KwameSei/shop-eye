import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar, Header, Footer, ProtectedRoute } from './components'
import { Dashboard, Auth, Home } from './widgets';
import { setLogin } from './State/auth/authSlice';

// import { useAuth } from './components/useAuth.jsx';

import './App.css'

function App() {

  const isLoggedIn = () => {
    const token = localStorage.getItem('user');
    if (token) {
      return true;
    }
    return false;
  }
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [isSignedIn, setIsSignedIn] = useState(false)

  const handleSignIn = (token, user) => {
    setIsSignedIn(true)
    // const user = JSON.parse(localStorage.getItem('user'));
    console.log('User from localStorage:', user);
    dispatch(setLogin({
      token: token,
      user: user
    }))
    console.log('User signed in with: ', token);
  }

  
  const handleSignOut = () => {
    setIsSignedIn(false)
  }

  // Exclude the login and register pages from the header and sidebar
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  console.log('isSignedIn:', isSignedIn);

  // const { isAuthenticated, SecuredRoute } = useAuth();

  return (
      <div className='app'>
        {isSignedIn && !['/login', '/register'].includes(location.pathname) && (
        <>
          <Header />
          <Sidebar />
        </>
        )}
        <Routes>
          <Route path='/login' element={<Auth onSignIn={handleSignIn} />} />
          {/* <Route path='/register' element={<Auth onSignIn={handleSignIn} />} /> */}
          <Route path='/' element={<Home />} />
          {/* <SecuredRoute path="/dashboard" element={<Dashboard />} isSignedIn={isSignedIn} /> */}
          {/* <Route path="/dashboard" element={ <ProtectedRoute isSignedIn={isSignedIn}> <Dashboard /> </ProtectedRoute> } /> */}
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            {/* <Route element={<Dashboard />}  /> */}
          {/* </Route> */}
          {/* <Route
            path="/dashboard"
            element={
              isSignedIn ? (
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          /> */}
          {/* <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} /> */}
          <Route path='/footer' element={<Footer />} />

        </Routes>
      </div>
  )
}

export default App
