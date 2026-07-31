import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { logIn, resetPassword } from "../authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    setError("");

    // Restrict login to IIITDM email addresses
    if (!email.endsWith("@iiitdm.ac.in")) {
      setError("Please use your IIITDM institute email.");
      return;
    }

    try {
      await logIn(email, password);

      // Navigate to Home after successful login
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
    setError("Please enter your email first.");
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
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <h1>🧺 Smart Laundry Booking System</h1>

        <p>
          Reserve washing machines in advance and avoid unnecessary waiting.
        </p>

        <br />

        <input
          type="email"
          placeholder="your_roll_no@iiitdm.ac.in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
          }}
        />

        <p
          style={{
            fontSize: "14px",
            color: "#666",
            marginTop: "8px",
            marginBottom: "15px",
          }}
        >
          Only IIITDM Kancheepuram institute email addresses are allowed.
        </p>

        {/* Password Field with Eye Icon */}
        <div
          style={{
            position: "relative",
            width: "300px",
            margin: "0 auto 20px",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 40px 10px 10px",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#666",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <p
  onClick={handleForgotPassword}
  style={{
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "15px",
    textAlign: "right",
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  Forgot Password?
</p>

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        <Button
          text="Sign In"
          color="#2563eb"
          onClick={handleLogin}
        />

        <br />
        <br />

        <p
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          Don't have an account?{" "}
          <Link to="/signup">Register</Link>
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          Access is restricted to IIITDM Kancheepuram students, faculty and
          staff.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Login;