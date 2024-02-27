import React, { useState } from 'react';
import SubmitButton from '../button/SubmitButton';
import HrefLink from '../button/HrefLink';
import ResponseModal from '../response-modal/ResponseModal';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/reducer/AuthAction'; //// Import your actions
import InputField from '../input_field/InputField';
import SocialMediaComponent from '../social_media/SocialMediaButton';

const Login = ({ onSignupClick, onForgotPwdClick, setLoginModalOpen })=> {

  const [errors, setErrors] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [serverResponse, setServerResponse] = useState({ status: null, message: '', redirect: '' });
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: true,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({}); // Clear errors on input change
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.username) {
      errors.username = 'Username is required';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } 
    // else if (data.password.length < 2) {
    //   errors.password = 'Password must be at least 8 characters long';
    // }

    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('in handleSubmit');
    try {
      // Make a POST request to the login endpoint
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check the response status and handle accordingly
      if (response.ok) {
        // Successful login, redirect or perform any additional actions
        const responseData = await response.json();
        // Update the server response state
        setServerResponse(responseData);
        console.log('in login response!')
        console.log(responseData)
        // If registration is successful, open the modal
        if (responseData.status) {
          setModalOpen(true);
          // i want logic to disable signup , login on succesfull login
          console.log('Before userdispatch')
          console.log(responseData.user)
          dispatch(loginUser(responseData.user));
          console.log('after userdispatch')
          setLoginModalOpen(false);
          // setIsAuthenticated(true);
        } else{
          window.alert(responseData.message);
        }
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      // Handle any error that occurred during the request
      console.error('Error during login request:', error);
    };
  };

  return (
    <>
      <form id="login-form" className="bg-white shadow-md shadow-xl shadow-spread-2 rounded px-8 pt-6 pb-8 w-full sm:max-w-md lg:max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'black'}}>Log In</h1>

        <InputField label="Username" name="username" type="text" value={formData.username} onChange={handleChange} required={true} error={errors.username}/>

        {/* Use InputField component for password */}
        <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required={true} error={errors.password}/>

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center">
            <input type="checkbox" value="" id="form2Example31" defaultChecked onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="ml-2 block text-sm font-medium text-gray-700">
              Remember me
            </span>
          </label>
          <HrefLink to="/forgot_password" fieldTxt="Forgot password?" onClick={onForgotPwdClick}/>
        </div>
        
        <SubmitButton label="Log In" onSubmit={handleSubmit}/>

        <div className="mt-6 text-center">
        
          <p style={{ color: 'black'}}>Don't have an account?</p> 
        
          <HrefLink to="#" fieldTxt="Sign up" onClick={onSignupClick} />
          
          <div>
            <p className="mt-2 text-sm black" style={{ color: 'black'}}>or sign up with:</p>
            <div className="flex justify-center space-x-4 p-4">
              <SocialMediaComponent/>
            </div>    
          </div>
        </div>
      </form>
      <ResponseModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        status={serverResponse.status}
        message={serverResponse.message}
        redirect={serverResponse.redirect}
      />
    </>
  );
}

export default Login;

































// import React, { useState } from 'react';
// import SubmitButton from '../button/SubmitButton';
// import HrefLink from '../button/HrefLink';
// import ResponseModal from '../response-modal/ResponseModal';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     rememberMe: true,
//   });
//   const [errors, setErrors] = useState({});
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [serverResponse, setServerResponse] = useState({ status: null, message: '', redirect: '' });

//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//     setErrors({}); // Clear errors on input change
//   };

//   const validateForm = (data) => {
//     const errors = {};

//     if (!data.username) {
//       errors.username = 'Username is required';
//     }

//     if (!data.password) {
//       errors.password = 'Password is required';
//     } else if (data.password.length < 2) {
//       errors.password = 'Password must be at least 8 characters long';
//     }

//     return errors;
//   };

//   const handleSubmit = async () => {

//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     console.log('in handleSubmit')
//     try {
//       // Make a POST request to the login endpoint
//       const response = await fetch('http://127.0.0.1:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       // Check the response status and handle accordingly
//       if (response.ok) {
//         // Successful login, redirect or perform any additional actions
//         const responseData = await response.json();
//         // Update the server response state
//         setServerResponse(responseData);
//         console.log('in login response!')
//         console.log(responseData)

//         // If registration is successful, open the modal
//         if (responseData.status) {
//           setModalOpen(true);
//         } else{
//           window.alert(responseData.message);
//         }
//       } else {
//         console.error('Submission failed:', response.statusText);
//       }
//     } catch (error) {
//       // Handle any error that occurred during the request
//       console.error('Error during login request:', error);
//     };
//   };

//   const signUp = () => {
//     // Your sign up logic here
//     console.log('Register clicked!');
//     console.log(formData);
//   };
//   return (
//     <>
//       <form id="login-form" className="bg-white shadow-md shadow-xl shadow-spread-2 rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md lg:max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
//         <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

//         <div className="mb-4 font-normal">
//           <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
//           <input type="text" id="username" name="username" required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-100 focus:shadow-outline" />
//           <span className="text-red-500 text-xs italic">{errors.username}</span>
//         </div>

//         <div className="mb-6 font-normal">
//           <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//           <input type="password" id="password" name="password" required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-100 focus:shadow-outline" />
//           <span className="text-red-500 text-xs italic">{errors.password}</span>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="flex items-center">
//               <input type="checkbox" value="" id="form2Example31" defaultChecked onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
//               <label htmlFor="form2Example31" className="ml-2 block text-sm font-medium text-gray-700">
//                 Remember me
//               </label>
//             </div>
//             <div className="ml-4">
//             <HrefLink to="/forgot_password" fieldTxt="Forgot password?" />
//               {/* <a href="#!" className="underline text-blue-600 hover:text-blue-800" onClick={forgetPassword}>Forgot password?</a> */}
//             </div>
//           </div>
//         </div>
        
//         <SubmitButton label="Log In" onSubmit={handleSubmit}/>

//         <div className="mt-6 text-center">
        
//           <p>Don't have an account?</p> <HrefLink to="/signup" fieldTxt="Sign In" />
//           <p className="mt-2 text-sm">or sign up with:</p>
//           <div className="flex justify-center space-x-4">
//             <button type="button" className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//               <span className="sr-only">Facebook</span>
//               <i className="fab fa-facebook-f"></i>
//             </button>
//             <button type="button" className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//               <span className="sr-only">Linkdln</span>
//               <i className="fab fa-facebook-f"></i>
//             </button>
//             <button type="button" className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//               <span className="sr-only">Instagram</span>
//               <i className="fab fa-facebook-f"></i>
//             </button>
//             <button type="button" className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//               <span className="sr-only">Twitter</span>
//               <i className="fab fa-facebook-f"></i>
//             </button>
//           </div>
//         </div>
//       </form>
//       <ResponseModal
//         isOpen={isModalOpen}
//         onRequestClose={() => setModalOpen(false)}
//         status={serverResponse.status}
//         message={serverResponse.message}
//         redirect={serverResponse.redirect}
//       />
//     </>
//   );
// }

