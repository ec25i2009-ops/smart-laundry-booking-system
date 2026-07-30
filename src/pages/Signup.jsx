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
    if (!hostel) {
      setError("Please select your hostel.");
      return;
    }
    try {
      await signUp(email, password, name, hostel);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
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
          <option value="" disabled>Select hostel</option>
          <option value="Jasmine">Jasmine</option>
          <option value="Ashoka">Ashoka</option>
          <option value="Jasmine Annex">Jasmine Annex</option>
          <option value="Ashwatha">Ashwatha</option>
        </select>
        <br />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button text="Sign up" color="#2563eb" onClick={handleSignup} />

        <br />
        <br />

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Signup;