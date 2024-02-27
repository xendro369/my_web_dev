import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Header = () => {
  const location = useLocation();

  return (
    <header >
      <div className="flex p-4 px-20 justify-between bg-indigo-800 text-white">
        <Link to="/" className={location.pathname === '/' ? 'active font-bold px-2' : 'font-normal px-2'}>
          My Company Name
        </Link>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
