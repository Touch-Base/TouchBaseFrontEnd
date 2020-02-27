import React, { useState, useEffect } from 'react';
import '../../Styling/dashboard/jobs.scss';
import JobForm from './JobForm';
import { TwitterPicker } from 'react-color';
import Modal from './Modal';
import { connect } from 'react-redux';
import { editJob } from '../../actions/index';


function JobRow(props) {
  
    const [ visible, setVisibility ] = useState(false);
    const [ bgcolor, setColor ] = useState (props.job.color || "rgb(186, 43, 214)");
    const [ picker, setShowPicker ] = useState(false);
    const [ notes, setShowNotes ] = useState(false);
  
      // this controls the visibility of the modal for the form
    
    const showForm = event => {
      event.preventDefault();

      setVisibility(!visible)
    }

    const deleteButton = event => {
      event.preventDefault();

      const id = props.job.id

      props.removeJob(id)

      setVisibility(false)
    }

    useEffect(() => {

      // checks to see if the job was updated
      // and closes the edit box
      setVisibility(false)

    }, [props.job]);

    /// this handles the color change in the color picker
    /// it also sends the color to the job on the server
    const handleChangeComplete = (color) => {
      setColor(color.hex);
      const newColor = color.hex
      const payload = { color: newColor, id: props.job.id }
      props.editJob(payload)
    };

    // this is the handler to show the notes
    const handlesNotes = (event) => {
      event.preventDefault();

      setShowNotes(!notes);
    };

    // this is the handler to show the color picker
    const handleClick = () => {
      setShowPicker(!picker)
    };
  
    // this closes both the color picker and notes
    const handleClose = () => {
      setShowPicker(false)
      setShowNotes(false)
    };

    // this is the positioning for the color picker
    const popover = {
      position: 'absolute',
      zIndex: '2',
      top: '200px'
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

  
  return(
    <div className="jobRow">
      <h1 className="jobcolumn" id="company">{props.job.company}</h1>
      <h1 className="jobcolumn" id="position">{props.job.position}</h1>
      <h1 className="jobcolumn" id="appDate">{props.job.appDate}</h1>
      <h1 className="jobcolumn" id="interview">{props.job.interview ? "Yes" : "No interview"}</h1>
      <h1 className="jobcolumn" id="notes">{props.job.notes}</h1>
      <button onClick={>color</button>
      {/* this is the color picker and the button */}
      <button className="colorColumn" onClick={handleClick}>
        Change Color
      </button>
        {picker ? <div style={popover}>
        <div style={cover} onClick={handleClose}/>
          <TwitterPicker 
            color={bgcolor}
            onChangeComplete={handleChangeComplete}
          />
        </div> : null }
       <button className="editColumn" onClick={showForm}>
            Edit
       </button>
                       
                       
      {/* this is the modal for the edit form */}
      <Modal visible={visible}>
        <div className="jobForm">
          <h1 className="editJobTitle">EDIT JOB</h1>
          <JobForm initialValues={props.job} editing={true} id={props.job.id} />
          <button className="closeButton" onClick={showForm}>
            <i className="fas fa-times"></i>
          </button>
          <button className="deleteButton" onClick={deleteButton}>DELETE JOB</button>
        </div>
      </Modal>
    </div>
  
}

const mapDispatchToProps = {
  editJob: editJob    
}

export default(
  connect(
      null,
      mapDispatchToProps
  )(Job)
);
