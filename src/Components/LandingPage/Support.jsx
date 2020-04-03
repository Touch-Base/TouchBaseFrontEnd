import React, { useState } from "react";
import "../../Styling/support.scss";
import "../../Styling/landingPageMobile/supportMobile.scss";
import { motion } from "framer-motion";
import * as emailjs from "emailjs-com";

function Support() {
  const [payload, setMessage] = useState({ name: "", email: "", message: "" });

  const changeHandler = event => {
    event.preventDefault();

    setMessage({ ...payload, [event.target.name]: event.target.value });
  };

  /// using basic jquery so it's easier to track the css and separate this information

  const sendMessage = event => {
    event.preventDefault();

    const { name, email, message } = payload;

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
      <h2>Want to report a bug or make a suggestion?</h2>
      <form onSubmit={sendMessage} className="contactForm">
        <input
          onChange={changeHandler}
          value={payload.name}
          name="name"
          type="text"
          placeholder="Name"
        ></input>
        <input
          onChange={changeHandler}
          value={payload.email}
          name="email"
          type="text"
          placeholder="E-mail"
        ></input>
        <textarea
          onChange={changeHandler}
          value={payload.message}
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
