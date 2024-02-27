// authReducer.jsx
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null, // Parse the stored JSON string
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('Logged in');
      return { ...state, isLoggedIn: true, user: action.payload };
    case 'LOGOUT':
      console.log('Logged out');
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export default AuthReducer;
  