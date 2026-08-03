import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MachineCard from "../components/Machinecard";

import "../styles/MachineList.css";

function MachineList() {
  const [hostel, setHostel] = useState("");
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No user logged in");
        setLoading(false);
        return;
      }

      try {
        // Get logged in user's hostel
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          console.log("User document not found");
          setLoading(false);
          return;
        }

        const userData = userSnapshot.data();
        const userHostel = userData.hostel;

        setHostel(userHostel);

        // Fetch machines from Firestore
        const q = query(
          collection(db, "machines"),
          where("hostel", "==", userHostel)
        );

        const querySnapshot = await getDocs(q);

        let machineArray = [];

        querySnapshot.forEach((doc) => {
  machineArray.push({
    id: doc.id,
    ...doc.data(),
  });
});

        // Sort by machine number
        machineArray.sort(
          (a, b) => a.machineNo - b.machineNo
        );

        // Get all bookings
const bookingSnapshot = await getDocs(collection(db, "bookings"));

const bookings = bookingSnapshot.docs.map((doc) => doc.data());

const now = new Date();
const today = now.toISOString().split("T")[0];
const currentHour = now.getHours();

const updatedMachines = machineArray.map((machine) => {

  const machineBookings = bookings.filter(
    (booking) =>
      booking.machineId === machine.id &&
      booking.status === "booked"
  );

  let status = "Available";
  let nextSlot = "No upcoming bookings";

  // Check if machine is currently booked
  const currentBooking = machineBookings.find(
    (booking) =>
      booking.slotDate === today &&
      currentHour >= booking.slotStart &&
      currentHour < booking.slotStart + 1
  );

  if (currentBooking) {
    status = "Running";
  }

  // Find next booking
  const futureBookings = machineBookings
    .filter((booking) => {
      if (booking.slotDate > today) return true;

      return (
        booking.slotDate === today &&
        booking.slotStart > currentHour
      );
    })
    .sort((a, b) => {
      if (a.slotDate === b.slotDate) {
        return a.slotStart - b.slotStart;
      }

      return a.slotDate.localeCompare(b.slotDate);
    });

  if (futureBookings.length > 0) {
    const booking = futureBookings[0];

    const end = (booking.slotStart + 1) % 24;

    const formatHour = (h) => {
      const suffix = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      return `${hour12}:00 ${suffix}`;
    };

    nextSlot = `${booking.slotDate} | ${formatHour(
      booking.slotStart
    )} - ${formatHour(end)}`;
  }

  return {
    ...machine,
    status,
    nextSlot,
  };
});

setMachines(updatedMachines);
      } catch (error) {
        console.error("Error:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />

      <div className="machine-list-container">
        <h1> Available Washing Machines</h1>

        <h2>
          Hostel: {loading ? "Loading..." : hostel || "Not Found"}
        </h2>

        {loading ? (
          <p>Loading machines...</p>
        ) : machines.length === 0 ? (
          <p>No machines available.</p>
        ) : (
          machines.map((machine) => (
            <MachineCard
              key={machine.machineNo}
              machineName={`Machine ${machine.machineNo}`}
              floor={machine.floor}
              status={machine.status}
              nextSlot={machine.nextSlot}
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default MachineList;