import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // {type, message}
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API || 'http://localhost:5000'}/api/auth/forgot-password`, { email });
      setStatus({ type: 'success', message: 'If that email exists you will receive a reset link.' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: (err.response?.data?.message) || 'Server error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Forgot Password</h5>
            <p className="text-muted">Enter your account email and we'll send a link to reset your password.</p>

            {status && <Notification type={status.type === 'error' ? 'error' : 'success'} message={status.message} />}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
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
