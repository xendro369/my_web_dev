// TestSeriesCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const TestSeriesCard = ({ title, link }) => {
  // console.log(title);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <div className="mb-4">
          {/* You can customize the content here if needed */}
        </div>
        {console.log('Title before Link:', title)}
        <Link
          to={{ pathname: `/testseries${link}`}}
          className="text-blue-500 hover:underline"
        >
          View Test Series
        </Link>
      </div>
    </div>
  );
};

export default TestSeriesCard;
