import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

const inputStyle = {
  width: "300px",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
};

function Booking() {
  const [machines, setMachines] = useState([]);
  const [machineId, setMachineId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "machines"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMachines(list);

      if (list.length > 0 && !machineId) {
        setMachineId(list[0].id);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleBook() {
    setMessage("");

    if (!auth.currentUser) {
      setMessage("Please log in first.");
      return;
    }

    if (!machineId || !date || !time) {
      setMessage("Please fill in all the fields.");
      return;
    }

    try {
      const startTime = new Date(`${date}T${time}`);
      const endTime = new Date(startTime.getTime() + 45 * 60000);

      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,
        machineId,
        startTime: Timestamp.fromDate(startTime),
        endTime: Timestamp.fromDate(endTime),
        status: "booked",
      });

      setMessage("✅ Booking confirmed!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setMessage("Booking failed. Please try again.");
      console.error(err);
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
        <h1>🧺 Book a Washing Machine</h1>

        <p>Select a machine, date and time slot.</p>

        <br />

        <select
          value={machineId}
          onChange={(e) => setMachineId(e.target.value)}
          style={inputStyle}
        >
          {machines.length === 0 && (
            <option>No machines available</option>
          )}

          {machines.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name || m.id}
            </option>
          ))}
        </select>

        <br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />

        <br />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={inputStyle}
        />

        <br />

        {message && (
          <p
            style={{
              color: message.includes("confirmed") ? "green" : "red",
              marginBottom: "15px",
            }}
          >
            {message}
          </p>
        )}

        <Button
          text="Book Now"
          color="#2563eb"
          onClick={handleBook}
        />
      </div>

      <Footer />
    </>
  );
}

export default Booking;