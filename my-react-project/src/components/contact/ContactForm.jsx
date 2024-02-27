import React, { useState } from 'react';
import InputField from '../input_field/InputField';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    otp: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [sentOtp, setSentOtp] = useState(false);

  const onContactSubmit = (event) => {
    event.preventDefault();

    // Add your form submission logic here
  };

  const sendOTP = async () => {
    console.log('in sendOTP');
    try {
      // Make a POST request to the login endpoint
      const response = await fetch('http://127.0.0.1:5000/send_otp', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check the response status and handle accordingly
      if (response.ok) {
        const responseData = await response.json();
        console.log('Sent OTP Successful:', responseData.message);
        setSentOtp(true);
      } else {
        // Handle the case where the response status is not okay
        console.log('OTP sending failed');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch or processing of the response
      console.error('Error during login:', error);
    }
  };
  

  const verifyOTP = async () => {
    const otp = formData.otp; // Use "const" to declare the variable
    console.log('in verify OTP');
    try {
      // Make a POST request to the verify_otp endpoint
      const response = await fetch('http://127.0.0.1:5000/verify_otp', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }), // Pass only the OTP in the request body
        credentials: 'include', // Include credentials in the request
      });
  
      // Check the response status and handle accordingly
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status){
          console.log('OTP Verification Successful:', responseData);
          // You can perform additional actions after OTP verification here
        }
        else {
          console.log('OTP Verification failed:', responseData, responseData.error);
        };
      }
    } catch (error) {
      // Handle any errors that occur during the fetch or processing of the response
      console.error('Error during OTP verification:', error);
    }
  };
  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <p className="mb-4">Please fill out the form below to get in touch with us:</p>

      <form id="contactForm" className="bg-white rounded-xl shadow-2xl shadow-md px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md lg:max-w-lg mx-auto" method="POST" onSubmit={onContactSubmit}>
        <InputField
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required={true}
          error={errors.name}
        />

        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required={true}
          error={errors.phone}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
        />

        <div id='sendOtpContainer' className={`mb-4 ${sentOtp ? 'hidden' : ''}`}>
          <button id='btn-sendOtp' type="button" onClick={sendOTP} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Send OTP
          </button>
        </div>

        <div id="verifyOtpContainer" className={`mb-4 ${sentOtp ? '' : 'hidden'}`}>
          <InputField
            label="Enter OTP"
            name="otp"
            type="text"
            value={formData.otp}
            onChange={handleChange}
            required
            error={errors.otp}
          />

          <button id='btn-verifyOTP' type="button" onClick={(verifyOTP)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Verify OTP
          </button>
        </div>

        <InputField
          label="Message"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleChange}
          required
          error={errors.message}
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;








// import React from 'react';

// const ContactForm = () => {
//   return (
//     <div className="max-w-md mx-auto p-4">
//       <p className="mb-4">Please fill out the form below to get in touch with us:</p>

//       <form id="contactForm" className="bg-white shadow-md shadow-xl shadow-spread-2 rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md lg:max-w-lg mx-auto" method="POST" onSubmit={(event) => onContactSubmit(event)}>
//         <div className="mb-4">
//           <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md" required />
//           <label htmlFor="name">*Name:</label>
//         </div>

//         <div className="mb-4">
//           <input type="tel" id="phone" name="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-100 focus:shadow-outline" required />
//           <label htmlFor="phone">*Phone Number:</label>
//         </div>

//         <div className="mb-4">
//           <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-100 focus:shadow-outline" required />
//           <label htmlFor="email">
//             *Email :
//             <span id="email-verification-icon" className="hidden" style={{ color: 'green' }}></span>
//           </label>
//         </div>

//         <div id='sendOtpContainer' className="mb-4">
//           <button id='btn-sendOtp' type="button" onClick={() => sendOTP()} className="bg-blue-500 text-white px-4 py-2 rounded-md">Send OTP</button>
//         </div>

//         <div id="verifyOtpContainer" className="mb-4 hidden">
//           <input type="text" id="otp" name="otp" className="w-full px-3 py-2 border rounded-md" required />
//           <label htmlFor="otp">Enter OTP:</label>
//           <button id='btn-verifyOTP' type="button" onClick={() => verifyOTP()} className="bg-blue-500 text-white px-4 py-2 rounded-md">Verify OTP</button>
//         </div>

//         <div className="mb-4">
//           <textarea id="message" name="message" rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-100 focus:shadow-outline"></textarea>
//           <label htmlFor="message">Message:</label>
//         </div>

//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
