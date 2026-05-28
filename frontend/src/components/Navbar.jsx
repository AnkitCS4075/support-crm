import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">

        <Link to="/" className="logo">
          Support CRM
        </Link>

        <Link to="/create" className="create-btn">
          Create Ticket
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;

