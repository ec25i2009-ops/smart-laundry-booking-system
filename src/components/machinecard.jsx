function MachineCard({ machineName, status }) {
  return (
    <div className="machine-card">
      <h3>{machineName}</h3>
      <p>Status: {status}</p>

      <button disabled={status !== "Available"}>
        {status === "Available" ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
}

export default MachineCard;