import React from 'react';

const CourseCard = ({ imageSrc, altText, title, onClickHandler }) => {
  return (
    <div
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <img src={imageSrc} alt={altText} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <a href="#" className="text-blue-500 mt-2 hover:underline hover:text-blue-500" onClick={(e) => onClickHandler(e, title)}>
          Enroll Now for {title}
        </a>
      </div>
    </div>
  );
};

export default CourseCard;
