import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/reducer/AuthAction';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');

    if (!confirmed) {
      return; // If the user cancels, do nothing
    }
    // Call the Flask logout endpoint
    try { 
      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'GET',
        // You may need to include credentials if your server requires authentication
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        dispatch(logoutUser());
        navigate('/');
      } else {
        console.error('Failed to logout from Flask');
      }
    } catch (error) {
      console.error('Error during logout from Flask:', error);
    }
    // Dispatch the logoutUser action
    // dispatch(logoutUser());
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;












// import React from 'react'

// function LogOut() {
//   return (
//     <div>LogOut</div>
//   )
// }

// export default LogOut


// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { logoutUser } from '../redux/reducer/AuthAction';

// const Logout = () => {
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     console.log('Logout successfully');
//   };
//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default Logout;
