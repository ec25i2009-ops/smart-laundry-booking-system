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

        <p>Login to continue</p>

        <br />

        <input
          type="email"
          placeholder="College Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        />

        <br />

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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button text="Login" color="#2563eb" onClick={handleLogin} />

        <br />
        <br />

        <p>
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Login;