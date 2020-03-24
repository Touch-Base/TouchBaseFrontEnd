import React, { useState, useEffect } from "react";
import "../../Styling/dashboard/events.scss";
import Modal from "./Modal";
import EventForm from "./EventForm";
import { motion } from "framer-motion";

function Event(props) {
  /// we have to use 'evt' for the props event variable because it will confuse with
  /// actual jquery events

  // this is the visibility for the descritpion
  const [description, setVisibility] = useState(false);

  // this is the visibility for the modal
  const [form, setVisible] = useState(false);

  // this is the delete button
  const deleteButton = event => {
    event.preventDefault();

    const id = props.evt.id;

    props.removeEvent(id);

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
    console.log("here here");
  }, [props]);

  // variants for card animation
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -25 }
  };

  return (
    <motion.div
      variants={item}
      transition={{ ease: "easeIn" }}
      className="eventCard"
    >
      <h1>{props.evt.name.toUpperCase()}</h1>
      <div className="evtRows">
        <div className="evtRow">
          <i className="fas fa-map-marker-alt"></i>
          <h5>{props.evt.location.toUpperCase()}</h5>
        </div>
        <div className="evtRow">
          <i className="far fa-calendar-alt"></i>
          <h4>{props.evt.date.toUpperCase()}</h4>
        </div>
        <div className="descEvtRow">
          <button className="editEvt" onClick={showForm}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          {description ? <p>{props.evt.description}</p> : <p>"hello"</p>}
        </div>
      </div>

      {/* // edit connection form modal */}
      <Modal visible={form}>
        <div className="grayedBackdrop">
          <div className="editEventForm">
            <h3 className="editEvtTitle">EDIT EVENT</h3>
            <button className="closeButton" onClick={showForm}>
              <i className="fas fa-times"></i>
            </button>
            <EventForm
              initialValues={props.evt}
              editing={true}
              id={props.evt.id}
            />
            <button className="deleteEvtButton" onClick={deleteButton}>
              DELETE EVENT
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

export default Event;
