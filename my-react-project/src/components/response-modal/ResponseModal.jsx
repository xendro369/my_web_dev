import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const ResponseModal = ({ isOpen, onRequestClose, status, message, redirect }) => {
  return (

    <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  className="fixed inset-0 overflow-y-auto z-50" // Tailwind classes for positioning and overflow
>
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
      &#8203;
    </span>
    <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{status ? 'Success!' : 'Error'}</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        {redirect && (
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => window.location.replace(redirect)}
          >
            {status ? 'Continue' : 'Close'}
          </button>
        )}
      </div>
    </div>
  </div>
</Modal>




    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={onRequestClose}
    //   style={{
    //     overlay: {
    //       backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //     },
    //     content: {
    //       border: 'none',
    //       background: 'white',
    //       borderRadius: '8px',
    //       maxWidth: '400px',
    //       margin: 'auto',
    //       textAlign: 'center',
    //     },
    //   }}
    // >
    //   <h2>{status ? 'Success!' : 'Error'}</h2>
    //   <p>{message}</p>
    //   {redirect && (
    //     <button onClick={() => window.location.replace(redirect)}>
    //       {status ? 'Continue' : 'Close'}
    //     </button>
    //   )}
    // </Modal>
  );
};

export default ResponseModal;
