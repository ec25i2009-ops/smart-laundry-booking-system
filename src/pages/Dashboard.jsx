import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import {
  logOut,
  resetPassword,
  getCurrentUserData,
} from "../authService";

function Dashboard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  async function loadUser() {
    try {
      const data = await getCurrentUserData();
      setUserData(data);
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  }

  loadUser();
}, []);

  async function handleLogout() {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  async function handleResetPassword() {
  if (!email) {
    alert("Please enter your email.");
    return;
  }

  try {
    await resetPassword(email);
    alert("Password reset email sent! Check your inbox.");
    setEmail("");
  } catch (err) {
    console.error(err);
    alert(err.message);
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

        <h2>User Information</h2>

<div
  style={{
    display: "inline-block",
    textAlign: "left",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "30px",
    width: "350px",
  }}
>
  <p><strong>Name:</strong> {userData?.name || "Loading..."}</p>
  <p><strong>Email:</strong> {userData?.email || "Loading..."}</p>
  <p><strong>Hostel:</strong> {userData?.hostel || "Loading..."}</p>
</div>

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

<h3>Change Password?</h3>

<input
  type="email"
  placeholder="Enter your registered email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  }}
/>

<br />

<Button
  text="Send Password Reset Email"
  color="#f59e0b"
  onClick={handleResetPassword}
/>

<br />

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