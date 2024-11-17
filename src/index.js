import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const basename = '/Depaul-Uni-Exam-Form-Pay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename={basename}>
    <App />
  </Router>
);