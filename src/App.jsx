import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MachineList from "./pages/Machinelist";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/home" element={<Home />} />

      <Route path="/machines" element={<MachineList />} />

      <Route path="/booking" element={<Booking />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
