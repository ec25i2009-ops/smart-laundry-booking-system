import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { logOut } from "../authService";

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
        }}
      >
        <h1>🧺 Smart Laundry Dashboard</h1>

        <h2>Welcome!</h2>

        <p>Here is an overview of your laundry bookings.</p>

        <br />

        <div
          style={{
            display: "inline-block",
            textAlign: "left",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        >
          <p>🧺 <strong>Total Machines:</strong> 12</p>
          <p>✅ <strong>Available Machines:</strong> 8</p>
          <p>📅 <strong>My Booking:</strong> None</p>
        </div>

        <br />

        <Button
          text="Book Machine"
          color="#2563eb"
          onClick={() => navigate("/booking")}
        />

        <br />

        <Button
          text="View Machines"
          color="#10b981"
          onClick={() => navigate("/machines")}
        />

        <br />

        <Button
          text="Logout"
          color="#ef4444"
          onClick={handleLogout}
        />
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;