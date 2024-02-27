import React, { useState } from 'react';
// import yourImage1 from '../assets/abc.jpg';
// import yourImage2 from '../assets/abc.jpg';
// import yourImage3 from '../assets/abc.jpg';
import yourImage1 from '../assets/abc.jpg';
import yourImage2 from '../assets/java-image.jpg';
import yourImage3 from '../assets/online_mentoring.jpg';
import Courses from './course_card/Courses';
import ContactPage from './contact/ContactPage'
import { Link } from 'react-router-dom';
import TestArea from './test_series/TestArea';

const HomeContent = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [yourImage1, yourImage2, yourImage3];

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  const changeImage = (index) => {
    setCurrentImage(index);
  };
 
  return (
    <main>
      <div className="flex flex-col p-4 md:flex-row rounded-xl shadow-xl shadow-md shadow-top">
        <div className="flex flex-col items-center px-4 py-8 md:w-1/2 space-y-8">
          <h1 className="text-3xl font-bold text-center md:text-left">Start learning with Us</h1>
          <p className="text-base leading-relaxed text-gray-700">
            "Embark on a transformative journey with us and shape your career. Learn programming from industry experts who will serve as your mentors, guiding you every step of the way.<br />
            Join our courses and gain the knowledge and skills needed to succeed in the world of programming and technology."
          </p>
          <button className="py-2 px-4 text-base font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600">Enroll Now</button>
        </div>
        <div className="relative flex items-center py-8 md:w-1/2 overflow-hidden">
          <div className="flex transition-transform ease-in-out duration-300 transform -translate-x-full" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Program Image ${index + 1}`} className="object-full w-auto h-auto rounded-md shadow-lg" />
            ))}
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <button onClick={prevImage} className="text-white bg-transparent hover:bg-gray-700 transition-colors p-2 rounded-full">
              Prev
            </button>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <button onClick={nextImage} className="text-white bg-transparent hover:bg-gray-700 transition-colors p-2 rounded-full">
              Next
            </button>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => changeImage(index)}
                className={`mx-2 w-4 h-4 rounded-full focus:outline-none transition-colors ${
                  index === currentImage ? 'bg-gray-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='p-4'>                
          <TestArea limited/>
          <div className=' flex justify-end text-blue-500 hover:underline ml-auto p-4'>
            <Link to="/testseries">View All Tests</Link>
          </div>
      </div>
      <div className='p-4'>
          <Courses limited />
          <div className=' flex justify-end text-blue-500 hover:underline ml-auto p-4'>
            <Link to="/courses">View All Courses</Link>
          </div>
      </div>

      <div className="text-3xl font-bold text-center">We are available anytime, anywhere</div>

      <div className='m-4 p-4'>
        <ContactPage />
      </div>

    </main>
  );
};

export default HomeContent;
