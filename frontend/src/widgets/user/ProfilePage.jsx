import React from 'react'
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <div className='profile-page'>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
    </div>
  )
}

export default ProfilePage;