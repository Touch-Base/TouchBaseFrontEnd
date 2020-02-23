import React, { useState } from 'react';
import '../../Styling/dashboard/jobs.scss';
import JobForm from './JobForm';
import Modal from './Modal';


function Job(props) {

    // this controls the visibility of the modal for the form

    const [ visible, setVisibility ] = useState(false);

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


    return(
        <div className="jobCard">
          <h1 className="jobCompany">{props.job.company.toUpperCase()}</h1>
          <h1 className="jobTitle">{props.job.position}</h1>
          <h2 className="appliedText">Applied on: <span>{props.job.appDate}</span> via <span>{props.job.method}</span></h2>
          <h2 className={props.job.interview ? "interview" : "nointerview"}>
            {props.job.interview ? "Interview Requested" : "No Interview"}
          </h2>
          <a target="_blank" rel="noopener noreferrer" className="jobLink" href={props.job.link}>
            <i className="fas fa-link"></i>
          </a>
          <p>{props.job.notes}</p>
          <button className="editLink" onClick={showForm}>
            <i class="fas fa-pencil-alt"></i>
          </button>
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
  
