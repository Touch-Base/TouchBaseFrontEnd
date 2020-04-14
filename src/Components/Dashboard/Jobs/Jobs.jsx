import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../../../Styling/dashboard/jobs/jobs.scss";
import "../../../Styling/dashboard/mobile/jobsMobile.scss";
import JobForm from "./JobForm";
import JobTile from "./JobTile";
import JobRow from "./JobRow";
import { deleteJob } from "../../../actions/index";
import Modal from "../../Helpers/Modal";
import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import useWindowDimensions from "../../Helpers/WindowSize";
import moment from "moment";
import { blue } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";

function Jobs(props) {
  // width of window from window component
  const { width } = useWindowDimensions();

  // makes component scroll to the top of the page on render
  useEffect(() => window.scrollTo(0, 0), []);

  // these empty values are passed to the jobs form
  // for adding a new job
  const initialValues = {
    position: "",
    company: "",
    link: "",
    method: "",
    appDate: moment().format("YYYY-MM-DDTHH:MM"),
    notes: "",
    interview: false,
    favorite: false
  };

  // this is the blue radio button
  const BlueRadio = withStyles({
    root: {
      color: blue[600],
      "&$checked": {
        color: blue[600]
      }
    },
    checked: {}
  })(props => <Radio color="default" {...props} />);

  // material ui theme
  const useStyles = makeStyles(theme => ({
    track: {
      "&.Mui-checked": {
        backgroundColor: "rgb(0, 162, 255)"
      },
      opacity: 1,
      backgroundColor: "#35d3dbc2"
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
      color: "#35d3db"
    }
  }));

  const classes = useStyles();

  // this sets the visibility for the job form modal
  const [visibleAdd, setVisibility] = useState(false);

  // this sets whether the jobs will be displayed as cards or in a table
  const [table, setOrganizer] = useState(false);

  // this sets the value for the search feature
  const [searchValue, setSearch] = useState("");

  // this is the sort by favorite value
  const [faved, setFaved] = useState(false);

  // this is the sort by date value
  const [dated, setDated] = useState(false);

  // this is the sort by interviews value
  const [interviewed, setInterview] = useState(false);

  // this is the all value
  const [all, setAll] = useState(false);

  // this is the popup for the layout increase screen size
  const [rowpop, setRowpop] = useState(false);

  const showAddForm = event => {
    event.preventDefault();

    setVisibility(!visibleAdd);
  };

  // change handler for search value
  const searchChange = event => {
    event.preventDefault();

    setSearch(event.target.value);
  };

  const widthCheck = () => {
    if (width < 950) {
      console.log("hello");
      setRowpop(true);
      setTimeout(function() {
        setRowpop(false);
      }, 2000);
    } else {
      return setRowpop(false);
    }
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

  // search by company array
  const searchedJobs = props.jobs.filter(job =>
    job.company.toUpperCase().includes(searchValue.toUpperCase())
  );

  // filter by favorites array
  const favJobs = props.jobs.filter(job => {
    return job.favorite === true;
  });

  // function to change to above array
  const changeFav = event => {
    event.preventDefault();

    setInterview(false);
    setDated(false);
    setAll(false);
    setSearch("");
    setFaved(!faved);
  };

  // sort by application date array

  function sort(arr) {
    return arr.concat().sort(function(a, b) {
      return new Date(a.appDate) - new Date(b.appDate);
    });
  }

  const datedJobs = sort(props.jobs);

  // function to change to above array
  const changeDated = event => {
    event.preventDefault();

    setInterview(false);
    setFaved(false);
    setAll(false);
    setSearch("");
    setDated(!dated);
  };

  // filter by interview array
  const intJobs = props.jobs.filter(job => {
    return job.interview === true;
  });

  // function to change to above array
  const changeInt = event => {
    event.preventDefault();

    setFaved(false);
    setDated(false);
    setSearch("");
    setAll(false);
    setInterview(!interviewed);
  };

  // this turns off all the buttons for the search
  const startSearch = event => {
    event.preventDefault();

    setFaved(false);
    setDated(false);
    setAll(false);
    setInterview(false);
  };

  // set the all button
  const allHandleChange = event => {
    event.preventDefault();

    setFaved(false);
    setDated(false);
    setSearch("");
    setInterview(false);
    setAll(true);
  };

  // variants for animation
  const parentList = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren"
      }
    }
  };

  if (table && width > 950) {
    return (
      <motion.div
        variants={parentList}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="jobsPage"
      >
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
        <div className={rowpop ? "rowPopup" : "rowPopup hide"}>
          Increase window size!
        </div>
        <div className="switchAndSearch">
          <div className="sortButtons">
            <div className="sButton">
              <h3>All</h3>
              <BlueRadio
                checked={all}
                onChange={allHandleChange}
                name="favoriteSort"
              />
            </div>
            <div className="sButton">
              <h3>Favorites</h3>
              <BlueRadio
                checked={faved}
                onChange={changeFav}
                name="favoriteSort"
              />
            </div>
            <div className="sButton">
              <h3>Oldest</h3>
              <BlueRadio
                checked={dated}
                onChange={changeDated}
                name="dateSort"
              />
            </div>
            <div className="sButton">
              <h3>Interviews</h3>
              <BlueRadio
                checked={interviewed}
                onChange={changeInt}
                name="interviewSort"
              />
            </div>
          </div>
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
            onClick={startSearch}
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
          {faved === true
            ? favJobs.map(job => {
                return (
                  <JobRow job={job} removeJob={props.deleteJob} key={job.id} />
                );
              })
            : dated === true
            ? datedJobs.map(job => {
                return (
                  <JobRow job={job} removeJob={props.deleteJob} key={job.id} />
                );
              })
            : interviewed === true
            ? intJobs.map(job => {
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
      </motion.div>
    );
  } else {
    return (
      <motion.div
        variants={parentList}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="jobsPage"
      >
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
        <div className={rowpop ? "rowPopup" : "rowPopup hide"}>
          Increase window size!
        </div>
        <div className="switchAndSearch">
          <div className="sortButtons">
            <div className="sButton">
              <h3>All</h3>
              <BlueRadio
                checked={all}
                onChange={allHandleChange}
                name="favoriteSort"
              />
            </div>
            <div className="sButton">
              <h3>Favorites</h3>
              <BlueRadio
                checked={faved}
                onChange={changeFav}
                name="favoriteSort"
              />
            </div>
            <div className="sButton">
              <h3>Oldest</h3>
              <BlueRadio
                checked={dated}
                onChange={changeDated}
                name="dateSort"
              />
            </div>
            <div className="sButton">
              <h3>Interviews</h3>
              <BlueRadio
                checked={interviewed}
                onChange={changeInt}
                name="interviewSort"
              />
            </div>
          </div>
          <div className={width > 620 ? "switch" : "switchHide"}>
            <h4 className="switchName">Layout</h4>
            <Switch
              classes={{
                root: classes.root, // class name, e.g. `root-x`
                checked: classes.checked,
                colorSecondary: classes.colorSecondary, // class name, e.g. `disabled-x`
                track: classes.track,
                switchBase: classes.switchBase
              }}
              onClick={event => {
                switchOrganizer(event);
                widthCheck(event);
              }}
              checked={true}
            />
          </div>
          <input
            type="text"
            placeholder="Search by company"
            onChange={searchChange}
            value={searchValue}
            onClick={startSearch}
          />
        </div>
        <button
          className={visibleAdd ? "exOutButton" : "addJobButton"}
          onClick={showAddForm}
        >
          <i className={visibleAdd ? "fas fa-times" : "fas fa-plus"}></i>
        </button>
        {props.jobs.length < 1 ? (
          <h1 className="emptyPageHeader">Add a job you applied to!</h1>
        ) : null}
        <div className="jobsBlocks">
          {faved === true
            ? favJobs.map(job => {
                return (
                  <JobTile job={job} removeJob={props.deleteJob} key={job.id} />
                );
              })
            : dated === true
            ? datedJobs.map(job => {
                return (
                  <JobTile job={job} removeJob={props.deleteJob} key={job.id} />
                );
              })
            : interviewed === true
            ? intJobs.map(job => {
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
      </motion.div>
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
