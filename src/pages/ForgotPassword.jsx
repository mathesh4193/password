import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = "https://password-reset-backend-ez4b.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      await axios.post(`${API}/api/auth/forgot-password`, { email });
      setStatus({ type: 'success', message: 'If that email exists you will receive a reset link.' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Server error' });
    }

    setLoading(false);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Forgot Password</h5>
            <p className="text-muted">Enter your email and we will send a reset link.</p>

            {status && <Notification type={status.type} message={status.message} />}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
