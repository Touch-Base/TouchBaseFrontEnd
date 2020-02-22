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


    return(
        <div className="jobCard">
          <h1>{props.job.company}</h1>
          <h1>{props.job.position}</h1>
          <h2>Applied on {props.job.appDate}</h2>
          <h2>{props.job.method}</h2>
          <h3>Notes: {props.job.notes}</h3>
          <button onClick={showForm}>EDIT</button>
          <Modal visible={visible}>
            <JobForm initialValues={props.job} />
            <button onClick={showForm}>CLOSE</button>
          </Modal>
        </div>
        )
    }

  
  export default Job;
