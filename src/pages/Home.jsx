function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>🧺 Smart Laundry Booking System</h1>

      <h2>Welcome!</h2>

      <p>
        Book your hostel washing machine quickly and avoid waiting in queues.
      </p>

      <br />

      <button
        style={{
          width: "220px",
          padding: "12px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "15px",
        }}
      >
        View Machines
      </button>

      <br />

      <button
        style={{
          width: "220px",
          padding: "12px",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "15px",
        }}
      >
        My Bookings
      </button>

      <br />

      <button
        style={{
          width: "220px",
          padding: "12px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Logout
      </button>

      <br />
      <br />

      <p>📍 Hostel Laundry Room</p>
      <p>⏰ Laundry Timings: 6:00 AM – 10:00 PM</p>
    </div>
  );
}

export default Home;