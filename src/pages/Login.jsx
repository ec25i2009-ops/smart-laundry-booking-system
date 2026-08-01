import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { logIn, resetPassword } from "../authService";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    setError("");

    if (!email.endsWith("@iiitdm.ac.in")) {
      setError("Please use your IIITDM institute email.");
      return;
    }

    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found. Please register first.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        case "auth/invalid-email":
          setError("Invalid email format.");
          break;

        default:
          setError("Login failed. Please try again.");
      }
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError("Please enter your institute email first.");
      return;
    }

    if (!email.endsWith("@iiitdm.ac.in")) {
      setError("Please use your IIITDM institute email.");
      return;
    }

    try {
      await resetPassword(email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/invalid-email":
          setError("Invalid email format.");
          break;

        default:
          setError("Unable to send password reset email.");
      }
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="login-card">

          <h1>
            Smart Laundry
            <span className="title-second-line">
              Booking System
            </span>
          </h1>

          <p className="subtitle">
            Reserve washing machines in advance and avoid unnecessary waiting.
          </p>

          <input
            type="email"
            placeholder="your_roll_no@iiitdm.ac.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <p className="email-note">
            Use your IIITDM Kancheepuram institute email.
          </p>

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <p
            className="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <Button
            text="Sign In"
            color="#F9564F"
            onClick={handleLogin}
          />

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/">
            </Link>
            <Link to="/signup">
              Register
            </Link>
          </p>

          <p className="access-text">
            Access is restricted to IIITDM Kancheepuram students,
            faculty and staff.
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;