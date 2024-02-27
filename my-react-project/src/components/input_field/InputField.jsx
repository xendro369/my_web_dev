// InputField.jsx
import React from 'react';

const InputField = ({ label, name, type, value, onChange, required, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-700 font-normal mb-2">
      {label}:
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${
        error ? 'border-red-500' : ''
      }`}
    />
    {error && (
      <span id={`${name}_error`} className="error-message text-red-500 text-sm">
        {error}
      </span>
    )}
  </div>
);

export default InputField;

