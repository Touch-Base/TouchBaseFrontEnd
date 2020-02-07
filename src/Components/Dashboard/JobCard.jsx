import React from 'react';
import '../../Styling/dashboard/jobs.scss'

function Job(props) {

    return(
        <div className="jobCard">
          <h1>props.job.company</h1>
          <h1>props.job.position</h1>
        </div>
        )
    }

  
  export default Job;
