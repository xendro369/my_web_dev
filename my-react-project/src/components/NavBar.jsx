import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ChangePasswordForm from './forgot-password/ChangePasswordForm';
import ForgotPassword from './forgot-password/ForgotPassword';
import Login from './login-signup-logout/Login';
import Logout from './login-signup-logout/LogOut';
import SignUp from './login-signup-logout/SignUp';
import LoginSignupModal from './response-modal/LoginSignupModal';


const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.user);

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignModalOpen, setSignModalOpen] = useState(false);
  const [isForgotPwdModalOpen, setForgotPwdModalOpen] = useState(false);
  const [isChangeForgotPwdModalOpen, setChangeForgotPwdModalOpen] = useState(false);
  const [changePasswordFormData, setChangePasswordFormData] = useState(null);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
    setSignModalOpen(false);
  };

  const handleSignupClick = () => {
    setSignModalOpen(true);
    setLoginModalOpen(false);
  };

  const handleForgotPwdClick = () => {
    setForgotPwdModalOpen(true);
    setLoginModalOpen(false);
  };

  const handleChangeForgotPwdClick = (data) => {
    setChangeForgotPwdModalOpen(true);
    setForgotPwdModalOpen(false);
    setChangePasswordFormData(data);
  };

  const handleClose = () => {
    setLoginModalOpen(false);
    setSignModalOpen(false);
    setForgotPwdModalOpen(false);
    setChangeForgotPwdModalOpen(false);
  };

  useEffect(() => {
    if (isLoggedIn && location.pathname === '/login') {
      navigate('/'); // Redirect to home if logged in and accessing login page
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <nav>
      <div>
        <ul className="flex flex-wrap sm:justify-center md:justify-end">
          {['/courses', '/about', '/service', '/contact'].map((path) => (
            <li key={path} className={location.pathname === path ? 'active font-bold' : 'font-normal'}>
              <Link to={path} className="px-2">
                {path === '/courses' ? 'Course' : path === '/about' ? 'About' : path === '/service' ? 'Service' : 'Contact'}
              </Link>
            </li>
          ))}
          {isLoggedIn ? (
            <>
              {['/user-records', '/contacts', '/enroll', '/user-profile'].map((path) => (
                <li key={path} className={location.pathname === path ? 'active font-bold' : 'font-normal'}>
                  <Link to={path} className="px-2">
                    {path === '/user-records' ? 'User Records' : path === '/contacts' ? 'Contacts Info' : path === '/enroll' ? 'Enroll' : username}
                  </Link>
                </li>
              ))}
              <li className={location.pathname === '/logout' ? 'active font-bold' : 'font-normal px-2'}>
                <Logout />
              </li>
            </>
          ) : (
            <>
              <li className={location.pathname === '/login' ? 'active font-bold' : 'font-normal'}>
                <Link to="/login" className="px-2" onClick={(e) => {
                  e.preventDefault();
                  setLoginModalOpen(true);
                }}>
                  Login
                </Link>
              </li>
              <li className={location.pathname === '/signup' ? 'active font-bold' : 'font-normal'}>
                <Link to="/signup" className="px-2" onClick={(e) => {
                  e.preventDefault();
                  setSignModalOpen(true);
                }}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {isLoginModalOpen && (
        <LoginSignupModal onClose={handleClose}>
          <Login onSignupClick={handleSignupClick} onForgotPwdClick={handleForgotPwdClick} setLoginModalOpen={setLoginModalOpen}/>
        </LoginSignupModal>
      )}
      {isSignModalOpen && (
        <LoginSignupModal onClose={handleClose}>
          <SignUp onLoginClick={handleLoginClick} setSignModalOpen={setSignModalOpen}/>
        </LoginSignupModal>
      )}
      {isForgotPwdModalOpen && (
        <LoginSignupModal onClose={handleClose}>
          <ForgotPassword onSubmit={handleChangeForgotPwdClick} />
        </LoginSignupModal>
      )}
      {isChangeForgotPwdModalOpen && (
        <LoginSignupModal onClose={handleClose}>
          <ChangePasswordForm
            onClose={handleClose}
            password={changePasswordFormData.password}
            username={changePasswordFormData.username}
          />
        </LoginSignupModal>
      )}
      {/* Position handleChangeForgotPwdClick the close button within the shaded overlay */}
      {(isLoginModalOpen || isSignModalOpen || isForgotPwdModalOpen || isChangeForgotPwdModalOpen) && (
        <button
          className="fixed top-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded z-10"
          onClick={handleClose}
        >
          Close
        </button>
      )}
    </nav>
  );
};

export default NavBar;























// import React, {useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom'; // Updated import
// import { useSelector } from 'react-redux';
// import Logout from './login-signup-logout/LogOut';
// import Login from './login-signup-logout/Login';
// import SignUp from './login-signup-logout/SignUp';
// import LoginSignupModal from './response-modal/LoginSignupModal';
// import ForgotPassword from './forgot-password/ForgotPassword';
// import ChangePasswordForm from './forgot-password/ChangePasswordForm';

// const NavBar = () => {
//   const location = useLocation();
//   const navigate = useNavigate(); // Updated import

//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const username = useSelector((state) => state.user);
//   console.log(isLoggedIn);
//   console.log(username);
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//   const [isSignModalOpen, setSignModalOpen] = useState(false);
//   const [isForgotPwdModalOpen, setForgotPwdModalOpen] = useState(false);
//   const [isChangeForgotPwdModalOpen, setChangeForgotPwdModalOpen] = useState(false);
//   const [changePasswordFormData, setChangePasswordFormData] = useState(null);

//   const handleLoginClick = () => {
//     console.log('in direct link to login');
//     setLoginModalOpen(true);
//     setSignModalOpen(false);
//   };

//   const handleSignupClick = () => {
//     console.log('in direct link to sign up ');
//     setSignModalOpen(true);
//     setLoginModalOpen(false);
//   };

//   const handleForgotPwdClick = () => {
//     console.log('in direct link to ForgotPwd');
//     setForgotPwdModalOpen(true);
//     setLoginModalOpen(false);
//   }

//   const handleChangeForgotPwdClick = (data) => {
//     console.log('in direct link to ForgotPwd');
//     // navigate('/change_passwordform', { state: { password: data.password, username: data.username } });
//     setChangeForgotPwdModalOpen(true);
//     setForgotPwdModalOpen(false);
//     setChangePasswordFormData(data);
//   }

//   const handleClose = () => { 
//     console.log(' close modal link  ');
//     setLoginModalOpen(false);
//     setSignModalOpen(false);
//     setForgotPwdModalOpen(false);
//     setChangeForgotPwdModalOpen(false);
//   };
  
//   // Use useEffect to check the login status when the component mounts
//   useEffect(() => {
//     if (isLoggedIn && location.pathname === '/login') {
//       // User is logged in and trying to access the login page, navigate them to another page
//       navigate('/'); // Replace with the desired redirect path
//     }
//   }, [isLoggedIn, location.pathname, navigate]);

//   return (
//     <nav>
//       <div>
//         <ul className="flex flex-wrap sm:justify-center md:justify-end">
//           <li className={location.pathname === '/courses' ? 'active font-bold' : 'font-normal'}>
//             <Link to="/courses" className="px-2">Course</Link>
//           </li>
//           <li className={location.pathname === '/about' ? 'active font-bold' : 'font-normal'}>
//             <Link to="/about" className="px-2">About</Link>
//           </li>
//           <li className={location.pathname === '/service' ? 'active font-bold' : 'font-normal'}>
//             <Link to="/service" className="px-2">Service</Link>
//           </li>
//           <li className={location.pathname === '/contact' ? 'active font-bold' : 'font-normal'}>
//             <Link to="/contact" className="px-2">Contact</Link>
//           </li>
//           {isLoggedIn ? (
//             <>
//               {/* User is logged in, hide 'Login' and 'Signup', show 'Logout' */}
//               {/* Other menu items */}
//               <li className={location.pathname === '/user-records' ? 'active font-bold' : 'font-normal'}>
//                 <Link to="/user-records" className="px-2">User Records</Link>
//               </li>
//               <li className={location.pathname === '/contacts' ? 'active font-bold' : 'font-normal'}>
//                 <Link to="/contacts" className="px-2">Contacts Info</Link>
//               </li>
//               <li className={location.pathname === '/enroll' ? 'active font-bold' : 'font-normal'}>
//                 <Link to="/enroll" className="px-2">Enroll</Link>
//               </li>
//               <li className={location.pathname === '/user-profile' ? 'active font-bold' : 'font-normal'}>
//                 <Link to="/user-profile" className="px-2">{username}</Link>
//               </li>
//               <li className={location.pathname === '/logout' ? 'active font-bold' : 'font-normal px-2'}>
//                 <Logout />
//               </li>
//             </>
//           ) : (
//             <>
//               {/* User is not logged in, hide 'Logout', show 'Login' and 'Signup' */}
//               <li className={location.pathname === '/login' ? 'active font-bold' : 'font-normal'}>
//                 <Link to="/login" className="px-2" onClick={(e) => {
//                   e.preventDefault();
//                   setLoginModalOpen(true);
//                 }}>Login</Link>
//               </li>

//               <li className={location.pathname === '/signup' ? 'active font-bold' : 'font-normal'}>
//                 <Link to="/signup" className="px-2" onClick={(e) => {
//                   e.preventDefault();
//                   setSignModalOpen(true); // You can modify this if you need a separate modal for signup
//                 }}>Signup</Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
      // {isLoginModalOpen && (
      //   <LoginSignupModal onClose={handleClose}>
      //     <Login onSignupClick={handleSignupClick} onForgotPwdClick={handleForgotPwdClick} setLoginModalOpen={setLoginModalOpen}/>
      //   </LoginSignupModal>
      // )}
      // {isSignModalOpen && (
      //   <LoginSignupModal onClose={handleClose}>
      //     <SignUp onLoginClick={handleLoginClick} setSignModalOpen={setSignModalOpen}/>
      //   </LoginSignupModal>
      // )}
      // {isForgotPwdModalOpen && (
      //   <LoginSignupModal onClose={handleClose}>
      //     <ForgotPassword onSubmit={handleChangeForgotPwdClick} />
      //   </LoginSignupModal>
      // )}
      // {isChangeForgotPwdModalOpen && (
      //   <LoginSignupModal onClose={handleClose}>
      //     <ChangePasswordForm
      //       onClose={handleClose}
      //       password={changePasswordFormData.password}
      //       username={changePasswordFormData.username}
      //     />
      //   </LoginSignupModal>
      // )}
      //       {/* Position handleChangeForgotPwdClick the close button within the shaded overlay */}
      // {(isLoginModalOpen || isSignModalOpen || isForgotPwdModalOpen || isChangeForgotPwdModalOpen) && (
      // <button
      //   className="fixed top-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded z-10"
      //   onClick={handleClose}
      // >
      //   Close
      // </button>
//       // <SubmitButton label="Submit" onSubmit={handleClose} className="fixed top-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded" />

//       )}

//     </nav>
//   );
// };

// export default NavBar;
