import React, { useState } from 'react';
import '../../Styling/dashboard/jobs.scss';
import JobForm from './JobForm';
import Modal from './Modal';
import axios from 'axios';


function Job(props) {

    // this controls the visibility of the modal for the form

    const [ visible, setVisibility ] = useState(false);

    const showForm = event => {
      event.preventDefault();

      setVisibility(!visible)
    }

    const deleteJob = event => {
      event.preventDefault();

      const token = localStorage.getItem('token');
      const id = props.job.id

      return axios.delete(`https://touch-base-server.herokuapp.com/api/jobs/delete/${id}`, {
      headers: {
        Authorization: token
      }})
      .then( res => {
        console.log(res.data)
        setVisibility(false)
      })
      .catch( err => {
        console.log(err)
      })
    }


    return(
        <div className="jobCard">
          <h1>{props.job.company}</h1>
          <h1>{props.job.position}</h1>
          <h2>Applied on {props.job.appDate}</h2>
          <h2>{props.job.method}</h2>
          <h3>Notes: {props.job.notes}</h3>
          <button onClick={showForm}>EDIT</button>
          <Modal visible={visible}>
            <JobForm initialValues={props.job} id={props.job.id} />
            <button onClick={showForm}>CLOSE</button>
            <button onClick={deleteJob}>DELETE JOB</button>
          </Modal>
        </div>
        )
    }

  
  export default Job;
