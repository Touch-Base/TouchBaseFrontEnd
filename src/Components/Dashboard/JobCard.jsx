import React, { useState } from 'react';
import '../../Styling/dashboard/jobs.scss';
import JobForm from './JobForm';
import { TwitterPicker } from 'react-color';
import Modal from './Modal';
import { connect } from 'react-redux';
import { editJob } from '../../actions/index';


function Job(props) {

    // this controls the visibility of the modal for the form

    const [ visible, setVisibility ] = useState(false);
    const [ bgcolor, setColor ] = useState (props.job.color || "rgb(186, 43, 214)");
    const [ picker, setShowPicker ] = useState(false);
    const [ notes, setShowNotes ] = useState(false);

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
        <div className="jobCard" style={{background: bgcolor}}>
          <h1 className="jobCompany">{props.job.company.toUpperCase()}</h1>
          <h1 className="jobTitle">{props.job.position}</h1>
          <h2 className="appliedText">Applied on: <span>{props.job.appDate}</span> via <span>{props.job.method}</span></h2>
          <h2 className={props.job.interview ? "interview" : "nointerview"}>
            {props.job.interview ? "INTERVIEW REQUESTED" : "NO INTERVIEW"}
          </h2>

          {/* this is the color picker and the button */}
          <button className="colorButton" onClick={handleClick}>
          <i className="fas fa-palette"></i>
          </button>
        {picker ? <div style={popover}>
          <div style={cover} onClick={handleClose}/>
            <TwitterPicker 
              color={bgcolor}
              onChangeComplete={handleChangeComplete}
            />
        </div> : null }

          {/* this is the edit button */}
          <a target="_blank" rel="noopener noreferrer" className="jobLink" href={props.job.link}>
            <i className="fas fa-link"></i>
          </a>
          <button className="editLink" onClick={showForm}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          
          {/* this button shows and hides the notes for each card */}
          <button className="notes" onClick={handlesNotes}>
            <i className="fas fa-quote-left">&nbsp;</i>    
            <i className="fas fa-quote-right"></i>
          </button>
          {notes ? <div style={popover}>
          <div style={cover} onClick={handleClose}/>
          <p>{props.job.notes}</p>
        </div> : null }

          {/* this is the modal for the form */}
          <Modal visible={visible}>
            <div className="jobForm">
              <JobForm initialValues={props.job} editing={true} id={props.job.id} />
              <button onClick={showForm}>CLOSE</button>
              <button onClick={deleteButton}>DELETE JOB</button>
            </div>
          </Modal>
        </div>
        )
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
  
