import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import MachineCard from "../components/MachineCard";
import "../styles/MachineList.css";

function MachineList() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "machines"), (snapshot) => {
      setMachines(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="machine-list-container">
      <h1>Available Washing Machines</h1>

      {machines.length === 0 && (
        <p>No machines added yet — add some documents to the `machines` collection in Firestore.</p>
      )}

      {machines.map((m) => (
        <MachineCard key={m.id} machineName={m.name || m.id} status={m.status || "Unknown"} />
      ))}
    </div>
  );
}

export default MachineList;