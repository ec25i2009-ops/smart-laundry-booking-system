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
          placeholder="yourname@iiitdm.ac.in"
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