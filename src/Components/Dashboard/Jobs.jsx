import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/jobs.scss'
import JobForm from './JobForm';
import JobCard from './JobCard';

function Jobs(props) {

    const initialValues = { 
        position: '', 
        company: '', 
        link: '', 
        method: '',
        appDate: '',
        notes: '',
        interview: false
      }

    return(
        <div className="jobsPage">
           <JobForm initialValues={initialValues} />
           {props.jobs.map(job => {
            return <JobCard job={job} key={job.id} />
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
