import React, { useState, useEffect } from "react";
import "../../Styling/dashboard/events.scss";
import "../../Styling/dashboard/eventform.scss";
import Modal from "./Modal";
import EventForm from "./EventForm";

function Event(props) {
  /// we have to use 'evt' for the props event variable because it will confuse with
  /// actual jquery events

  // this is the visibility for the modal
  const [form, setVisible] = useState(false);

  // state for the event descr iption
  const [eventDescrip, setEventDescrip] = useState(false);

  // this is the delete button
  const deleteButton = event => {
    event.preventDefault();

    const id = props.evt.id;

    props.removeEvent(id);
  };

  // this handles the event description modal
  const showEventDescription = event => {
    event.preventDefault();

    setEventDescrip(!eventDescrip);
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
    console.log("here here");
  }, [props]);

  // these are the variable stylings for the event descrip
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

  return (
    <div className="eventCard">
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

          {props.evt.description ? (
            <p onClick={showEventDescription}>
              "{props.evt.description.substring(0, 30)}..."
            </p>
          ) : (
            <p>Add a description!</p>
          )}

          {/* this shows the entire event description */}
          <div style={eventDescrip ? popover : popoverhide}>
            <div style={cover} onClick={showEventDescription} />
            <p className="eventDescripBlock">{props.evt.description}</p>
          </div>
        </div>
      </div>

      {/* // edit event form modal */}
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
    </div>
  );
}

export default Event;
