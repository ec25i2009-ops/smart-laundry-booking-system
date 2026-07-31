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
import MachineCard from "../components/MachineCard";

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
          machineArray.push(doc.data());
        });

        // Sort by machine number
        machineArray.sort(
          (a, b) => a.machineNo - b.machineNo
        );

        setMachines(machineArray);
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
        <h1>🧺 Available Washing Machines</h1>

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