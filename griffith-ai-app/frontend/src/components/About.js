import "../App.css";
import luna from "../assets/luna.jpg";
import maia from "../assets/maia.jpg";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const teamMembers = [
  {
    name: "Luna Grandjean",
    role: "luna.grandjean@student.griffith.ie",
    image: luna,
    bio: "20-year-old French Computer Science student. Passionnée par l'UI et les applications créatives.",
    github: "https://github.com/LunaGrandjean",
  },
  {
    name: "Maia Jouenne",
    role: "maia.jouenne@student.griffith.ie",
    image: maia,
    bio: "20-year-old French Computer Science student. Amoureuse des designs simples et efficaces.",
    github: "https://github.com/MaiaJouenne",
  },
];

const campuses = [
  {
    name: "Dublin Main Campus",
    address: "South Circular Road, Dublin 8",
    mapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-6.2785764!3d53.331376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c1833b915c7%3A0x4f83acae16f5062e!2sGriffith%20College%20Dublin!5e0!3m2!1sen!2sie!4v1716791903435!5m2!1sen!2sie",
  },
  {
    name: "Limerick Campus",
    address: "O'Connell Avenue, Limerick",
    mapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-8.6326533!3d52.6582407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b5c6f6cf6c13d%3A0xd8aa43fdbccad897!2sGriffith%20College%20Limerick!5e0!3m2!1sen!2sie!4v1716791968311!5m2!1sen!2sie",
  },
  {
    name: "Cork Campus",
    address: "Wellington Road, Cork",
    mapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-8.4612759!3d51.9032607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4844901a45d86009%3A0x6accbdef49adec91!2sGriffith%20College%20Cork!5e0!3m2!1sen!2sie!4v1716792026845!5m2!1sen!2sie",
  },
];

const AboutUs = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("luna");

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceID = "service_474sere";
    const templateID = "template_0wgn5q8";
    const publicKey = "GuwMNAx0xx5E5BUSq";
    const recipientEmail =
      recipient === "luna"
        ? "luna.grandjean@student.griffith.ie"
        : "maia.jouenne@student.griffith.ie";

    const templateParams = {
      title: message,
      to_email: recipientEmail,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert("Message sent! 🎉");
        setMessage("");
      })
      .catch((err) => {
        alert("Something went wrong 😥");
        console.error("EmailJS Error:", err);
      });
  };

  return (
    <div className="about-us-wrapper">
      {/* 👥 Our Team Section */}
      <div className="section-box">
        <h2 className="section-heading">Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-member">
              <img src={member.image} alt={member.name} className="team-photo" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="bio-text">{member.bio}</p>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
                aria-label={`GitHub profile of ${member.name}`}
              >
                <FaGithub style={{ marginRight: "6px" }} />
                GitHub
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 🌍 Our Locations Section */}
      <div className="section-box">
        <h2 className="section-heading">Our Locations</h2>
        <div className="campus-grid">
          {campuses.map((campus, idx) => (
            <div key={idx} className="campus-card">
              <h4>{campus.name}</h4>
              <p>{campus.address}</p>
              <iframe
                src={campus.mapLink}
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={campus.name}
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      {/* 📩 Contact Our Team Section */}
      <div className="section-box">
        <h2 className="section-heading">Contact Our Team</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          >
            <option value="luna">Luna</option>
            <option value="maia">Maia</option>
          </select>
          <textarea
            placeholder="Enter your message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;
