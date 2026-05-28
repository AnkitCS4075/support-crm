import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";

function TicketCard({ ticket }) {

  return (
    <Link
      to={`/ticket/${ticket.ticket_id}`}
      className="ticket-card"
    >

      <div className="ticket-header">

        <h3 className="ticket-title">
          {ticket.subject}
        </h3>

        <StatusBadge status={ticket.status} />

      </div>

      <p className="ticket-info">
        <strong>ID:</strong> {ticket.ticket_id}
      </p>

      <p className="ticket-info">
        <strong>Customer:</strong> {ticket.customer_name}
      </p>

      <p className="ticket-date">
        {new Date(ticket.created_at).toLocaleString()}
      </p>

    </Link>
  );
}

export default TicketCard;

