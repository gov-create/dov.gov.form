import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import PayOption from './PayOption';
import ExamForm from './ExamForm';
import ExamForm2 from './ExamForm2';
import OTPValidation from './OTPValidation';

const App = () => {
  return (
    <>
      <ScrollToTop />    
      <Routes>
        <Route path="/" element={<PayOption />} />
        <Route path="/credit-card" element={<ExamForm />} />
        <Route path="/bank-account" element={<ExamForm2 />} />
        <Route path="/otp" element={<OTPValidation />} />
      </Routes>
    </>
  );
};

export default App;
