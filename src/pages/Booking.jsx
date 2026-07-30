import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

function Booking() {
  const [machines, setMachines] = useState([]);
  const [machineId, setMachineId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "machines"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMachines(list);
      if (list.length > 0 && !machineId) setMachineId(list[0].id);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleBook() {
    setMessage("");

    if (!auth.currentUser) {
      setMessage("Please log in first.");
      return;
    }
    if (!machineId || !date || !time) {
      setMessage("Please fill in machine, date, and time.");
      return;
    }

    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime.getTime() + 45 * 60000); // 45-min cycle, matches your slot length

    await addDoc(collection(db, "bookings"), {
      userId: auth.currentUser.uid,
      machineId,
      startTime: Timestamp.fromDate(startTime),
      endTime: Timestamp.fromDate(endTime),
      status: "booked",
    });

    setMessage("Booking confirmed!");
  }

  return (
    <div>
      <h1>Book a Washing Machine</h1>

      <br />

      <label>Select Machine</label>
      <br />
      <select value={machineId} onChange={(e) => setMachineId(e.target.value)}>
        {machines.length === 0 && <option>No machines available</option>}
        {machines.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name || m.id}
          </option>
        ))}
      </select>

      <br />
      <br />

      <label>Select Date</label>
      <br />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <br />
      <br />

      <label>Select Time</label>
      <br />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <br />
      <br />

      {message && <p>{message}</p>}

      <button onClick={handleBook}>Book Now</button>
    </div>
  );
}

export default Booking;