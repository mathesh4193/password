import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const API = "https://password-reset-backend-ez4b.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (password !== confirm) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/register`, {
        email, password, confirmPassword: confirm
      });

      setStatus({ type: 'success', message: 'Registration successful.' });
      setEmail('');
      setPassword('');
      setConfirm('');
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Error registering.' });
    }
    setLoading(false);
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-sm-10 col-md-5">
        <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
          <div className="card-body p-4">

            <h4 className="text-center mb-4 fw-bold">Create Account</h4>

            {status && <Notification type={status.type} message={status.message} />}

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ padding: "10px" }}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: "10px" }}
                  />

                  {/* Eye Toggle */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
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
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    style={{ padding: "10px" }}
                  />

                  {/* Eye Toggle */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <i className={`bi ${showConfirm ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                  </button>

                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 mt-2"
                style={{ padding: "10px", fontWeight: 600 }}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {/* Login Link */}
              <div className="mt-3 text-center">
                <span className="text-muted">Already have an account? </span>
                <a
                  href="/login"
                  className="fw-semibold"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </a>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
