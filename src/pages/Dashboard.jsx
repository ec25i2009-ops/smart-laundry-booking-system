import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Smart Laundry Dashboard</h1>

        <h2>Welcome!</h2>

        <p>🧺 Total Machines: 12</p>
        <p>✅ Available Machines: 8</p>
        <p>📅 My Booking: None</p>

        <Button text="Book Machine" />
        <Button text="View Machines" />
        <Button text="Logout" />
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;