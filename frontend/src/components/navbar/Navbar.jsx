// import React from 'react'
// import Items from '../Menu/Items';

// const Navbar = () => {
//   return (
//     <div>
//       <nav>
//         <ul className='menus'>
//           {Items.map((item, index) => {
//             return (
//               <li key={index} className='menu-items'>
//                 <a href={item.url}>{item.title}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default Navbar;

import React from 'react'
import Items from '../Menu/Items';
import SubItems from '../Menu/SubItems';

import './Navbar.scss';

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul className='menus'>
          {Items.map((item, index) => {
            return <SubItems key={index} items={item} />
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;