// authActions.jsx
export const loginUser = (user) => {
  // Save authentication status in local storage
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('user', JSON.stringify(user)); // Convert user object to JSON string

  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  };
};

export const logoutUser = () => {
  // Remove authentication status from local storage
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');

  return {
    type: 'LOGOUT',
  };
};




// export const loginUser = (user) => ({
//     type: 'LOGIN_SUCCESS',
//     payload: user,
//   });
  
// export const logoutUser = () => ({
//   type: 'LOGOUT',
// });
