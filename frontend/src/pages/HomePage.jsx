import { useEffect, useState } from "react";

import API from "../api/api";

import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import TicketCard from "../components/TicketCard";

function HomePage() {

  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const fetchTickets = async () => {

    try {

      const response = await API.get("/tickets", {
        params: {
          search,
          status
        }
      });

      setTickets(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  return (
    <div className="container">

      <div className="page-header">

        <h1 className="page-title">
          Support Dashboard
        </h1>

        <p className="page-subtitle">
          Manage customer support tickets efficiently
        </p>

      </div>

      <div className="filters">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <StatusFilter
          status={status}
          setStatus={setStatus}
        />

      </div>

      {tickets.length === 0 ? (
        <div className="empty-state">
          <h2>No Tickets Found</h2>
        </div>
      ) : (
        <div className="ticket-grid">

          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticket_id}
              ticket={ticket}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default HomePage;

