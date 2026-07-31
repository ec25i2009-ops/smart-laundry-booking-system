import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
         Smart Laundry
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/machines">Machines</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

    </nav>
  );
}

export default Navbar;