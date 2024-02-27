import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomeContent from './components/HomeContent';
import Footer from './components/Footer';
import About from './components/about/About';
import Service from './components/service/Service';
import ContactPage from './components/contact/ContactPage';
import Login from './components/login-signup-logout/Login';
import SignUp from './components/login-signup-logout/SignUp';
import LogOut from './components/login-signup-logout/LogOut';
import Courses from './components/course_card/Courses';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ChangePasswordForm from './components/forgot-password/ChangePasswordForm';
// import TestSeries from './components/test_series/TestSeries';
import TestArea from './components/test_series/TestArea';
import TestSeriesTable from './components/test_series/TestSeriesTable';
import GenPaper from './components/test_series/question_paper/GenPaper'
import ViewAnalytics from './components/test_series/viewAnalytics/ViewAnalytics';

export default function App() {

  return (
    
    <Router> {/* Wrap Header and routes within Router */}
      <div className="w-full h-screen bg-white-100 text-black">
        {/* <div className="w-full h-screen bg-white-100 text-black"> */}
        <Header  /> {/* Now within Router context */}
        <div className='p-4 px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40 2xl:px-64'>
        {/* <div className='p-4 px-20'> */}
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/courses" element={<Courses />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/logout" element={<LogOut />} />
            <Route path="/testseries" element={<TestArea />} />
            <Route path="/testseries/:link" element={<TestSeriesTable />} />
            <Route path="/genpaper/:link" element={<GenPaper />} />
            <Route path="/view/:link" element={<ViewAnalytics />} />
            {/* <Route path="/forgot_password" element={<ForgotPassword />} /> */}
            {/* <Route path="/change_passwordform" element={<ChangePasswordForm />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
