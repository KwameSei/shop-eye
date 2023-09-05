import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Dropdown from './Dropdown';

import './Menu.scss';

const SubItems = ({ items }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <li className='sub-items'>
        {items.submenu ? (
          <>
            <button
              type='button'
              className='sub-items-btn'
              aria-haspopup='menu'
              aria-expanded={showDropdown ? 'true' : 'false'}
              onClick={handleDropdownToggle}
            >
              {items.title}
            </button>
            <Dropdown submenus={items.submenu} showDropdown={showDropdown} />
          </>
        ) : (
          // Use Link for navigation if there's a URL
          items.url ? (
            <Link to={items.url} className='sub-items-btn'>
              {items.title}
            </Link>
          ) : (
            // Render plain text if no URL is provided
            <span className='sub-items-btn'>{items.title}</span>
          )
        )}
      </li>
    </div>
  );
};

export default SubItems;
