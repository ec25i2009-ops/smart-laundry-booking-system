import {
  FaUser,
  FaCalendarCheck,
  FaWarehouse,
  FaClipboardList,
} from "react-icons/fa";

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db, auth } from "../firebase";

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

  const [booking, setBooking] = useState(null);

  const [totalMachines, setTotalMachines] = useState(0);
  const [availableMachines, setAvailableMachines] = useState(0);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUserData();
        setUserData(data);

        const bookingQuery = query(
          collection(db, "bookings"),
          where("userId", "==", auth.currentUser.uid),
          where("status", "==", "booked")
        );

        const bookingSnapshot = await getDocs(bookingQuery);

        if (!bookingSnapshot.empty) {
          setBooking({
            id: bookingSnapshot.docs[0].id,
            ...bookingSnapshot.docs[0].data()
          });
        }

        const machinesQuery = query(
          collection(db, "machines"),
          where("hostel", "==", data.hostel)
        );

        const machineSnapshot = await getDocs(machinesQuery);

        const total = machineSnapshot.size;

setTotalMachines(total);

const hostelBookingQuery = query(
  collection(db, "bookings"),
  where("machineHostel", "==", data.hostel),
  where("status", "==", "booked")
);

const hostelBookingSnapshot = await getDocs(hostelBookingQuery);

const now = new Date();
const today = now.toISOString().split("T")[0];
const currentHour = now.getHours();

const occupiedMachines = hostelBookingSnapshot.docs.filter((doc) => {
  const booking = doc.data();

  return (
    booking.slotDate === today &&
    currentHour >= booking.slotStart &&
    currentHour < booking.slotStart + 1
  );
}).length;

setAvailableMachines(total - occupiedMachines);
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

  async function handleCancelBooking() {
    if (!booking) return;

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await updateDoc(doc(db, "bookings", booking.id), {
        status: "cancelled",
      });

      setBooking(null);

      alert("Booking cancelled successfully.");

    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking.");
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
                Hi, <strong>{userData?.name || "Student"}</strong>!
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
              <h2>{totalMachines}</h2>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
    <FaWarehouse />
</div>
              <h3>Available</h3>
              <h2>{availableMachines}</h2>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
    <FaCalendarCheck />
</div>
              <h3>My Booking</h3>
              {booking ? (
                <>
                  <h2>Machine {booking.machineNo}</h2>
                  <p className="stat-subtext">
                    {booking.slotDate} • {booking.slotStart}:00 - {(booking.slotStart + 1) % 24}:00
                  </p>
                </>
              ) : (
                <h2>None</h2>
              )}
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

          <div className="user-card">

            <h2>Current Booking</h2>

            {booking ? (

              <div className="user-details">

                <div className="info-box">
                <h4>Machine</h4>
                <p>Machine {booking.machineNo}</p>
              </div>

              <div className="info-box">
                <h4>Date</h4>
                <p>{booking.slotDate}</p>
              </div>

              <div className="info-box">
                <h4>Time</h4>
                <p>{booking.slotStart}:00 - {(booking.slotStart + 1) % 24}:00</p>
              </div>

              <div className="info-box">
                <h4>Status</h4>
                <p>{booking.status}</p>
                </div>

              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Button
                  text="Cancel Booking"
                  color="#B33F62"
                  onClick={handleCancelBooking}
                />
              </div>

              </div>

            ) : (

              <p>No active booking.</p>

            )}

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
              text="Send Reset Email"
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

