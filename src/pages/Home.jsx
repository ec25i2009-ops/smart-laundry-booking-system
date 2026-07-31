import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { logOut, getCurrentUserData } from "../authService";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  async function handleLogout() {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  useEffect(() => {
    async function loadUser() {

      console.log("========== HOME PAGE ==========");
      console.log("auth.currentUser:", auth.currentUser);

      try {

        const data = await getCurrentUserData();

        console.log("User data from Firestore:", data);

        setUserData(data);

      } catch (err) {

        console.error("Error loading user data:", err);

      }

    }

    loadUser();

  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
        }}
      >
        <h1>🧺 Smart Laundry Booking System</h1>

        <h2>Welcome, {userData?.name || "User"}!</h2>

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