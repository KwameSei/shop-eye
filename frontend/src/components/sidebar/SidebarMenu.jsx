import React, { useState } from 'react'
// import { ArrowDownward, Settings } from '@mui/icons-material';
import {
  ArrowDropDown,
  Settings,
  Home,
  Info,
  Call,
  Facebook,
  Twitter,
  Instagram,
  HelpOutline,
  Person,
  Search,
  BugReport,
  ShoppingBag,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Define a mapping of icon names to Material-UI icons
const iconMap = {
  ArrowDropDown: <ArrowDropDown />,
  Settings: <Settings />,
  Home: <Home />,
  Info: <Info />,
  Call: <Call />,
  Facebook: <Facebook />,
  Twitter: <Twitter />,
  Instagram: <Instagram />,
  HelpOutline: <HelpOutline />,
  Person: <Person />,
  Search: <Search />,
  BugReport: <BugReport />,
  ShoppingBag: <ShoppingBag />,
};

const SidebarMenu = (item) => {
  const [open, setOpen] = useState(false);

  if (item.childrens) {
    return (
      <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
        <div className="sidebar-title">
          <span>
            {item.icon && iconMap[item.icon] && (
              <div className="sidebar-icon">{iconMap[item.icon]}</div>
            )}
            <div className='menu-name'>
              <Link to={item.path} className='link'>{item.title}</Link>
            </div>
          </span>
          <ArrowDropDown className='toggle-btn' onClick={() => setOpen(!open)} />
        </div>

        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <div key={index} className="sidebar-submenu">
              {child.icon && iconMap[child.icon] && (
                <div className="submenu-icon">{iconMap[child.icon]}</div>
              )}
              <div className='submenu-name'>
                <Link to={child.path} className='link'>{child.title}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="sidebar-item">
        <div className="sidebar-title">
          <span>
            {item.icon && iconMap[item.icon] && (
              <div className="sidebar-icon">{iconMap[item.icon]}</div>
            )}
            <div className='menu-name'>
              <Link to={item.path} className='link'>{item.title}</Link>
            </div>
          </span>
        </div>
      </div>
    );
  }
};

export default SidebarMenu;

// const SidebarMenu = (item) => {
//   const [open, setOpen] = useState(false);

//   if (item.childrens) {
//     return (
//       <div className={open ? 'sidebar-item open' : 'sidebar-item'}>
//         <div className="sidebar-title">
//           <span>
//             {item.icon && <item.icon className='sidebar-icon' />}
//             <div className='menu-name'>
//               {item.title}
//             </div>
//           </span>
//           <ArrowDownward className='toggle-btn' onClick={() => setOpen(!open)} />
//         </div>

//         <div className="sidebar-content">
//           Hello
//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <div className="sidebar-item">
//         <div className="sidebar-title">
//           <span>
//             {item.icon && <item.icon className='sidebar-icon' />}
//             <div className='menu-name'>
//               {item.title}
//             </div>
//           </span>
//         </div>
//       </div>
//     )
//   }
// }

// export default SidebarMenu;