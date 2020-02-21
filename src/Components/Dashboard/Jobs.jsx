import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/jobs.scss'
// import JobCard from './JobCard';
import JobForm from './JobForm';
import JobCard from './JobCard';
import axios from 'axios';

function Jobs(props) {
    
    let jobOrganizer = 'table'
    let toggleColor = 'blue'
    let organizeType = 'TABLE'

    const [ tswitch, toggleSwitch ] = useState(false);
    
        
    const changeCards = event => {
        event.preventDefault();
        
        toggleSwitch(!tswitch);

        console.log(tswitch)
    }

    return(
        <div className={jobOrganizer}>
           <button onClick={changeCards} className={toggleColor}>{organizeType}</button>
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
