import React, { useState } from 'react';
import ResponseModal from '../response-modal/ResponseModal';
import SubmitButton from '../button/SubmitButton';
import InputField from '../input_field/InputField';
import HrefLink from '../button/HrefLink';

const SignUp = ({ onLoginClick, setSignModalOpen}) => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [serverResponse, setServerResponse] = useState({ status: null, message: '', redirect: '' });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: '', // Clear specific error on input change
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setServerResponse(responseData);

        if (responseData.status) {
          setModalOpen(true);
          setSignModalOpen(false);
        }
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

// Function for form validation
const validateForm = (data) => {
  const errors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.mobileNumber.trim()) {
    errors.mobileNumber = 'Mobile number is required';
  } else if (!/^\d{10}$/.test(data.mobileNumber)) {
    errors.mobileNumber = 'Invalid mobile number';
  }

  if (!data.username.trim()) {
    errors.username = 'Username is required';
  }

  if (!data.password.trim()) {
    errors.password = 'Password is required';
  }

  // Add validation rules for other fields

  return errors;
};

  return (
    <>
      <form
        className="bg-white shadow-md shadow-xl shadow-spread-2 rounded px-8 pt-6 pb-8 w-full sm:max-w-md lg:max-w-lg mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'black'}}>Sign Up</h1>

        <InputField label="First Name" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required={true} error={errors.firstName} />

        <InputField label="Last Name" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required={true} error={errors.lastName} />

        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required={true} error={errors.email} />

        <InputField label="Mobile Number" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleChange} required={true} error={errors.mobileNumber} />

        <InputField label="Username" name="username" type="text" value={formData.username} onChange={handleChange} required={true} error={errors.username} />

        <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required={true} error={errors.password} />

        <SubmitButton label="Sign Up" onSubmit={handleSubmit} />
        <p style={{ color: 'black'}}>Already have an account?</p>
        <HrefLink to="#" fieldTxt="Login" onClick={onLoginClick} />
      </form>

      {/* ResponseModal component */}
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

export default SignUp;



























// function SignUp() {
//   // Initial form data state
//   const initialFormData = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     mobileNumber: '',
//     username: '',
//     password: '',
//   };

//   // State variables
//   const [formData, setFormData] = useState(initialFormData);
//   const [errors, setErrors] = useState({});
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [serverResponse, setServerResponse] = useState({ status: null, message: '', redirect: '' });

//   // Event handler for input changes
//   const handleChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//     setErrors({}); // Clear errors on input change
//   };

//   // Event handler for form submission
//   const handleSubmit = async () => {

//     // Validate form data
//     const validationErrors = validateForm(formData);

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       // Submit form data to the server
//       const response = await fetch('http://127.0.0.1:5000/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         // Parse the response data
//         const responseData = await response.json();

//         // Update the server response state
//         setServerResponse(responseData);

//         // If registration is successful, open the modal
//         if (responseData.status) {
//           setModalOpen(true);
//         }
//       } else {
//         console.error('Submission failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//     }
//   };

//   // Function for form validation
//   const validateForm = (data) => {
//     const errors = {};

//     if (!data.firstName) {
//       errors.firstName = 'First name is required';
//     }

//     // Add validation rules for other fields

//     return errors;
//   };

//   // Function to render input fields
//   const renderInput = (label, name, type = 'text') => (
//     <div className="mb-4">
//       <label htmlFor={name} className="block text-gray-700 font-normal mb-2">
//         {label}:
//       </label>
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         required
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//       />
//       <span id={`${name}_error`} className="error-message text-red-500 text-sm">
//         {errors[name]}
//       </span>
//     </div>
//   );

//   // JSX for the component
//   return (
//     <>
//       <form className="bg-white shadow-md shadow-xl shadow-spread-2 rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md lg:max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
//         <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

//         {renderInput('First Name', 'firstName')}
//         {renderInput('Last Name', 'lastName')}
//         {renderInput('Email', 'email', 'email')}
//         {renderInput('Mobile Number', 'mobileNumber', 'tel')}
//         {renderInput('Username', 'username')}
//         {renderInput('Password', 'password', 'password')}

//         <SubmitButton label="Sign Up" onSubmit={handleSubmit}/>
//         Already have an account?{' '}
//         <HrefLink to="/login" fieldTxt="Log In" />
//         {/* <div className="mt-6 text-center">
//           <p>
//             Already have an account?{' '}
//             <Link to="/login" className="underline text-blue-600 hover:text-blue-800">Log in </Link>
//           </p>
//         </div> */}
//       </form>

//       {/* ResponseModal component */}
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

// export default SignUp;
