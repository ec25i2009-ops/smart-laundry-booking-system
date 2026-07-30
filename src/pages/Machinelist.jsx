import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MachineCard from "../components/MachineCard";
import "../styles/MachineList.css";

function MachineList() {
  const [selectedHostel, setSelectedHostel] = useState("");

  const hostelMachines = {
    Jasmine: [
      { machineNo: 1, floor: "Ground Floor", status: "Available" },
      { machineNo: 2, floor: "Ground Floor", status: "Busy" },
      { machineNo: 3, floor: "1st Floor", status: "Available" },
      { machineNo: 4, floor: "1st Floor", status: "Maintenance" },
      { machineNo: 5, floor: "2nd Floor", status: "Available" },
    ],

    Ashwatha: [
      { machineNo: 1, status: "Available" },
      { machineNo: 2, status: "Busy" },
      { machineNo: 3, status: "Available" },
      { machineNo: 4, status: "Available" },
      { machineNo: 5, status: "Maintenance" },
    ],

    Ashoka: [
      { machineNo: 1, status: "Available" },
      { machineNo: 2, status: "Busy" },
      { machineNo: 3, status: "Available" },
      { machineNo: 4, status: "Busy" },
      { machineNo: 5, status: "Available" },
    ],
  };

  return (
    <>
      <Navbar />

      <div className="machine-list-container">
        <h1>Available Washing Machines</h1>

        <label>Select Hostel</label>

        <select
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
        >
          <option value="">Choose Hostel</option>
          <option value="Jasmine">Jasmine (Girls)</option>
          <option value="Ashwatha">Ashwatha (Boys)</option>
          <option value="Ashoka">Ashoka (Boys)</option>
        </select>

        {selectedHostel &&
          hostelMachines[selectedHostel].map((machine) => (
            <MachineCard
              key={machine.machineNo}
              machineNo={machine.machineNo}
              floor={machine.floor}
              status={machine.status}
            />
          ))}
      </div>

      <Footer />
    </>
  );
}

export default MachineList;