import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type, message }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API || 'https://password-reset-backend-se7q.onrender.com'}/api/auth/login`,
        { email, password }
      );

      setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Login failed. Please check your credentials.',
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
            <h5 className="card-title">Login</h5>

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
                <small className="text-muted">
                  <a href="/forgot-password">Forgot password?</a>
                </small>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div className="mt-3">
                <small className="text-muted">
                  Don't have an account? <a href="/register">Register</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}