import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type, message }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (password.length < 6) {
      setStatus({ type: 'error', message: 'Password should be at least 6 characters.' });
      return;
    }
    if (password !== confirm) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API || 'https://password-reset-backend-3w9o.onrender.com'}/api/auth/register`,
        { email, password, confirmPassword: confirm }
      );
      setStatus({ type: 'success', message: 'Registration successful. You may now log in.' });
      setEmail('');
      setPassword('');
      setConfirm('');
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Register</h5>

            {status && <Notification type={status.type} message={status.message} />}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
              <div className="mt-3">
                <small className="text-muted">
                  Already have an account? <a href="/login">Log in</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}