

function MachineCard({ machineNo, status, floor }) {
  return (
    <div className="machine-card">
      <h2>Machine {machineNo}</h2>

      <p>
        <strong>Machine No:</strong> {machineNo}
      </p>

      {floor && (
        <p>
          <strong>Floor:</strong> {floor}
        </p>
      )}

      <p>
        <strong>Status:</strong>{" "}
        <span className={`status ${status.toLowerCase()}`}>
          {status}
        </span>
      </p>

      <button disabled={status !== "Available"}>
        {status === "Available" ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
}

export default MachineCard;