import { Link } from "react-router-dom";

import TicketForm from "../components/TicketForm";

function CreateTicketPage() {

  return (
    <div className="container">

      <Link to="/" className="back-btn">
        ← Back to Dashboard
      </Link>

      <div className="page-header">

        <h1 className="page-title">
          Create Support Ticket
        </h1>

        <p className="page-subtitle">
          Submit a new customer support request
        </p>

      </div>

      <div className="form-card">
        <TicketForm />
      </div>

    </div>
  );
}

export default CreateTicketPage;


