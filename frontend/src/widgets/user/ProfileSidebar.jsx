import React from 'react'
import { useNavigate } from 'react-router-dom';

import './Profile.scss';
import { Book, CreditCardOutlined, EmailOutlined, InboxOutlined, LogoutOutlined, Person, ReceiptOutlined, ShoppingCart, TrackChangesOutlined, Update } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ProfileSidebar = ({active, setActive}) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // const logoutHandler = () => {
  //   try {
  //     axios.get(`${serverURL}/api/users/logout`)
  //     .then(res => {
  //       toast.success(res.data.message);
  //       localStorage.removeItem('token');
  //       navigate('/');
  //       window.location.reload(true);
  //     })
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // }

  return (
    <div className='profile-sidebar'>
      <div className="sidebar-inner"
        onClick={() => setActive(1)}
      >
        <Person color={active === 1 ? 'error' : ''} />
        <span className={active === 1 ? 'heading' : ''}>
          Profile
        </span>
      </div>

      <div className="sidebar-inner"
        onClick={() => setActive(2)}
      >
        <ShoppingCart color={active === 2 ? 'error' : ''} />
        <span className={active === 2 ? 'heading' : ''}>
          Orders
        </span>
      </div>

      <div className="sidebar-inner"
        onClick={() => setActive(3)}
      >
        <ReceiptOutlined color={active === 3 ? 'error' : ''} />
        <span className={active === 3 ? 'heading' : ''}>
          Refund
        </span>
      </div>

      <div className="sidebar-inner"
        onClick={() => setActive(4) || navigate('/inbox')}
      >
        <EmailOutlined color={active === 4 ? 'error' : ''} />
        <span className={active === 4 ? 'heading' : ''}>
          Inbox
        </span>
      </div>

      <div className="sidebar-inner"
        onClick={() => setActive(5)}
      >
        <TrackChangesOutlined color={active === 5 ? 'error' : ''} />
        <span className={active === 5 ? 'heading' : ''}>
          Track Order
        </span>
      </div>

      <div className="sidebar-inner"
        onClick={() => setActive(6)}
      >
        <CreditCardOutlined color={active === 6 ? 'error' : ''} />
        <span className={active === 6 ? 'heading' : ''}>
          Payment Methods
        </span>
      </div>

      <div className="sidebar-inner"
        onClick={() => setActive(7)}
      >
        <Book color={active === 7 ? 'error' : ''} />
        <span className={active === 7 ? 'heading' : ''}>
          Address
        </span>
      </div>

      <div className="sidebar-inner"
        onClick={() => setActive(9) || navigate('/update-profile/' + user._id)}
      >
        <Update color={active === 9 ? 'error' : ''} />
        <span className={active === 9 ? 'heading' : ''}>
          Update Profile
        </span>
      </div>

      <div className="sidebar-inner"
        onClick={() => setActive(8) || navigate('/logout')}
      >
        <LogoutOutlined color={active === 8 ? 'error' : ''} />
        <span className={active === 8 ? 'heading' : ''}>
          Exit
        </span>
      </div>

    </div>
  )
}

export default ProfileSidebar;