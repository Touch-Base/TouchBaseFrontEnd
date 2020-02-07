import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/jobs.scss'
import Job from './Job.jsx';

function Jobs(props) {

    return(
        <div className="jobsPage">
          {props.jobs.map(job => {
            return <Job job={job} />
           })}
        </div>
        )
    }

const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        jobs: state.user.jobs
    }
  }
  
  export default(
    connect(
        mapStateToProps,
        null
    )(Jobs)
  );
