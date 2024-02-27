import React from 'react';

const LoginSignupModal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div> {/* Overlay */}

      <div className="relative">
        <div className="bg-white rounded shadow-md" style={{ maxHeight: '85vh', overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;











// import React from 'react';
// import SubmitButton from '../button/SubmitButton';

// const LoginSignupModal = ({ onClose, children }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded shadow-md" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
//         {children}
//         <SubmitButton label="Close" onSubmit={onClose} />
//       </div>
//     </div>
//   );
// };

// export default LoginSignupModal;
