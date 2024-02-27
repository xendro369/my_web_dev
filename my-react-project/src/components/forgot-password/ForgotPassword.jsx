import React, { useState } from 'react';
import SubmitButton from '../button/SubmitButton';
import InputField from '../input_field/InputField';

const ForgotPassword = ({onSubmit}) => {

  const [formData, setFormData] = useState({
    username: ''
  });
  const [errors, setErrors] = useState({});

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

    return errors;
  };

  const handleSubmit = async () => {
    // Validate form data
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Submit form data to the server
      const response = await fetch(`http://127.0.0.1:5000/update_password_1/${formData.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Parse the response data
        console.log("in submit forgot password ");

        const responseData = await response.json();
        console.log(responseData);

        // If registration is successful, open the modal
        if (responseData.status) {
          console.log(responseData.password, responseData.redirect)
          onSubmit({
            password: responseData.password,
            username: responseData.username,
          });
          // navigate('/change_passwordform', { state: { password: responseData.password, username : responseData.username } });
        } else {
          console.error('Submission failed:', responseData.message);  
          alert(responseData.message);        
        }
      } else {
        setRedirect(response.statusText);
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };
  
  return (
    <>
    <form id="forgotPasswordForm" className="bg-white shadow-md shadow-xl shadow-spread-2 rounded px-8 pt-6 pb-8 w-full sm:max-w-md lg:max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Forgot Password</h2>
      </div>
      
      {/* {renderInput('Enter your username to reset your password:', 'username', 'username')} */}
      <InputField
          label="Enter your username to reset your password:"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required={true}
          error={errors.username}
        />
      <SubmitButton label="Reset Password" onSubmit={handleSubmit} />
    </form>
    </>
  );
}

export default ForgotPassword;


// const renderInput = (label, name, type = 'text') => (
//   <div className="mb-4">
//     <label htmlFor={name} className="block text-gray-700 font-normal mb-2">
//       {label}:
//     </label>
//     <input
//       type={type}
//       id={name}
//       name={name}
//       value={formData[name]}
//       onChange={handleChange}
//       required
//       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//     />
//     <span id={`${name}_error`} className="error-message text-red-500 text-sm">
//       {errors[name]}
//     </span>
//   </div>
// );