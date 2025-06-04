import "../App.css"; // Import global styles
import luna from "../assets/luna.jpg"; // Team member image
import maia from "../assets/maia.jpg"; // Team member image
import { FaGithub } from "react-icons/fa"; // GitHub icon
import emailjs from "@emailjs/browser"; // Email sending service
import { useState } from "react"; // React hook for managing state

// Array of team members with their details
const teamMembers = [
  {
    name: "Luna Grandjean",
    role: "luna.grandjean@student.griffith.ie",
    image: luna,
    bio: "20-year-old French student currently studying Computer Science at Griffith College. Passionate about technology, innovation, and creating impactful digital experiences.",
    github: "https://github.com/LunaGrandjean",
  },
  {
    name: "Maia Jouenne",
    role: "maia.jouenne@student.griffith.ie",
    image: maia,
    bio: "20-year-old French student currently studying Computer Science at Griffith College. Enthusiastic about technology, coding, and bringing creative ideas to life.",
    github: "https://github.com/MaiaJouenne",
  },
];

// Array of campus details with map embed links
const campuses = [
  {
    name: "Dublin Main Campus",
    address: "South Circular Road, Dublin 8",
    mapLink: "https://www.google.com/maps/embed?pb=... (shortened)",
  },
  {
    name: "Limerick Campus",
    address: "O'Connell Avenue, Limerick",
    mapLink: "https://www.google.com/maps/embed?pb=... (shortened)",
  },
  {
    name: "Cork Campus",
    address: "Wellington Road, Cork",
    mapLink: "https://www.google.com/maps/embed?pb=... (shortened)",
  },
];

// AboutUs component definition
const AboutUs = () => {
  // State hooks for contact form fields
  const [selectedRecipient, setSelectedRecipient] = useState("luna.grandjean@student.griffith.ie");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // EmailJS configuration
    const serviceID = "service_jb2yslr";   // EmailJS service ID
    const templateID = "template_zvkg1tv"; // EmailJS template ID
    const publicKey = "wGjO7lySlXyHjpdnc"; // EmailJS public key

    // Template parameters passed to EmailJS
    const templateParams = {
      to_email: selectedRecipient,
      from_name: name,
      reply_to: email,
      message: message,
    };

    // Send the email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert("Message sent!");
        // Reset form fields after successful send
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.error(err);
      });
  };

  return (
    <div className="about-us-wrapper">

      {/* Our Team Section */}
      <div className="section-box">
        <h2 className="section-heading">Our Team</h2>
        <div className="team-grid">
          {/* Loop through team members and display their cards */}
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-member">
              <img src={member.image} alt={member.name} className="team-photo" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="bio-text">{member.bio}</p>
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="github-link">
                <FaGithub style={{ marginRight: "6px" }} /> GitHub
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Our Locations Section */}
      <div className="section-box">
        <h2 className="section-heading">Our Locations</h2>
        <div className="campus-grid">
          {/* Loop through campus details and embed Google Maps */}
          {campuses.map((campus, idx) => (
            <div key={idx} className="campus-card">
              <h4>{campus.name}</h4>
              <p>{campus.address}</p>
              <iframe
                src={campus.mapLink}
                title={campus.name}
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Our Team Section */}
      <div className="section-box">
        <h2 className="section-heading">Contact Our Team</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Dropdown for selecting recipient */}
          <select value={selectedRecipient} onChange={(e) => setSelectedRecipient(e.target.value)} required>
            <option value="luna.grandjean@student.griffith.ie">Luna</option>
            <option value="maia.jouenne@student.griffith.ie">Maia</option>
          </select>
          {/* Input fields for name and email */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Textarea for the message */}
          <textarea
            placeholder="Enter your message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          {/* Submit button */}
          <button type="submit">Send Message</button>
        </form>
      </div>

    </div>
  );
};

export default AboutUs;
