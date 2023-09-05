import React from 'react'

import './Menu.scss';

const Dropdown = ({ submenus, showDropdown }) => {
  return (
    <div>
      <ul className={`dropdown ${showDropdown ? "active" : ""}`}>
        {submenus.map((submenu, index) => (
          <li key={index} className='sub-items'>
            <a href={submenu.url}>{submenu.title}</a>
          </li>
      ))}
      </ul>
    </div>
  )
}

export default Dropdown;