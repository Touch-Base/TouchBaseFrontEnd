import React, { useState } from 'react';
import '../../Styling/dashboard/jobs.scss';
import JobForm from './JobForm';

function Job(props) {

    const [ visible, setVisibility ] = useState(false);

    const showForm = event => {
      event.preventDefault();

      setVisibility(!visible)

      console.log(visible)
    }

    let updateForm = 'test'

    return(
        <div className="jobCard">
          <h1>{props.job.company}</h1>
          <h1>{props.job.position}</h1>
          <h2>Applied on {props.job.appDate}</h2>
          <h2>{props.job.method}</h2>
          <h3>Notes: {props.job.notes}</h3>
          <button onClick={showForm}>EDIT</button>
          <div className={updateForm}>
            <JobForm initialValues={props.job} />
          </div>
        </div>
        )
    }

  
  export default Job;
