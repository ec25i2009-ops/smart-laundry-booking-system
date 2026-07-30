import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { signUp } from "../authService";

const inputStyle = {
  width: "300px",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
};

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hostel, setHostel] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSignup() {
    setError("");

    // Validate fields
    if (!name || !email || !password || !hostel) {
      setError("Please fill in all the fields.");
      return;
    }

    // Restrict to IIITDM email addresses
    if (!email.endsWith("@iiitdm.ac.in")) {
      setError("Please use your IIITDM institute email.");
      return;
    }

    try {
      await signUp(email, password, name, hostel);

      // Navigate to Home after successful signup
      navigate("/home");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;

        case "auth/weak-password":
          setError("Password should be at least 6 characters long.");
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
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>🧺 Smart Laundry Booking System</h1>

        <p>Create an account</p>

        <br />

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <br />

        <input
          type="email"
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <br />

        <select
          value={hostel}
          onChange={(e) => setHostel(e.target.value)}
          style={inputStyle}
        >
          <option value="" disabled>
            Select hostel
          </option>
          <option value="Jasmine">Jasmine</option>
          <option value="Ashoka">Ashoka</option>
          <option value="Jasmine Annex">Jasmine Annex</option>
          <option value="Ashwatha">Ashwatha</option>
        </select>

        <br />

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
          text="Sign Up"
          color="#2563eb"
          onClick={handleSignup}
        />

        <br />
        <br />

        <p>
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Signup;