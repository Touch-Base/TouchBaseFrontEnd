import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/jobs.scss'
import JobForm from './JobForm';
import JobCard from './JobCard';
import JobRow from './JobRow';
import { deleteJob } from '../../actions/index';
import Modal from './Modal';

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

    // this sets the visibility for the job form modal
    const [ visibleAdd, setVisibility ] = useState(false);
    
    // this sets whether the jobs will be displayed as cards or in a table
    const [ table, setOrganizer ] = useState(false);

    const showAddForm = event => {
      event.preventDefault();

      setVisibility(!visibleAdd)
    }
    
    // this function is the switch for how the jobs are displayed
    const switchOrganizer = event -> {
        event.preventDefault();
        
        setOrganizer(!table);
    }
    
    // this closes the modal once there is a redux state change
    useEffect(() => {
        setVisibility(false)
      }, [props.jobs]);
    
    return(
        <div className="jobsPage">
            {/* this job form pops up with a modal and is only 
            for adding a job, checking with an 'adding' prop */}
            <Modal visible={visibleAdd}>
                <JobForm initialValues={initialValues} adding={true}/>
            </Modal>
            <button onClick={switchOrganizer}>Change Style</button>
            <button className={visibleAdd ? "exOutButton" : "addJobButton"} onClick={showAddForm}>
                <i className={visibleAdd ? "fas fa-times" : "fas fa-plus"}></i>
            </button>
            
            {/*this checks to see how the jobs should be displayed */}
            {if(table) {
                return(
                    <div className="jobsBlocks">
                        {props.jobs.map(job => {
                            return <JobCard job={job} removeJob={props.deleteJob} key={job.id} />
                        })}
                    </div>
                    )
            } else {
                return(
                    <div className="jobsTable">
                        {props.jobs.map(job => {
                            return <JobRow job={job} removeJob={props.deleteJob} key={job.id} />
                        })}
                    </div>
                    )
                }
             }
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
