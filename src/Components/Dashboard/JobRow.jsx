import React, { useState, useEffect } from 'react';
import '../../Styling/dashboard/jobs.scss';
import JobForm from './JobForm';
import { TwitterPicker } from 'react-color';
import Modal from './Modal';
import { connect } from 'react-redux';
import { editJob } from '../../actions/index';


function JobRow(props) {
  
  return(
    <div className="jobRow">
      <h1>{props.job.company}</h1>
      <h1>{props.job.position}</h1>
      <h1>{props.job.appDate}</h1>
    </div>
  
}

const mapDispatchToProps = {
  editJob: editJob    
}

export default(
  connect(
      null,
      mapDispatchToProps
  )(Job)
);
