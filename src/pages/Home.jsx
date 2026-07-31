import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaSoap,
  FaCalendarCheck,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";

import { logOut, getCurrentUserData } from "../authService";

import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  async function handleLogout() {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUserData();
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadUser();
  }, []);

  return (
    <>
      <Navbar />

      <div className="home-page">

        {/* Hero Section */}

        <div className="hero-card">

          <div className="hero-left">

            <h2>Hi, {userData?.name || "User"}!</h2>

            <p>
              Book your hostel washing machine in seconds and avoid
              unnecessary waiting.
            </p>

          </div>

          <FaUserCircle className="hero-icon" />

        </div>

        {/* Dashboard Cards */}

        <div className="dashboard-grid">

          {/* Machines */}

          <div className="dashboard-card machines">

            <FaSoap className="card-icon" />

            <h3>Machines</h3>

            <p>
              Check available washing machines and reserve your slot
              instantly.
            </p>

            <Button
              text="View Machines"
              color="#F3C677"
              onClick={() => navigate("/machines")}
            />

          </div>

          {/* Bookings */}

          <div className="dashboard-card bookings">

            <FaCalendarCheck className="card-icon" />

            <h3>My Bookings</h3>

            <p>
              View active bookings, completed washes and booking history.
            </p>

            <Button
              text="Open Dashboard"
              color="#F9564F"
              onClick={() => navigate("/dashboard")}
            />

          </div>

        </div>

        {/* Logout */}

        <div className="logout-section">

          <Button
            text="Logout"
            color="#B33F62"
            onClick={handleLogout}
          />

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Home;