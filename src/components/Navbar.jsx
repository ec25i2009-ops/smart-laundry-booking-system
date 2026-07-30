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
        <a
          href="#"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Home
        </a>

        <a
          href="#"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Machines
        </a>

        <a
          href="#"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Dashboard
        </a>
      </div>
    </nav>
  );
}

export default Navbar;