function MachineCard({
  machineName,
  floor,
  status,
  nextSlot
}) {


  return (

    <div className="machine-card">


      <h3>
        {machineName}
      </h3>


      {
        floor &&

        <p>
          <strong>
            Floor:
          </strong>{" "}
          {floor}
        </p>
      }



      <p>
        <strong>
          Status:
        </strong>{" "}
        {status}
      </p>



      <p>
        <strong>
          Next Slot:
        </strong>{" "}
        {nextSlot}
      </p>



      <button
        disabled={
          status !== "Available"
        }
      >

        {
          status === "Available"
          ? "Book Now"
          : "Unavailable"
        }

      </button>


    </div>

  );

}


export default MachineCard;