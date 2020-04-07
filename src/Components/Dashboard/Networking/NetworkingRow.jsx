import React, { useState, useEffect } from "react";
import "../../../Styling/dashboard/networking/networkingrow.scss";
import "../../../Styling/dashboard/networking/networking.scss";
import NetworkingForm from "./NetworkingForm";
import Modal from "../../Helpers/Modal";
import { motion } from "framer-motion";

function NetworkingRow(props) {
  const [visible, setVisibility] = useState(false);
  const [notes, setShowNotes] = useState(false);

  // this controls the visibility of the modal for the form

  const showForm = event => {
    event.preventDefault();

    setVisibility(!visible);
    setShowNotes(false);
  };

  const deleteButton = event => {
    event.preventDefault();

    const id = props.connection.id;

    props.removeCnx(id);

    setVisibility(false);
  };

  useEffect(() => {
    // checks to see if the job was updated
    // and closes the edit box
    setVisibility(false);
  }, [props.connection]);

  // this is the handler to show the notes
  const handlesNotes = event => {
    event.preventDefault();

    setShowNotes(!notes);
  };

  // this closes the notes
  const handleClose = () => {
    setShowNotes(false);
  };

  // variants for card animation
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -25 }
  };

  // this is the positioning for the notes
  const popupNotes = {
    position: "absolute",
    zIndex: "2",
    top: "40px",
    opacity: 1,
    transition: "opacity 0.5s",
    border: "none"
  };

  const popupNotesHide = {
    position: "absolute",
    zIndex: "2",
    top: "40px",
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

  return (
    <motion.div
      variants={item}
      transition={{ ease: "easeIn" }}
      className="connectionRow"
    >
      <h5 className="cnxcolumn" id="cnxname">
        {props.connection.firstname} {props.connection.lastname}
      </h5>
      <h5 className="cnxcolumn" id="cnxcompany">
        {props.connection.company}
      </h5>
      <h5 className="cnxcolumn" id="cnxtitle">
        {props.connection.title}
      </h5>
      <h5 className="cnxcolumn" id="cnxphone">
        {props.connection.phone}
      </h5>
      <a href={props.connection.email}>
        <i className="fas fa-at"></i>
      </a>
      <button className="notesRow" onClick={handlesNotes}>
        <i className="fas fa-quote-left">&nbsp;</i>
        <i className="fas fa-quote-right"></i>
      </button>
      <div style={notes ? popupNotes : popupNotesHide}>
        <div style={cover} onClick={handleClose} />
        <p>{props.connection.notes}</p>
      </div>

      {/* this is the edit button */}
      <button className="editButton" onClick={showForm}>
        <i className="fas fa-pencil-alt"></i>
      </button>

      {/* this is the modal for the edit form */}
      <Modal visible={visible}>
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

export default NetworkingRow;
