import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { logOut } from "../authService";

function Home() {
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

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h1>🧺 Smart Laundry Booking System</h1>

        <h2>Welcome!</h2>

        <p>
          Book your hostel washing machine quickly and avoid waiting in queues.
        </p>

        <br />

        <Button
          text="View Machines"
          color="#2563eb"
          onClick={() => navigate("/machines")}
        />

        <br />

        <Button
          text="My Bookings"
          color="#10b981"
          onClick={() => navigate("/dashboard")}
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

export default Home;