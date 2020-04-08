import React, { useState, useEffect } from "react";
import "../../../Styling/dashboard/jobs/jobs.scss";
import "../../../Styling/dashboard/jobs/jobcard.scss";
import JobForm from "./JobForm";
import { TwitterPicker } from "react-color";
import Modal from "../../Helpers/Modal";
import { connect } from "react-redux";
import { editJob } from "../../../actions/index";
import { motion } from "framer-motion";

function JobCard(props) {
  const [visible, setVisibility] = useState(false);
  const [bgcolor, setColor] = useState(props.job.color || "#141c39");
  const [picker, setShowPicker] = useState(false);
  const [notes, setShowNotes] = useState(false);
  const [clickedJob, setClickedJob] = useState(false);

  // this controls the visibility of the modal for the form

  const showForm = (event) => {
    event.preventDefault();

    setVisibility(!visible);
  };

  const deleteButton = (event) => {
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
  const handleChangeComplete = (color) => {
    setColor(color.hex);
    const newColor = color.hex;
    const payload = { color: newColor, id: props.job.id };
    props.editJob(payload);
  };

  /// this handles the favorite picker
  /// it also sends the favorite information to the server
  const handleChangeFavorite = (event) => {
    const payload = { favorite: !props.job.favorite, id: props.job.id };
    props.editJob(payload);
  };

  // this is the handler to show the notes
  const handlesNotes = (event) => {
    event.preventDefault();

    setShowNotes(!notes);
  };

  // this is the handler to show the color picker
  const handleClick = () => {
    setShowPicker(!picker);
  };

  // this closes both the color picker and notes
  const handleClose = () => {
    setShowPicker(false);
    setShowNotes(false);
  };

  // this opens the job tile
  const clickJob = () => {
    setClickedJob(!clickedJob);
  };

  // this is the positioning for the color picker
  const popover = {
    position: "absolute",
    top: "200px",
    opacity: 1,
    transition: "opacity 0.5s",
    border: "none",
  };

  const popoverhide = {
    position: "absolute",
    top: "200px",
    opacity: 0,
    transition: "opacity 0.5s",
    pointerEvents: "none",
  };

  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  // new date
  let date = new Date(props.job.appDate);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: "-25%" }}
      className="jobCard"
      style={{ background: bgcolor }}
      onClick={clickJob}
    >
      <h1 className="jobCompany">{props.job.company.toUpperCase()}</h1>
      <h1 className="jobTitle">{props.job.position}</h1>
      <h2 className="appliedText">
        Applied on:{" "}
        <span>
          {date
            .toLocaleString(navigator.language, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
            .toUpperCase()}
        </span>{" "}
        via <span>{props.job.method}</span>
      </h2>
      <h2 className={props.job.interview ? "interview" : "nointerview"}>
        {props.job.interview ? "INTERVIEW REQUESTED" : "NO INTERVIEW"}
      </h2>

      {/* this is the color picker and the button */}
      <button className="colorButton" onClick={handleClick}>
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

      {/* this is the favorite button for the job */}
      <button className="favoriteButton" onClick={handleChangeFavorite}>
        <i className={props.job.favorite ? "fas fa-star" : "far fa-star"}></i>
      </button>

      {/* popout button to exit the modal */}
      <button onClick={props.closeCard} className="exitJobCard">
        <i className="fas fa-times" />
      </button>

      <a
        target="_blank"
        rel="noopener noreferrer"
        className="jobLink"
        href={
          props.job.link && props.job.link.includes("http")
            ? props.job.link
            : "http://" + props.job.link
        }
      >
        <i className="fas fa-link"></i>
      </a>

      {/* this is the edit button */}
      <button className="editLink" onClick={showForm}>
        <i className="fas fa-pencil-alt"></i>
      </button>

      {/* this button shows and hides the notes for each card */}
      <button className="notes" onClick={handlesNotes}>
        <i className="fas fa-quote-left">&nbsp;</i>
        <i className="fas fa-quote-right"></i>
      </button>
      <div style={notes ? popover : popoverhide}>
        <div style={cover} onClick={handleClose} />
        <p>
          {props.job.notes && props.job.notes.length > 1
            ? props.job.notes
            : "Add some notes!"}
        </p>
      </div>

      {/* this is the modal for the edit form */}
      <Modal visible={visible}>
        <div className="jobForm" id="editJobForm">
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
  editJob: editJob,
};

export default connect(null, mapDispatchToProps)(JobCard);
