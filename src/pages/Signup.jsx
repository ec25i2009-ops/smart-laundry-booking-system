import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const inputContainer = {
    position: "relative",
    width: "320px",
    margin: "0 auto 18px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 45px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  };

  const leftIcon = {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b7280",
  };

  const rightIcon = {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#6b7280",
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
        }}
      >
        <h1>🧺 Smart Laundry Booking System</h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Create your IIITDM Laundry Account
        </p>

        {/* Name */}

        <div style={inputContainer}>
          <FaUser style={leftIcon} />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Email */}

        <div style={inputContainer}>
          <FaEnvelope style={leftIcon} />

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Password */}

        <div style={inputContainer}>
          <FaLock style={leftIcon} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <span
            style={rightIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Hostel */}

        <div style={inputContainer}>
          <FaBuilding style={leftIcon} />

          <select
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Hostel</option>
            <option value="Jasmine">Jasmine</option>
            <option value="Ashoka">Ashoka</option>
            <option value="Jasmine Annex">Jasmine Annex</option>
            <option value="Ashwatha">Ashwatha</option>
          </select>
        </div>

        {error && (
          <p
            style={{
              color: "#dc2626",
              fontWeight: "500",
              marginBottom: "18px",
            }}
          >
            {error}
          </p>
        )}

        <Button
          text="Create Account"
          color="#2563eb"
          onClick={handleSignup}
        />

        <br />
        <br />

        <p style={{ color: "#555" }}>
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Signup;