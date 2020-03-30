import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../Styling/dashboard/networking.scss";
import EventForm from "./EventForm";
import EventCard from "./EventCard";
import Modal from "./Modal";
import { deleteEvent } from "../../actions/index";
import { motion } from "framer-motion";

function Events(props) {
  // this sets the visibility for adding a new event form
  const [evtform, setEvt] = useState(false);

  // this sets the value for the search feature
  const [searchValue, setSearch] = useState("");

  // these empty values are passed to the event form
  // for adding a new event
  const initialValues = {
    name: "",
    location: "",
    date: "",
    description: "",
    attended: false
  };

  // this function sets the visibility for the add form
  const showAddEvt = event => {
    event.preventDefault();

    setEvt(!evtform);
  };

  // change handler for search value
  const searchChange = event => {
    event.preventDefault();

    setSearch(event.target.value);
  };

  useEffect(() => {
    // checks to see if the evt was added
    // and closes the add box
    setEvt(false);
  }, [props]);

  // search array
  const searchedEvt = props.events.filter(evt =>
    evt.name.toUpperCase().includes(searchValue.toUpperCase())
  );

  // using 'evt' as the variable to avoid javascript confusion

  return (
    <div className="eventsPage">
      <input
        type="text"
        placeholder="Search by event name"
        onChange={searchChange}
        value={searchValue}
      />
      {props.events.length < 1 ? <h1>Add an event!</h1> : null}
      <div className="eventsBlocks">
        {searchValue === ""
          ? props.events.map(evt => {
              return <EventCard removeEvent={props.deleteEvent} evt={evt} />;
            })
          : searchedEvt.map(evt => {
              return <EventCard removeEvent={props.deleteEvent} evt={evt} />;
            })}
      </div>
      <button
        className={evtform ? "exOutEvt" : "addEvtButton"}
        onClick={showAddEvt}
      >
        <i className={evtform ? "fas fa-times" : "fas fa-plus"}></i>
      </button>

      <Modal visible={evtform}>
        <div className="grayedBackdrop">
          <div className="editEventForm" id="addEvent">
            <h3>ADD EVENT</h3>
            <EventForm initialValues={initialValues} addingEvt={true} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    events: state.user.events
  };
};

const mapDispatchToProps = {
  deleteEvent: deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
