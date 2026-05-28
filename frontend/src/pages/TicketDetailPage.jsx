import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import StatusBadge from "../components/StatusBadge";

import API from "../api/api";

import NoteList from "../components/NoteList";

function TicketDetailPage() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);

  const [status, setStatus] = useState("");

  const [note, setNote] = useState("");

  const fetchTicket = async () => {
    try {
      const response = await API.get(`/tickets/${ticketId}`);

      setTicket(response.data);

      setStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const updateTicket = async () => {
    try {
      await API.put(`/tickets/${ticketId}`, {
        status,
        note_text: note,
      });

      alert("Ticket Updated");

      fetchTicket();

      setNote("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!ticket) {
    return (
      <div className="container">
        <h2>Loading Ticket...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-btn">
        ← Back to Dashboard
      </Link>

      <div className="detail-card">
        <div className="ticket-header">
          <h1 className="page-title">{ticket.subject}</h1>

          <StatusBadge status={ticket.status} />
        </div>

        <div className="detail-section">
          <p className="detail-label">Ticket ID</p>

          <p className="detail-value">{ticket.ticket_id}</p>
        </div>

        <div className="detail-section">
          <p className="detail-label">Customer Name</p>

          <p className="detail-value">{ticket.customer_name}</p>
        </div>

        <div className="detail-section">
          <p className="detail-label">Customer Email</p>

          <p className="detail-value">{ticket.customer_email}</p>
        </div>

        <div className="detail-section">
          <p className="detail-label">Description</p>

          <p className="detail-value">{ticket.description}</p>
        </div>

        <div className="update-box">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>

            <option value="In Progress">In Progress</option>

            <option value="Closed">Closed</option>
          </select>

          <textarea
            placeholder="Add internal support note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button onClick={updateTicket}>Update Ticket</button>
        </div>

        <NoteList notes={ticket.notes} />
      </div>
    </div>
  );
}

export default TicketDetailPage;
