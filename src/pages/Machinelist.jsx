import Navbar from "../components/Navbar";
import MachineCard from "../components/MachineCard";
import Footer from "../components/Footer";
import "../styles/MachineList.css";

function MachineList() {
  return (
    <>
      <Navbar />

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

      <Footer />
    </>
  );
}

export default MachineList;