import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/jobs.scss'
import JobForm from './JobForm';
import JobCard from './JobCard';
import JobRow from './JobRow';
import { deleteJob } from '../../actions/index';
import Modal from './Modal';
import { Switch } from '@material-ui/core';

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
    
    // this sets the value for the search feature
    const [ searchValue, setSearch ] = useState('');

    const showAddForm = event => {
      event.preventDefault();

      setVisibility(!visibleAdd)
    }
    
    // change handler for search value
    const searchChange = event => {
       event.preventDefault();
        
       setSearch(event.target.value);
    }
    
    // this function is the switch for how the jobs are displayed
    const switchOrganizer = event => {
        event.preventDefault();
        
        setOrganizer(!table);
    }
    
    // this closes the modal once there is a redux state change
    useEffect(() => {
        setVisibility(false)
      }, [props.jobs]);
    
    // search array
    const searchedJobs = props.jobs.filter(job => job.company.includes(searchValue))


    
    {/*this checks to see how the jobs should be displayed */}
    if(table) {
        return(
            <div className="jobsPage">
                {/* this job form pops up with a modal and is only 
                for adding a job, checking with an 'adding' prop */}
                <Modal visible={visibleAdd}>
                    <JobForm initialValues={initialValues} adding={true}/>
                </Modal>
                <Switch onClick={switchOrganizer} checked={false} />
                Search by company
                <input type="text" placeholder="Company" onChange={searchChange} value={searchValue} />
                <button className={visibleAdd ? "exOutButton" : "addJobButton"} onClick={showAddForm}>
                    <i className={visibleAdd ? "fas fa-times" : "fas fa-plus"}></i>
                </button>
                <div className="jobsTable">
                    <div className="columnNames">
                        <h4 id="cocolumn">Company</h4>
                        <h4 id="pocolumn">Position</h4>
                        <h4 id="appcolumn">App Date</h4>
                        <h4 id="interviewcolumn">Interview</h4>
                        <h4 id="notescolumn">Notes</h4>
                        <h4 id="methodcolumn">Method</h4>
                        <h4 id="colorcolumn">Color</h4>
                        <h4 id="linkcolumn">Link</h4>
                        <h4 id="editcolumn">Edit</h4>
                    </div>
                    {searchValue === '' ? 
                        props.jobs.map(job => {
                            return <JobRow job={job} removeJob={props.deleteJob} key={job.id} />
                    }) :
                        searchedJobs.map(job => {
                            return <JobRow job={job} removeJob={props.deleteJob} key={job.id} />
                    })}
                </div>
            </div>
        )} else {
            return(
                <div className="jobsPage">
                {/* this job form pops up with a modal and is only 
                for adding a job, checking with an 'adding' prop */}
                <Modal visible={visibleAdd}>
                    <JobForm initialValues={initialValues} adding={true}/>
                </Modal>
                <Switch onClick={switchOrganizer} checked={true}/>
                Search by company
                <input type="text" placeholder="Company" onChange={searchChange} value={searchValue} />
                <button className={visibleAdd ? "exOutButton" : "addJobButton"} onClick={showAddForm}>
                    <i className={visibleAdd ? "fas fa-times" : "fas fa-plus"}></i>
                </button>
                <div className="jobsBlocks">
                    {searchValue === '' ? 
                        props.jobs.map(job => {
                            return <JobCard job={job} removeJob={props.deleteJob} key={job.id} />
                    }) :
                         searchedJobs.map(job => {
                            return <JobCard job={job} removeJob={props.deleteJob} key={job.id} />
                    })}
                </div>
            </div>
            )
        }
            
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
