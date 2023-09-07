import React from 'react';
import SidebarMenu from './SidebarMenu';
import items from './data/sidebar.json';
import './Sidebar.scss';

const Sidebar = () => {
  return (
  <div className="sidebar">
    { /* Loop through the items */ }
    { items.map((item, index) => <SidebarMenu key={index} {...item} />)}
  </div>
  )
}

export default Sidebar