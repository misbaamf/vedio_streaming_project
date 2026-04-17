import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "919591895425"; // 👈 YOUR NUMBER (with country code)

    const text = `Hello, I have a query:

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Query: ${form.message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Mobile No" onChange={handleChange} required />
      <textarea name="message" placeholder="Your Query" onChange={handleChange} required />

      <button type="submit">Send to WhatsApp</button>
    </form>
  );
}