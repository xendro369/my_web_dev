import React from 'react';
import CourseCard from './CourseCard'; // Adjust the path accordingly
// import pythonImage from '../assets/python-img.jpg';
import pythonImage from '../../assets/python-img.jpg';

const Courses = ({limited}) => {
  const enrollCourse = (event, courseName) => {
    event.preventDefault();
    // Add your logic for enrolling in the course
    console.log(`Enrolling in ${courseName}`);
  };

  const courses = [
    { imageSrc: pythonImage, altText: 'Python Image', title: 'Python' },
    { imageSrc: pythonImage, altText: 'Java Image', title: 'Java' },
    { imageSrc: pythonImage, altText: 'JavaScript Image', title: 'JavaScript' },
    { imageSrc: pythonImage, altText: 'Online Assistance Image', title: 'Online Assistance' },
    { imageSrc: pythonImage, altText: 'Online Mentoring Image', title: 'Online Mentoring' },
    // Add more courses as needed
  ];

  const coursesToShow = limited ? courses.slice(0, 3) : courses;

  return (
    <div>
        <div className="text-3xl font-bold text-center p-2">Courses & Services</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> 
        {coursesToShow.map((course, index) => (
          <CourseCard
            key={index}
            imageSrc={course.imageSrc}
            altText={course.altText}
            title={course.title}
            onClickHandler={enrollCourse}
            className="rounded-lg shadow-md overflow-hidden"
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;

