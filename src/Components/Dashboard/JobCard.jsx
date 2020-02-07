import React from 'react';
import '../../Styling/dashboard/jobs.scss'

function Job(props) {

    return(
        <div className="jobCard">
          <h1>{props.job.company}</h1>
          <h1>{props.job.position}</h1>
          <h2>Applied on {props.job.appDate}</h2>
          <h2>{props.job.method}</h2>
          <h3>Notes: {props.job.notes}</h3>
          <button>EDIT</button>
        </div>
        )
    }

  
  export default Job;
