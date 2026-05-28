import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import CreateTicketPage from "./pages/CreateTicketPage";
import TicketDetailPage from "./pages/TicketDetailPage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTicketPage />} />
        <Route path="/ticket/:ticketId" element={<TicketDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

