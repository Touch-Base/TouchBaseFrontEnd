import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/jobs.scss'
// import JobCard from './JobCard';
import JobForm from './JobForm';
import JobCard from './JobCard';
import axios from 'axios';

function Jobs(props) {

    return(
        <div className="jobsPage">
           <JobForm />
           {props.jobs.map(job => {
            return <JobCard job={job} />
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
