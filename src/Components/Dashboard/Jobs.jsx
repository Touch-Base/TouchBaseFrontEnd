import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/jobs.scss'
// import JobCard from './JobCard';
import JobForm from './JobForm';
import JobCard from './JobCard';
import axios from 'axios';

function Jobs(props) {

    const getJobs = event => {
      event.preventDefault();

      axios.get('https://touch-base-server.herokuapp.com/api/jobs/getall', {
        headers: {
          Authorization: localStorage.getItem('token')
        }})
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }	

    return(
        <div className="jobsPage">
          <button onClick={getJobs}>get jobs</button>
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
