import { useState, useEffect } from "react";
import {
collection,
onSnapshot,
addDoc,
Timestamp,
doc,
getDoc,
query,
where,
getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import "../styles/Booking.css";

const slots = [
  16, 17, 18, 19, 20, 21, 22, 23,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

function Booking() {
  const [machines, setMachines] = useState([]);
  const [machineId, setMachineId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const [bookedSlots, setBookedSlots] = useState([]);
  const [hasActiveBooking, setHasActiveBooking] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "machines"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMachines(list);

      if (userData) {
        const hostelMachines = list.filter(
          (m) => m.hostel === userData.hostel
        );

        if (hostelMachines.length > 0 && !machineId) {
          setMachineId(hostelMachines[0].id);
        }
      }
    });

    return () => unsubscribe();
  }, [userData]);

  useEffect(() => {
    async function fetchUser() {
      if (!auth.currentUser) return;

      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());

        const q = query(
          collection(db, "bookings"),
          where("userId", "==", auth.currentUser.uid),
          where("status", "==", "booked")
        );

        const snapshot = await getDocs(q);

        setHasActiveBooking(!snapshot.empty);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchBookedSlots() {
      if (!machineId || !date) {
        setBookedSlots([]);
        return;
      }

      const q = query(
        collection(db, "bookings"),
        where("machineId", "==", machineId),
        where("slotDate", "==", date),
        where("status", "==", "booked")
      );

      const snapshot = await getDocs(q);

      const booked = snapshot.docs.map((doc) => doc.data().slotStart);

      setBookedSlots(booked);
    }

    fetchBookedSlots();
  }, [machineId, date]);

  useEffect(() => {
    setTime("");
  }, [machineId, date]);

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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 10);

    if (selectedDate < today) {
      setMessage("Cannot book past dates.");
      return;
    }

    if (selectedDate > maxDate) {
      setMessage("Booking allowed only up to 10 days in advance.");
      return;
    } 

    try {
      const formatHour = (h) => {
        const suffix = h >= 12 ? "PM" : "AM";
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        return `${hour12}:00 ${suffix}`;
      };

      const end = (Number(time) + 1) % 24;

      const selectedMachine = machines.find((m) => m.id === machineId);

      const confirmBooking = window.confirm(
      `Confirm Booking?

      Machine : ${selectedMachine.machineNo}

      Date : ${date}

      Time : ${formatHour(Number(time))} - ${formatHour(end)}`
      );

      if (!confirmBooking) return;

      const userBookingQuery = query(
        collection(db, "bookings"),
        where("userId", "==", auth.currentUser.uid),
        where("status", "==", "booked")
      );

      const userBookingSnapshot = await getDocs(userBookingQuery);

      if (!userBookingSnapshot.empty) {
        setMessage("❌ You already have an active booking.");
          return;
      }

      const bookingQuery = query(
        collection(db, "bookings"),
        where("machineId", "==", selectedMachine.id),
        where("slotDate", "==", date),
        where("slotStart", "==", parseInt(time)),
        where("status", "==", "booked")
      );

      const bookingSnapshot = await getDocs(bookingQuery);

      if (!bookingSnapshot.empty) {
        setMessage("❌ This machine is already booked for the selected time slot.");
        return;
      }

      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,

        name: userData.name,
        email: userData.email,
        hostel: userData.hostel,

        machineId: selectedMachine.id,
        machineNo: selectedMachine.machineNo,
        machineHostel: selectedMachine.hostel,

        slotDate: date,
        slotStart: parseInt(time),

        status: "booked",

        createdAt: Timestamp.now(),
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

      <div className="booking-page">
        {hasActiveBooking ? (

          <div className="booking-warning">

            <h1>🧺 Book a Washing Machine</h1>

            <p
              style={{
                color: "#B33F62",
                fontWeight: "600",
              }}
            >
              You already have an active booking.
            </p>

            <p>
              Please cancel or complete your current booking before booking another slot.
            </p>

          </div>

        ) : (

          <div className="booking-card">

            <h1>🧺 Book a Washing Machine</h1>

            <p>Select a machine, date and time slot.</p>


            <select
              className="booking-input"
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
            >
              {machines.length === 0 && (
                <option>No machines available</option>
              )}

              {machines
                .filter((m) => userData && m.hostel === userData.hostel)
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    Machine {m.machineNo}
                  </option>
                ))}
            </select>

            <input
              className="booking-input"
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              className="booking-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Select Time Slot</option>

              {slots
                .filter((slot) => !bookedSlots.includes(slot))
                .map((slot) => {
                  const end = (slot + 1) % 24;

                  const formatHour = (h) => {
                    const suffix = h >= 12 ? "PM" : "AM";
                    const hour12 = h % 12 === 0 ? 12 : h % 12;
                    return `${hour12}:00 ${suffix}`;
                  };

                  return (
                    <option key={slot} value={slot}>
                      {formatHour(slot)} - {formatHour(end)}
                    </option>
                  );
                })}
            </select>

            {message && (
              <p
                className="booking-message"
                  style={{
                    color: message.includes("confirmed")
                      ? "#4A7C59"
                      : "#B33F62",
                  }}
              >
                {message}
              </p>
            )}

            <Button
              className="booking-btn"
              text="Book Now"
              color="#2563eb"
              onClick={handleBook}
            />

          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default Booking;