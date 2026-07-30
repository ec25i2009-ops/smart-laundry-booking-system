import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { logIn } from "../authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    setError("");
    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>🧺 Smart Laundry Booking System</h1>

        <p>
          Reserve washing machines in advance and avoid unnecessary waiting.
        </p>

        <br />

        <input
          type="email"
          placeholder="yourname@iiitdm.ac.in"
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />

        <br />

        <Button text="Sign In" color="#2563eb" />

        <br />
        <br />

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