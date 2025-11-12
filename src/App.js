import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  return (
    <div className="container py-5">
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>Password Reset Demo</h2>
        <nav>
          <a href='/login' className='btn btn-primary'>Login</a>
          <a href='/forgot-password' className='btn btn-secondary ms-2'>Forgot Password</a>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}
