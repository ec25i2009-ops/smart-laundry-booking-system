import "../styles/MachineCard.css";
import { useNavigate } from "react-router-dom";
function MachineCard({
  machineName,
  floor,
  status,
  nextSlot,
}) {
  const navigate = useNavigate();
  return (

    <div className="machine-card">

      <div className="machine-header">

        <h3>{machineName}</h3>

        <span
          className={`status-badge ${
            status === "Available"
              ? "available"
              : "unavailable"
          }`}
        >
          {status}
        </span>

      </div>

      {floor && (
        <p>
          <strong>Floor:</strong> {floor}
        </p>
      )}

      <p>
        <strong>Next Slot:</strong> {nextSlot}
      </p>

      <button
  disabled={status !== "Available"}
  onClick={() => navigate("/booking")}
>
        {status === "Available"
          ? "Book Now"
          : "Unavailable"}
      </button>

    </div>

  );

}

export default MachineCard;