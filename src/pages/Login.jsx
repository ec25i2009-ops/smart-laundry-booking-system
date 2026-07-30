import Button from "../components/Button";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>🧺 Smart Laundry Booking System</h1>

        <p>Login to continue</p>

        <br />

        <input
          type="email"
          placeholder="College Email"
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
          style={{
            width: "300px",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />

        <br />

        <Button text="Login" color="#2563eb" />

        <br />
        <br />

        <p>Don't have an account? Register</p>
      </div>

      <Footer />
    </>
  );
}

export default Login;