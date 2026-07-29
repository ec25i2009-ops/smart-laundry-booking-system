function Booking() {
  return (
    <div>
      <h1>Book a Washing Machine</h1>

      <br />

      <label>Select Machine</label>
      <br />
      <select>
        <option>Machine 1</option>
        <option>Machine 2</option>
        <option>Machine 3</option>
      </select>

      <br /><br />

      <label>Select Date</label>
      <br />
      <input type="date" />

      <br /><br />

      <label>Select Time</label>
      <br />
      <input type="time" />

      <br /><br />

      <button>Book Now</button>
    </div>
  );
}

export default Booking;