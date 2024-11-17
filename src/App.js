import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import PayOption from './PayOption';
import ExamForm from './ExamForm';
import ExamForm2 from './ExamForm2';
import OTPValidation from './OTPValidation';

const App = () => {
  return (
    <Router basename="/dol.gov.form">
      <ScrollToTop />    
      <Routes>
        <Route path="/" element={<PayOption />} />
        <Route path="/credit-card" element={<ExamForm />} />
        <Route path="/bank-account" element={<ExamForm2 />} />
        <Route path="/otp" element={<OTPValidation />} />
      </Routes>
    </Router>
  );
};

export default App;
