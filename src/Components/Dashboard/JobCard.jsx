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
          <button className="jobLink">
            LINK
          </button>
          <h3>Notes: {props.job.notes}</h3>
          <button onClick={showForm}>EDIT</button>
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
  
