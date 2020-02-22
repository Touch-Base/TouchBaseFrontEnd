import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/jobs.scss'
import JobForm from './JobForm';
import JobCard from './JobCard';
import { deleteJob } from '../../actions/index';

function Jobs(props) {

    // these empty values are passed to the jobs form 
    // for adding a new job
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
            {/* this job form is only 
            for adding a job, checking with an 'adding' prop */}
           <JobForm initialValues={initialValues} adding={true}/>
           {props.jobs.map(job => {
            return <JobCard job={job} removeJob={props.deleteJob} key={job.id} />
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

  const mapDispatchToProps = {
    deleteJob: deleteJob    
  }
  
  export default(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Jobs)
  );
