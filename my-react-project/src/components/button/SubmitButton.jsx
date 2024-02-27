// SubmitButton.jsx
import React from 'react';

function SubmitButton({ label, onSubmit }) {
  const handleClick = (event) => {
    event.preventDefault(); // Prevent default button behavior
    onSubmit(); // Call the onSubmit function passed as a prop
  };

  return (
    <div className="mt-6 text-center">
      <button
        type="button" // Change to type="button" to prevent form submission
        className="w-48 py-1 px-4 text-sm bg-blue-500 text-white font-bold rounded-md h-8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
}

export default SubmitButton;
