import React, { useState } from "react";
import axios from "axios";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API = "https://password-reset-backend-ez4b.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      await axios.post(`${API}/api/auth/login`, { email, password });
      setStatus({ type: "success", message: "Login successful 🎉" });
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Login failed.",
      });
    }

    setLoading(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f8f9fa" }}
    >
      <div
        className="shadow-sm bg-white p-4"
        style={{
          width: "100%",
          maxWidth: "380px",
          borderRadius: "12px",
          border: "1px solid #e6e6e6",
        }}
      >
        <h3 className="text-center mb-4 fw-bold">Login</h3>

        {status && <Notification type={status.type} message={status.message} />}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              style={{ padding: "10px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                style={{ padding: "10px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                  }`}
                ></i>
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary w-100 mt-2"
            style={{ padding: "10px", fontWeight: 600 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-3 text-center">
            <span className="text-muted">Don't have an account? </span>
            <a href="/register" className="fw-semibold" style={{ textDecoration: "none" }}>
              Register
            </a>
          </div>

        </form>
      </div>
    </div>
  );
}
