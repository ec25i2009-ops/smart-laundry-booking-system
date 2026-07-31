import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#2563eb",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>🧺 Smart Laundry</h2>

      <div>
         <Link to="/home" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/machines" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>
          Machines
        </Link>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;