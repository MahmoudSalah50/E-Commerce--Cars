import React, { useState } from "react";
import Swal from "sweetalert2";
import "./CarsCss/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Display SweetAlert while sending message
    Swal.fire({
      title: "Sending Message...",
      html: '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Simulate message sending process (replace this with actual sending logic)
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us. We will get back to you soon.",
        confirmButtonText: "OK",
      });

      // Clear the form after submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 2000); // Simulated delay of 2 seconds
  };

  return (
    <div className="container contact-page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btnh">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
