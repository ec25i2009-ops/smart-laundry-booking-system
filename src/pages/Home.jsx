import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";

function Home() {
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

        <Button text="View Machines" color="#2563eb" />

        <br />

        <Button text="My Bookings" color="#10b981" />

        <br />

        <Button text="Logout" color="#ef4444" />
      </div>

      <Footer />
    </>
  );
}

export default Home;