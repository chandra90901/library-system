import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HelloWorld from './HelloWorld';
import reportWebVitals from './reportWebVitals';
import SignUp from './Project/signup';
import Login from './Project/login';
import TableRender from './TableRender';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <TableRender /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Project/signup" />} />
        <Route path="/Project/signup" element={<SignUp />} />
        <Route path="/Project/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
