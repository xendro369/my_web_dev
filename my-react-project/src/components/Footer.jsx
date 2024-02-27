import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between bg-slate-600 text-white">
        {/* <div>
          <img src={process.env.PUBLIC_URL + '/images.jpg'} alt="Company Logo" />
        </div> */}
        <div className='p-4'>
          <p>&copy; 2023 Your Company Name</p>
          <p>Contact us: contact@yourcompany.com</p>
        </div>
        <div className='p-4'>
          <p>New Delhi</p>
          <p>Canaught Place</p>
          <p>Phone: 471415836</p>
          <p>Email: dfvj@gmail.com</p>
        </div>
        <div className='p-4'>
          <a href="#"><p>whatsapp</p></a>
          <a href="#"><p>facebook</p></a>
          <a href="#"><p>twitter</p></a>
          <a href="#"><p>linkedin</p></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
