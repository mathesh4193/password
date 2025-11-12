import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const query = useQuery();
  const token = query.get('token');
  const email = query.get('email');
  const navigate = useNavigate();

  const [validating, setValidating] = useState(true);
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function validate() {
      if (!token || !email) {
        setStatus({ type: 'error', message: 'Missing token or email in URL.' });
        setValidating(false);
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_API || 'https://password-reset-backend-ez4b.onrender.com'}/api/auth/validate-reset-token`, {
          params: { token, email }
        });
        if (res.data.valid) {
          setValid(true);
        } else {
          setStatus({ type: 'error', message: res.data.message || 'Invalid token.' });
        }
      } catch (err) {
        console.error('Token validation error:', err);
        setStatus({ type: 'error', message: (err.response?.data?.message) || 'Invalid or expired token.' });
      } finally {
        setValidating(false);
      }
    }
    validate();
  }, [token, email]);

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(null);
    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirm) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_API}/api/auth/reset-password`, { email, token, newPassword });
      setStatus({ type: 'success', message: 'Password updated. Redirecting to login...' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: (err.response?.data?.message) || 'Server error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (validating) return <div className="alert alert-info">Validating link...</div>;

  if (!valid) {
    return (
      <div className="col-md-8 mx-auto">
        <div className="card p-4">
          <h5>Invalid or expired link</h5>
          <p className="text-muted">The password reset link is invalid or has expired. Please request a new link.</p>
          {status && <Notification type="error" message={status.message} />}
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Reset Password</h5>
            <p className="text-muted">Enter your new password for <strong>{email}</strong></p>

            {status && <Notification type={status.type === 'error' ? 'error' : 'success'} message={status.message} />}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">New password</label>
                <input className="form-control" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm password</label>
                <input className="form-control" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Password'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
