import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBarTabs = ({ tabs }) => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <ul className="flex">
      {tabs.map((tab) => (
        // Conditionally render the tab based on login status
        (isLoggedIn || tab.path === '/login' || tab.path === '/signup') && (
          <li key={tab.path} className={location.pathname === tab.path ? 'active font-bold' : 'font-normal'}>
            <Link to={tab.path} className="px-2">{tab.label}</Link>
          </li>
        )
      ))}
    </ul>
  );
};

export default NavBarTabs;
