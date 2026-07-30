import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import "../styles/MachineList.css";

function MachineList() {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "machines"), (snapshot) => {
      setMachines(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />

      <div className="machine-list-container">
        <h1>🧺 Available Washing Machines</h1>

        <p>Select a machine to continue with your booking.</p>

        <br />

        {machines.length === 0 ? (
          <p>No machines are currently available.</p>
        ) : (
          machines.map((m) => (
            <div key={m.id} className="machine-card">
              <h3>{m.name || m.id}</h3>

              <p>
                <strong>Status:</strong> {m.status || "Unknown"}
              </p>

              <Button
                text="Book"
                color="#2563eb"
                onClick={() => navigate("/booking")}
              />
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default MachineList;