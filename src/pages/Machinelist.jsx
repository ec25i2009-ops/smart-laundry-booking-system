import MachineCard from "../components/MachineCard";
import "../styles/MachineList.css";

function MachineList() {
  return (
    <div className="machine-list-container">
      <h1>Available Washing Machines</h1>

      <MachineCard
        machineName="Machine 1"
        status="Available"
      />

      <MachineCard
        machineName="Machine 2"
        status="Busy"
      />

      <MachineCard
        machineName="Machine 3"
        status="Available"
      />

      <MachineCard
        machineName="Machine 4"
        status="Maintenance"
      />
    </div>
  );
}

export default MachineList;