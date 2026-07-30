import Button from "../components/Button";
import Footer from "../components/Footer";

function Login() {
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