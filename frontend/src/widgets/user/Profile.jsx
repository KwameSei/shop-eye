import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';

import './Profile.scss';

import '../Common.scss';

const Profile = () => {
  const [active, setActive] = useState(1);

  return (
    <div className='main profile'>
      <div className="profile-inner">
        <ProfileSidebar active={active} setActive={setActive} />
      </div>
      <ProfileContent active={active} />
    </div>
  )
}

export default Profile;