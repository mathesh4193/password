import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';
import { useLocation, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const query = useQuery();
  const token = query.get('token');
  const email = query.get('email');

  const navigate = useNavigate();
  const API = "https://password-reset-backend-ez4b.onrender.com";

  const [valid, setValid] = useState(false);
  const [validating, setValidating] = useState(true);
  const [status, setStatus] = useState(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function validateToken() {
      try {
        const res = await axios.get(`${API}/api/auth/validate-reset-token`, {
          params: { token, email }
        });
        setValid(res.data.valid);
      } catch {
        setValid(false);
      }
      setValidating(false);
    }
    validateToken();
  }, [token, email, API]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (newPassword !== confirm) {
      setStatus({ type: "error", message: "Passwords do not match" });
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/api/auth/reset-password`, {
        email, token, newPassword
      });

      setStatus({ type: "success", message: "Password updated!" });
      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      setStatus({ type: "error", message: "Server error" });
    }
    setSubmitting(false);
  };

  if (validating) return <div className="alert alert-info">Validating...</div>;
  if (!valid) return <div className="alert alert-danger">Invalid or expired link.</div>;

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-sm-10 col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">

            <h5 className="fw-bold">Reset Password</h5>
            <p className="text-muted">For: <b>{email}</b></p>

            {status && <Notification type={status.type} message={status.message} />}

            <form onSubmit={handleSubmit}>

              {/* New Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <div className="input-group">
                  <input
                    type={showNew ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowNew(!showNew)}
                  >
                    <i className={`bi ${showNew ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <i className={`bi ${showConfirm ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                  </button>
                </div>
              </div>

              <button className="btn btn-primary mt-2" type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Password"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
