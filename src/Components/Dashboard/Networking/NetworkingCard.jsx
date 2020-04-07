import React, { useState, useEffect } from "react";
import Modal from "../../Helpers/Modal";
import NetworkingForm from "./NetworkingForm";
import "../../../Styling/dashboard/networking/networking.scss";
import { motion } from "framer-motion";

function Connection(props) {
  // this is the visibility for the notes
  const [notes, setVisibility] = useState(false);

  // this is the visibility for the modal
  const [form, setVisible] = useState(false);

  // this sets the visibility for notes
  const showNotes = event => {
    event.preventDefault();

    setVisibility(!notes);
  };

  // this closes notes
  const handleClose = () => {
    setVisibility(false);
  };

  // this is the delete button
  const deleteButton = event => {
    event.preventDefault();

    const id = props.connection.id;

    props.removeCnx(id);

    setVisibility(false);
  };

  // this sets the visibility for the form modal
  const showForm = event => {
    event.preventDefault();

    setVisible(!form);
  };

  useEffect(() => {
    // checks to see if the connection was updated
    // and closes the edit box
    setVisible(false);
    setVisibility(false);
  }, [props]);

  // this is the positioning for the notes
  const popover = {
    position: "absolute",
    zIndex: "2",
    top: "200px",
    opacity: 1,
    transition: "opacity 0.5s"
  };

  const popoverhide = {
    position: "absolute",
    zIndex: "2",
    top: "200px",
    opacity: 0,
    transition: "opacity 0.5s",
    pointerEvents: "none"
  };

  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
  };

  // variants for card animation
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -25 }
  };

  return (
    <motion.div
      variants={item}
      transition={{ ease: "easeIn" }}
      className="connectionCard"
    >
      <h1>
        {props.connection.firstname.toUpperCase()}{" "}
        {props.connection.lastname.toUpperCase()}
      </h1>
      <h5>{props.connection.company.toUpperCase()}</h5>
      <h4>{props.connection.title.toUpperCase()}</h4>
      <div className="cnxContact">
        <div className="cnxIcons">
          <i className="fas fa-phone"></i>
          <i className="fas fa-at"></i>
        </div>
        <div className="divider"></div>
        <div className="cnxAddresses">
          {props.connection.phone ? (
            <h4>{props.connection.phone}</h4>
          ) : (
            <h4 className="invisiblePhoneH4">.</h4>
          )}
          <a href={props.connection.email}>{props.connection.email}</a>
        </div>
      </div>

      {/* notes pop up */}
      <button className="cnxNotesButton" onClick={showNotes}>
        <i className="fas fa-quote-left">&nbsp;</i>
        <i className="fas fa-quote-right"></i>
      </button>
      <div style={notes ? popover : popoverhide}>
        <div style={cover} onClick={handleClose} />
        <p>{props.connection.notes}</p>
      </div>

      {/* edit button */}
      <button className="editCnx" onClick={showForm}>
        <i className="fas fa-pencil-alt"></i>
      </button>
      {/* // edit connection form modal */}
      <Modal visible={form}>
        <div className="modalBackdrop">
          <div className="editConnectionForm">
            <h3 className="editCnxTitle">EDIT CONNECTION</h3>
            <button className="closeButton" onClick={showForm}>
              <i className="fas fa-times"></i>
            </button>
            <NetworkingForm
              initialValues={props.connection}
              editing={true}
              id={props.connection.id}
            />
            <button className="deleteCnxButton" onClick={deleteButton}>
              DELETE CONNECTION
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

export default Connection;
