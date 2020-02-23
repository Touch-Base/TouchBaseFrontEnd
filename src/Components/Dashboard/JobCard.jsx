import React, { useState } from 'react';
import '../../Styling/dashboard/jobs.scss';
import JobForm from './JobForm';
import { TwitterPicker } from 'react-color';
import Modal from './Modal';


function Job(props) {

    // this controls the visibility of the modal for the form

    const [ visible, setVisibility ] = useState(false);
    const [ bgcolor, setColor ] = useState("rgb(186, 43, 214)");
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
    const handleChangeComplete = (color) => {
      setColor(color.hex);
    };

    const handlesNotes = (event) => {
      event.preventDefault();

      setShowNotes(!notes);
    };

    const handleClick = () => {
      setShowPicker(!picker)
    };
  
    const handleClose = () => {
      setShowPicker(false)
      setShowNotes(false)
    };

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
          <button className="colorButton" onClick={handleClick}>
          <i class="fas fa-palette"></i>
          </button>
        {picker ? <div style={popover}>
          <div style={cover} onClick={handleClose}/>
            <TwitterPicker 
              color={bgcolor}
              onChangeComplete={handleChangeComplete}
            />
        </div> : null }
          <a target="_blank" rel="noopener noreferrer" className="jobLink" href={props.job.link}>
            <i className="fas fa-link"></i>
          </a>
          <button className="editLink" onClick={showForm}>
            <i class="fas fa-pencil-alt"></i>
          </button>
          
          {/* this button shows and hides the notes for each card */}
          <button className="notes" onClick={handlesNotes}>
            <i class="fas fa-quote-left">&nbsp;</i>    
            <i class="fas fa-quote-right"></i>
          </button>
          {notes ? <div style={popover}>
          <div style={cover} onClick={handleClose}/>
          <p>{props.job.notes}</p>
        </div> : null }

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

    export default Job;
  
