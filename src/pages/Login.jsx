function Login() {
  return (
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

      <button
        style={{
          width: "320px",
          padding: "12px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Login
      </button>

      <br />
      <br />

      <p>Don't have an account? Register</p>
    </div>
  );
}

export default Login;