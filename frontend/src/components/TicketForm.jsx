import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/api";

function TicketForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/tickets", formData);

      alert("Ticket Created Successfully");

      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: ""
      });

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">

      <input
        type="text"
        name="customer_name"
        placeholder="Customer Name"
        value={formData.customer_name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="customer_email"
        placeholder="Customer Email"
        value={formData.customer_email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Create Ticket
      </button>

    </form>
  );
}

export default TicketForm;

