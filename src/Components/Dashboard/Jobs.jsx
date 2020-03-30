import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../Styling/dashboard/jobs.scss";
import JobForm from "./JobForm";
import JobTile from "./JobTile";
import JobRow from "./JobRow";
import { deleteJob } from "../../actions/index";
import Modal from "./Modal";
import { Switch } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { motion } from "framer-motion";

function Jobs(props) {
  // these empty values are passed to the jobs form
  // for adding a new job
  const initialValues = {
    position: "",
    company: "",
    link: "",
    method: "",
    appDate: "",
    notes: "",
    interview: false
  };

  // material ui theme
  const useStyles = makeStyles(theme => ({
    track: {
      "&.Mui-checked": {
        backgroundColor: "rgb(0, 162, 255)"
      },
      opacity: 1,
      backgroundColor: "rgb(217, 136, 255)"
    },
    switchBase: {
      color: "black"
    },
    root: {
      width: "58px"
    },
    colorSecondary: {
      "&.Mui-checked": {
        color: "rgb(0, 162, 255)"
      },
      color: "rgb(199, 82, 253)"
    }
  }));

  const classes = useStyles();
  const theme = useTheme();

  // this sets the visibility for the job form modal
  const [visibleAdd, setVisibility] = useState(false);

  // this sets whether the jobs will be displayed as cards or in a table
  const [table, setOrganizer] = useState(false);

  // this sets the value for the search feature
  const [searchValue, setSearch] = useState("");

  const showAddForm = event => {
    event.preventDefault();

    setVisibility(!visibleAdd);
  };

  // change handler for search value
  const searchChange = event => {
    event.preventDefault();

    setSearch(event.target.value);
  };

  // this function is the switch for how the jobs are displayed
  const switchOrganizer = event => {
    event.preventDefault();

    setOrganizer(!table);
  };

  // this closes the modal once there is a redux state change
  useEffect(() => {
    setVisibility(false);
  }, [props.jobs]);

  // search array
  const searchedJobs = props.jobs.filter(job =>
    job.company.toUpperCase().includes(searchValue.toUpperCase())
  );

  {
    /*this checks to see how the jobs should be displayed */
  }

  if (table) {
    return (
      <div className="jobsPage">
        {/* this job form pops up with a modal and is only 
                for adding a job, checking with an 'adding' prop */}
        <Modal visible={visibleAdd}>
          <div className="grayedBackdrop">
            <div className="jobForm">
              <h1 className="editJobTitle">ADD JOB</h1>
              <JobForm initialValues={initialValues} adding={true} />
              <button className="closeButton" onClick={showAddForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </Modal>
        <div className="switchAndSearch">
          <div className="switch">
            <h4 className="switchName">Layout</h4>
            <Switch
              classes={{
                root: classes.root, // class name, e.g. `root-x`
                checked: classes.checked,
                colorSecondary: classes.colorSecondary, // class name, e.g. `disabled-x`
                track: classes.track,
                switchBase: classes.switchBase
              }}
              onClick={switchOrganizer}
              checked={false}
            />
          </div>
          <input
            type="text"
            placeholder="Search by company"
            onChange={searchChange}
            value={searchValue}
          />
        </div>
        <button
          className={visibleAdd ? "exOutButton" : "addJobButton"}
          onClick={showAddForm}
        >
          <i className={visibleAdd ? "fas fa-times" : "fas fa-plus"}></i>
        </button>
        <div className="jobsTable">
          <div
            className={searchedJobs.length < 1 ? "columnnull" : "columnNames"}
          >
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
          {searchValue === ""
            ? props.jobs.map(job => {
                return (
                  <JobRow job={job} removeJob={props.deleteJob} key={job.id} />
                );
              })
            : searchedJobs.map(job => {
                return (
                  <JobRow job={job} removeJob={props.deleteJob} key={job.id} />
                );
              })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="jobsPage">
        {/* this job form pops up with a modal and is only 
                for adding a job, checking with an 'adding' prop */}
        <Modal visible={visibleAdd}>
          <div className="grayedBackdrop">
            <div className="jobForm">
              <h1 className="editJobTitle">ADD JOB</h1>
              <JobForm initialValues={initialValues} adding={true} />
              <button className="closeButton" onClick={showAddForm}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </Modal>
        <div className="switchAndSearch">
          <div className="switch">
            <h4 className="switchName">Layout</h4>
            <Switch
              classes={{
                root: classes.root, // class name, e.g. `root-x`
                checked: classes.checked,
                colorSecondary: classes.colorSecondary, // class name, e.g. `disabled-x`
                track: classes.track,
                switchBase: classes.switchBase
              }}
              onClick={switchOrganizer}
              checked={true}
            />
          </div>
          <input
            type="text"
            placeholder="Search by company"
            onChange={searchChange}
            value={searchValue}
          />
        </div>
        <button
          className={visibleAdd ? "exOutButton" : "addJobButton"}
          onClick={showAddForm}
        >
          <i className={visibleAdd ? "fas fa-times" : "fas fa-plus"}></i>
        </button>
        {props.jobs.length < 1 ? <h1>Add a job you applied to!</h1> : null}
        <div className="jobsBlocks">
          {searchValue === ""
            ? props.jobs.map(job => {
                return (
                  <JobTile job={job} removeJob={props.deleteJob} key={job.id} />
                );
              })
            : searchedJobs.map(job => {
                return (
                  <JobTile job={job} removeJob={props.deleteJob} key={job.id} />
                );
              })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    jobs: state.user.jobs
  };
};

const mapDispatchToProps = {
  deleteJob: deleteJob
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
