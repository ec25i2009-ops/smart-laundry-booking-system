import {
  FaUser,
  FaCalendarCheck,
  FaWarehouse,
  FaClipboardList,
} from "react-icons/fa";

import { LuWashingMachine } from "react-icons/lu";
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
import "../styles/Dashboard.css";

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
      console.error(err);
    }
  }

  async function handleResetPassword() {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      await resetPassword(email);
      alert("Password reset email sent!");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        <div className="dashboard-container">

          {/* HERO */}

          <div className="hero-card">

            <div>
              <h1>Smart Laundry Dashboard</h1>

              <p>
                Welcome back, <strong>{userData?.name || "Student"}</strong> 👋
              </p>

              <span>
                Manage your laundry bookings quickly and efficiently.
              </span>
            </div>

          </div>

          {/* STATS */}

          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon">
    <LuWashingMachine />
</div>
              <h3>Total Machines</h3>
              <h2>12</h2>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
    <FaWarehouse />
</div>
              <h3>Available</h3>
              <h2>8</h2>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
    <FaCalendarCheck />
</div>
              <h3>My Booking</h3>
              <h2>None</h2>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
    <FaUser />
</div>
              <h3>Hostel</h3>
              <h2>{userData?.hostel || "Loading..."}</h2>
            </div>

          </div>

          {/* USER */}

          <div className="user-card">

            <h2>User Information</h2>

            <div className="user-details">

              <div className="info-box">
                <h4>Name</h4>
                <p>{userData?.name || "Loading..."}</p>
              </div>

              <div className="info-box">
                <h4>Email</h4>
                <p>{userData?.email || "Loading..."}</p>
              </div>

              <div className="info-box">
                <h4>Hostel</h4>
                <p>{userData?.hostel || "Loading..."}</p>
              </div>

            </div>

          </div>

          {/* QUICK ACTIONS */}

          <div className="action-card">

            <h2>Quick Actions</h2>

            <div className="action-grid">

              <div
                className="action-box"
                onClick={() => navigate("/booking")}
              >
                <div className="action-icon">
    <LuWashingMachine />
</div>

                <h3>Book Machine</h3>

                <p>Reserve a washing machine slot.</p>
              </div>

              <div
                className="action-box"
                onClick={() => navigate("/machines")}
              >
                <div className="action-icon">
    <FaClipboardList />
</div>

                <h3>View Machines</h3>

                <p>Check machine availability.</p>
              </div>

            </div>

          </div>

          {/* PASSWORD */}

          <div className="password-card">

            <h2>Reset Password</h2>

            <input
              className="dashboard-input"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              text="Send Password Reset Email"
              color="#F9564F"
              onClick={handleResetPassword}
            />

          </div>

          {/* LOGOUT */}

          <div className="logout-section">

            <Button
              text="Logout"
              color="#B33F62"
              onClick={handleLogout}
            />

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Dashboard;