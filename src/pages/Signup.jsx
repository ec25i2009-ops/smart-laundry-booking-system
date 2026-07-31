import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
} from "react-icons/fa";

import Button from "../components/Button";
import Footer from "../components/Footer";
import { signUp } from "../authService";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hostel, setHostel] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSignup() {
    setError("");

    if (!name || !email || !password || !hostel) {
      setError("Please fill in all the fields.");
      return;
    }

    if (!email.endsWith("@iiitdm.ac.in")) {
      setError("Please use your IIITDM institute email.");
      return;
    }

    try {
      await signUp(email, password, name, hostel);
      navigate("/home");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;

        case "auth/weak-password":
          setError("Password should contain at least 6 characters.");
          break;

        case "auth/invalid-email":
          setError("Invalid email address.");
          break;

        default:
          setError("Signup failed. Please try again.");
      }
    }
  }

  return (
    <>
      <div className="signup-page">
        <div className="signup-card">

          <h1>Smart Laundry</h1>
          <h2>Create Account</h2>

          <p className="subtitle">
            Create your IIITDM Laundry Account
          </p>

          {/* Name */}

          <div className="input-container">
            <FaUser className="left-icon" />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="signup-input"
            />
          </div>

          {/* Email */}

          <div className="input-container">
            <FaEnvelope className="left-icon" />

            <input
              type="email"
              placeholder="College Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
            />
          </div>

          {/* Password */}

          <div className="input-container">
            <FaLock className="left-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
            />

            <span
              className="right-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Hostel */}

          <div className="input-container">
            <FaBuilding className="left-icon" />

            <select
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              className="signup-input"
            >
              <option value="">Select Hostel</option>
              <option value="Jasmine">Jasmine</option>
              <option value="Ashoka">Ashoka</option>
              <option value="Jasmine Annex">Jasmine Annex</option>
              <option value="Ashwatha">Ashwatha</option>
            </select>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <Button
            text="Create Account"
            color="#F9564F"
            onClick={handleSignup}
          />

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Signup;