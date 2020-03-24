import React, { useState, useEffect } from "react";
import "../../Styling/dashboard/jobrow.scss";
import "../../Styling/dashboard/jobs.scss";
import JobForm from "./JobForm";
import { TwitterPicker } from "react-color";
import Modal from "./Modal";
import { connect } from "react-redux";
import { editJob } from "../../actions/index";
import { motion } from "framer-motion";

function JobRow(props) {
  const [visible, setVisibility] = useState(false);
  const [bgcolor, setColor] = useState(props.job.color || "rgb(186, 43, 214)");
  const [picker, setShowPicker] = useState(false);
  const [notes, setShowNotes] = useState(false);

  // this controls the visibility of the modal for the form

  const showForm = event => {
    event.preventDefault();

    setVisibility(!visible);
    setShowNotes(false);
  };

  const deleteButton = event => {
    event.preventDefault();

    const id = props.job.id;

    props.removeJob(id);

    setVisibility(false);
  };

  useEffect(() => {
    // checks to see if the job was updated
    // and closes the edit box
    setVisibility(false);
  }, [props.job]);

  /// this handles the color change in the color picker
  /// it also sends the color to the job on the server
  const handleChangeComplete = color => {
    setColor(color.hex);
    const newColor = color.hex;
    const payload = { color: newColor, id: props.job.id };
    props.editJob(payload);
  };

  // this is the handler to show the notes
  const handlesNotes = event => {
    event.preventDefault();

    setShowNotes(!notes);
  };

  // this is the handler to show the color picker
  const handleClick = () => {
    setShowPicker(!picker);
    setShowNotes(false);
  };

  // this closes both the color picker and notes
  const handleClose = () => {
    setShowPicker(false);
    setShowNotes(false);
  };

  // this is the positioning for the color picker
  const popover = {
    position: "absolute",
    zIndex: "2",
    top: "50px",
    right: "3px"
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
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

  // variants for card animation
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -25 }
  };

  return (
    <motion.div
      variants={item}
      transition={{ ease: "easeIn" }}
      className="jobRow"
      style={{ background: bgcolor }}
    >
      <h5 className="jobcolumn" id="company">
        {props.job.company}
      </h5>
      <h5 className="jobcolumn" id="position">
        {props.job.position}
      </h5>
      <h5 className="jobcolumn" id="appDate">
        {props.job.appDate}
      </h5>
      <h5
        className="jobcolumn"
        id={props.job.interview ? "interview" : "nointerview"}
      >
        {props.job.interview ? (
          <i className="fas fa-check"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </h5>

      {/* NOTES */}
      {/* this button shows and hides the notes for each card */}
      <button className="notesRow" onClick={handlesNotes}>
        <i className="fas fa-quote-left">&nbsp;</i>
        <i className="fas fa-quote-right"></i>
      </button>
      <div style={notes ? popupNotes : popupNotesHide}>
        <div style={cover} onClick={handleClose} />
        <p>{props.job.notes}</p>
      </div>

      {/* job method */}
      <h5 className="jobcolumn" id="method">
        {props.job.method}
      </h5>

      {/* this is the color picker and the button */}
      <button className="colorColumn" onClick={handleClick}>
        <i className="fas fa-palette"></i>
      </button>
      {picker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <TwitterPicker
            color={bgcolor}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      ) : null}
      {/* this is the link button */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="linkButton"
        href={props.job.link}
      >
        <i className="fas fa-link"></i>
      </a>

      {/* this is the edit button */}
      <button className="editButton" onClick={showForm}>
        <i className="fas fa-pencil-alt"></i>
      </button>

      {/* this is the modal for the edit form */}
      <Modal visible={visible}>
        <div className="jobForm">
          <h1 className="editJobTitle">EDIT JOB</h1>
          <JobForm initialValues={props.job} editing={true} id={props.job.id} />
          <button className="closeButton" onClick={showForm}>
            <i className="fas fa-times"></i>
          </button>
          <button className="deleteButton" onClick={deleteButton}>
            DELETE JOB
          </button>
        </div>
      </Modal>
    </motion.div>
  );
}

const mapDispatchToProps = {
  editJob: editJob
};

export default connect(null, mapDispatchToProps)(JobRow);
