import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import "../styles/Booking.css";

function Booking() {
  return (
    <>
      <Navbar />

      <div className="booking-container">
        <h1>Book a Washing Machine</h1>

        <label>Select Machine</label>
        <select>
          <option>Machine 1</option>
          <option>Machine 2</option>
          <option>Machine 3</option>
        </select>

        <label>Select Date</label>
        <input type="date" />

        <label>Select Time</label>
        <input type="time" />

        <Button text="Book Now" />
      </div>

      <Footer />
    </>
  );
}

export default Booking;