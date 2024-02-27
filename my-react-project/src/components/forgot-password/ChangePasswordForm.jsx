import React, { useState, useEffect } from 'react';
import SubmitButton from '../button/SubmitButton';
import ResponseModal from '../response-modal/ResponseModal';
import InputField from '../input_field/InputField';

const ChangePasswordForm = ({ password: initialPassword, username: initialUsername }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [serverResponse, setServerResponse] = useState({ status: null, message: '', redirect: '/' });
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: initialPassword || '',
    new_password: '',
    confirm_new_password: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    new_password: '',
    confirm_new_password: '',
  });

  useEffect(() => {
    setFormData({
      password: initialPassword || '',
      new_password: '',
      confirm_new_password: '',
    });
  }, [initialPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const { password, new_password, confirm_new_password } = formData;
    let formErrors = {};

    if (password === new_password) {
      formErrors = { ...formErrors, new_password: 'New password must be different from the previous one.' };
    }

    if (new_password !== confirm_new_password) {
      formErrors = { ...formErrors, confirm_new_password: 'Confirm new password must match the new password.' };
    }

    setErrors(formErrors);

    return formErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Assume the fetch and response handling logic remains the same
      const response = await fetch(`http://127.0.0.1:5000/password_updated/${initialUsername}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Update the server response state
        setServerResponse(responseData);

        // If registration is successful, open the modal
        if (responseData.status) {
          setModalOpen(true);
        }
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <form
        id="changePasswordForm"
        className="bg-white shadow-md shadow-xl shadow-spread-2 rounded px-8 pt-6 pb-8 w-full sm:max-w-md lg:max-w-lg mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Change Password</h2>
        </div>

        <InputField
          label="Previous Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          required
          error={errors.password}
        />

        <InputField
          label="New Password"
          name="new_password"
          type={showPassword ? 'text' : 'password'}
          value={formData.new_password}
          onChange={handleChange}
          required
          error={errors.new_password}
        />

        <InputField
          label="Confirm New Password"
          name="confirm_new_password"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirm_new_password}
          onChange={handleChange}
          required
          error={errors.confirm_new_password}
        />

        <div className="mb-4">
          <label className="block text-gray-700 font-normal mb-2">
            Show Password:
            <input
              type="checkbox"
              onChange={togglePasswordVisibility}
              className="ml-2"
            />
          </label>
        </div>
        <SubmitButton label="Update" onSubmit={handleSubmit} />
        <ResponseModal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          status={serverResponse.status}
          message={serverResponse.message}
          redirect={serverResponse.redirect}
        />
      </form>
    </div>
  );
};

export default ChangePasswordForm;



// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import SubmitButton from '../button/SubmitButton';
// import ResponseModal from '../response-modal/ResponseModal';
// import InputField from '../input_field/InputField';

// const ChangePasswordForm = () => {
//   const location = useLocation();
//   const password = location.state.password;
//   const username = location.state.username;

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [serverResponse, setServerResponse] = useState({ status: null, message: '', redirect: '/' });
//   const [formData, setFormData] = useState({
//     password: password,
//     new_password: '',
//     confirm_new_password: '',
//   });

//   const [errors, setErrors] = useState({
//     password: '',
//     new_password: '',
//     confirm_new_password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: '' });
//   };

//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const validateForm = () => {
//     const { password, new_password, confirm_new_password } = formData;
//     let formErrors = {};

//     if (password === new_password) {
//       formErrors = { ...formErrors, new_password: 'New password must be different from the previous one.' };
//     }

//     if (new_password !== confirm_new_password) {
//       formErrors = { ...formErrors, confirm_new_password: 'Confirm new password must match the new password.' };
//     }

//     setErrors(formErrors);

//     return formErrors;
//   };

//   const handleSubmit = async () => {
//     const validationErrors = validateForm();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       console.log(formData);
//       // Submit form data to the server
//       const response = await fetch(`http://127.0.0.1:5000/password_updated/${username}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         // Parse the response data
//         const responseData = await response.json();
//         console.log('in server response data');
//         console.log(responseData);
//         // Update the server response state
//         setServerResponse(responseData);
//         console.log(responseData)
//         // If registration is successful, open the modal
//         if (responseData.status) {
//           // Assuming setModalOpen is a state setter function
//           console.log('Updated');
//           setModalOpen(true);
//         }
//       } else {
//         console.error('Submission failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//     }
//   };

//   return (
//     <div>
//       <form
//         id="changePasswordForm"
//         className="bg-white shadow-md shadow-xl shadow-spread-2 rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md lg:max-w-lg mx-auto"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <div className="text-center mb-4">
//           <h2 className="text-2xl font-semibold text-gray-900">Change Password</h2>
//         </div>

//       {/* Use InputField component for previous password */}
//         <InputField
//           label="Previous Password"
//           name="password"
//           type={showPassword ? 'text' : 'password'}
//           value={formData.password}
//           onChange={handleChange}
//           required
//           error={errors.password}
//         />

//         <InputField
//           label="New Password"
//           name="new_password"
//           type={showPassword ? 'text' : 'password'}
//           value={formData.new_password}
//           onChange={handleChange}
//           required
//           error={errors.new_password}
//         />

//         <InputField
//           label="Confirm New Password"
//           name="confirm_new_password"
//           type={showPassword ? 'text' : 'password'}
//           value={formData.confirm_new_password}
//           onChange={handleChange}
//           required
//           error={errors.confirm_new_password}
//         />

//         <div className="mb-4">
//           <label className="block text-gray-700 font-normal mb-2">
//             Show Password:
//             <input
//               type="checkbox"
//               onChange={togglePasswordVisibility}
//               className="ml-2"
//             />
//           </label>
//         </div>
//         <SubmitButton label="Update" onSubmit={handleSubmit} />
//         <ResponseModal
//           isOpen={isModalOpen}
//           onRequestClose={() => setModalOpen(false)}
//           status={serverResponse.status}
//           message={serverResponse.message}
//           redirect={serverResponse.redirect}
//         />
//       </form>
//     </div>
//   );
// };

// export default ChangePasswordForm;
