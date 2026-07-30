import { useNavigate } from "react-router-dom";
import { logOut } from "../authService";

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logOut();
    navigate("/login");
  }

  return (
    <div className="dashboard-container">
      <h1>Smart Laundry Dashboard</h1>

      <h2>Welcome!</h2>

      <div>
        {/* these three numbers are still placeholders — wiring them to
            live Firestore counts is a good next step once machines are seeded */}
        <p>🧺 Total Machines: 12</p>
        <p>✅ Available Machines: 8</p>
        <p>📅 My Booking: None</p>
      </div>

      <button onClick={() => navigate("/booking")}>Book Machine</button>
      <br />
      <br />

      <button onClick={() => navigate("/machines")}>View Machines</button>
      <br />
      <br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;