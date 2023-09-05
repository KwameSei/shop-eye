// import React, { useState } from 'react';
// import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const navigate = useNavigate();
//   const [logoutConfirmed, setLogoutConfirmed] = useState(false);

//   const handleLogout = () => {
//     swal("Are you sure you want to sign out?", {
//       buttons: {
//         nope: {
//           text: "Let me stay",
//           value: "nope",
//         },
//         sure: {
//           text: "I'm sure",
//           value: "sure",
//         },
//       },
//     }).then((value) => {
//       switch (value) {
//         case "sure":
//           swal("Signed out successfully", "success").then(() => {
//             localStorage.removeItem("token");
//             navigate("/login");
//           });
//           break;
//         case "nope":
//           swal("OK", "success");
//           break;
//         default:
//           swal("Got away safely!");
//       }
//     });
//   };

//   const handleLogoutClick = () => {
//     if (logoutConfirmed) {
//       // Perform logout logic here
//       localStorage.removeItem("token");
//       navigate("/login");
//     } else {
//       setLogoutConfirmed(true);
//     }
//   };

//   const handleCancelClick = () => {
//     setLogoutConfirmed(false);
//   };

//   return (
//     <div>
//       {logoutConfirmed ? (
//         <div>
//           <p>Are you really, really sure you want to log out?</p>
//           <button onClick={handleLogoutClick}>Yes, Logout</button>
//           <button onClick={handleCancelClick}>No, Cancel</button>
//         </div>
//       ) : (
//         <button onClick={handleLogoutClick}>Logout</button>
//       )}
//     </div>
//   );
// }

// export default Logout;

// import React, { useState } from 'react';
// import swal from 'sweetalert';

// const Logout = () => {
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const handleLogout = () => {
//     setShowLogoutDialog(true);
//   };

//   const handleConfirmLogout = () => {
//     // Perform logout logic here
//     localStorage.removeItem('token');
//     setShowLogoutDialog(false);
//     // You can also navigate to a different route if needed
//   };

//   const handleCancelLogout = () => {
//     setShowLogoutDialog(false);
//   };

//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>

//       {showLogoutDialog && (
//         <div className="logout-dialog">
//           <p>Are you sure you want to log out?</p>
//           <button onClick={handleConfirmLogout}>Yes</button>
//           <button onClick={handleCancelLogout}>No</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Logout;

import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Automatically call the logout function when the component renders
  useEffect(() => {
    handleLogout();
  }, []); // The empty dependency array ensures this runs once on component mount

  // This component doesn't return any JSX because it logs the user out immediately

  return null;
}

export default Logout;
