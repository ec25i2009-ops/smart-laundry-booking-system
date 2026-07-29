function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Smart Laundry Dashboard</h1>

      <h2>Welcome!</h2>

      <div>
        <p>🧺 Total Machines: 12</p>
        <p>✅ Available Machines: 8</p>
        <p>📅 My Booking: None</p>
      </div>

      <button>Book Machine</button>
      <br /><br />

      <button>View Machines</button>
      <br /><br />

      <button>Logout</button>
    </div>
  );
}

export default Dashboard;