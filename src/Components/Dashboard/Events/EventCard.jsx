import React, { useState, useEffect } from "react";
import "../../../Styling/dashboard/events/events.scss";
import "../../../Styling/dashboard/events/eventform.scss";
import Modal from "../../Helpers/Modal";
import EventForm from "./EventForm";
import { motion } from "framer-motion";
import useWindowDimensions from "../../Helpers/WindowSize";
import moment from "moment";

function Event(props) {
  /// we have to use 'evt' for the props event variable because it will confuse with
  /// actual jquery events

  // width of window from window component
  const { width } = useWindowDimensions();

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
  }, [props]);

  // these are the variable stylings for the event descrip
  // this is the positioning for the notes

  // this decides where the popover is depending on mobile/web
  let topPop = "200px";

  if (width <= 620) {
    topPop = "130px";
  }

  const popover = {
    position: "absolute",
    zIndex: "2",
    top: topPop,
    opacity: 1,
    transition: "opacity 0.5s"
  };

  const popoverhide = {
    position: "absolute",
    zIndex: "2",
    top: topPop,
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

  // new date
  let date = new Date(props.evt.date.replace(/-/g, "/").replace(/T.+/, ""));

  // get 12 hour time
  function convert(input) {
    return moment(input, "HH:mm").format("h:mm A");
  }

  const newtime = convert(props.evt.time);

  console.log(props.evt.date);
  console.log(date);

  return (
    <motion.div
      variants={item}
      transition={{ ease: "easeIn" }}
      className={props.index === 0 ? "eventCard nextEvent" : "eventCard"}
    >
      <h1>
        {props.evt.name.toUpperCase()}
        <span className={props.index === 0 ? "upcoming" : "upcomingHide"}>
          next event!
        </span>
      </h1>
      <div className="evtRows">
        <div className="evtRow">
          <i className="fas fa-map-marker-alt"></i>
          <h5>{props.evt.location.toUpperCase()}</h5>
        </div>
        <div className="evtRow">
          <i className="far fa-calendar-alt"></i>
          <h4 className="eventDate">
            {date
              .toLocaleString(navigator.language, {
                month: "long",
                day: "numeric",
                year: "numeric"
              })
              .toUpperCase()}{" "}
            {newtime}
          </h4>
        </div>
        <div className="descEvtRow">
          <button className="editEvt" onClick={showForm}>
            <i className="fas fa-pencil-alt"></i>
          </button>

          {props.evt.description ? (
            <p onClick={showEventDescription}>
              "
              {width > 620
                ? props.evt.description.substring(0, 30)
                : props.evt.description.substring(0, 15)}
              ..."
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
    </motion.div>
  );
}

export default Event;
