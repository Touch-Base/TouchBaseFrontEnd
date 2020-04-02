import React, { useState } from "react";
import "../../Styling/support.scss";
import { motion } from "framer-motion";
import * as emailjs from "emailjs-com";

function Support() {
  const [message, setMessage] = useState({ name: "", email: "", message: "" });

  const changeHandler = event => {
    event.preventDefault();

    setMessage({ ...message, [event.target.name]: event.target.value });
  };

  /// using basic jquery so it's easier to track the css and separate this information

  const sendMessage = event => {
    event.preventDefault();

    const { name, email, message } = message;

    let templateParams = {
      name: name,
      message: message,
      email: email
    };

    let popup = document.getElementById("popUp");

    if (name && message && email) {
      emailjs
        .send(
          "gmail",
          "template_SPqTzvPP",
          templateParams,
          "user_ok070rGofhMku7T0N56rz"
        )
        .then(res => {
          popup.style.opacity = "1";
          popup.innerHTML = "Sent!";

          setTimeout(function() {
            popup.style.opacity = "0";
          }, 3000);
        })
        .catch(err => {
          console.error(err);
        });

      setMessage({ name: "", email: "", message: "" });
    } else {
      popup.style.opacity = "1";
      popup.innerHTML = "Please fill out all fields.";

      setTimeout(function() {
        popup.style.opacity = "0";
      }, 3000);
    }
  };
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-50%" }}
      className="contactBlock"
    >
      <div id="popUp" style={{ opacity: "0" }}>
        Sent!
      </div>
      <h5 className="projectsHeader">Contact</h5>
      <div className="emptyBorder"></div>
      <form onSubmit={sendMessage} className="contactForm">
        <input
          onChange={changeHandler}
          value={message.name}
          name="name"
          type="text"
          placeholder="Name"
        ></input>
        <input
          onChange={changeHandler}
          value={message.email}
          name="email"
          type="text"
          placeholder="E-mail"
        ></input>
        <textarea
          onChange={changeHandler}
          value={message.message}
          name="message"
          type="text"
          placeholder="Your message"
          rows="4"
          cols="50"
        ></textarea>
        <button>
          SEND <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </motion.div>
  );
}

export default Support;
