import "../App.css";
import luna from "../assets/luna.jpg";
import maia from "../assets/maia.jpg";
import { FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useState } from "react";

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

const campuses = [
  {
    name: "Dublin Main Campus",
    address: "South Circular Road, Dublin 8",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-6.2785764!3d53.331376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c1833b915c7%3A0x4f83acae16f5062e!2sGriffith%20College%20Dublin!5e0!3m2!1sen!2sie!4v1716791903435!5m2!1sen!2sie",
  },
  {
    name: "Limerick Campus",
    address: "O'Connell Avenue, Limerick",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-8.6326533!3d52.6582407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b5c6f6cf6c13d%3A0xd8aa43fdbccad897!2sGriffith%20College%20Limerick!5e0!3m2!1sen!2sie!4v1716791968311!5m2!1sen!2sie",
  },
  {
    name: "Cork Campus",
    address: "Wellington Road, Cork",
    mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.781567775462!2d-8.4612759!3d51.9032607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4844901a45d86009%3A0x6accbdef49adec91!2sGriffith%20College%20Cork!5e0!3m2!1sen!2sie!4v1716792026845!5m2!1sen!2sie",
  },
];

const AboutUs = () => {
  const [selectedRecipient, setSelectedRecipient] = useState("luna.grandjean@student.griffith.ie");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceID = "service_jb2yslr";  // Ton service EmailJS Outlook
    const templateID = "template_zvkg1tv";  // Ton template EmailJS
    const publicKey = "wGjO7lySlXyHjpdnc"; // Ta clé publique EmailJS

    const templateParams = {
      to_email: selectedRecipient,    // Destinataire (Luna ou Maia)
      from_name: name,                // Nom de l'expéditeur
      reply_to: email,                // Email de l'expéditeur (pour les réponses)
      message: message,               // Contenu du message
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert("Message sent! 🎉");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        alert("Something went wrong 😥");
        console.error(err);
      });
  };

  return (
    <div className="about-us-wrapper">

      {/* 🌟 Our Team Section */}
      <div className="section-box">
        <h2 className="section-heading">Our Team</h2>
        <div className="team-grid">
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

      {/* 🌟 Our Locations Section */}
      <div className="section-box">
        <h2 className="section-heading">Our Locations</h2>
        <div className="campus-grid">
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

      {/* 🌟 Contact Our Team Section */}
      <div className="section-box">
        <h2 className="section-heading">Contact Our Team</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <select value={selectedRecipient} onChange={(e) => setSelectedRecipient(e.target.value)} required>
            <option value="luna.grandjean@student.griffith.ie">Luna</option>
            <option value="maia.jouenne@student.griffith.ie">Maia</option>
          </select>
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
