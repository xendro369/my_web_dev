import React, { useState } from 'react';

export default function Service() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">This is Service Page!</h1>
        <p className="text-lg leading-relaxed text-gray-700">
          We offer a range of services to make the admission process smooth and efficient:
        </p>
      </div>

      <ul className="list-disc pl-8">
        <li className="mb-4">Online Application Form</li>
        <li className="mb-4">Document Submission</li>
        <li className="mb-4">Application Review</li>
        <li>Admission Confirmation</li>
      </ul>
    </div>
  );
}
