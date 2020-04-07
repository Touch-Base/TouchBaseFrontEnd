import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteConnection } from "../../../actions/index";
import "../../../Styling/dashboard/networking/networking.scss";
import "../../../Styling/dashboard/networking/networkingform.scss";
import "../../../Styling/dashboard/mobile/networkingMobile.scss";
import NetworkingForm from "./NetworkingForm";
import NetworkingCard from "./NetworkingCard";
import NetworkingRow from "./NetworkingRow";
import Modal from "../../Helpers/Modal";
import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import useWindowDimensions from "../../Helpers/WindowSize";

function Networking(props) {
  // width of window from window component
  const { width } = useWindowDimensions();

  // this sets the visibility for adding a new connection form
  const [cnxform, setCnx] = useState(false);

  // this sets whether the connections will be displayed as cards or in a table
  const [table, setOrganizer] = useState(false);

  // this sets the value for the search feature
  const [searchValue, setSearch] = useState("");

  // makes component scroll to the top of the page on render
  useEffect(() => window.scrollTo(0, 0), []);

  // these empty values are passed to the connection form
  // for adding a new connectiony
  const initialValues = {
    firstname: "",
    lastname: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    notes: "",
  };

  // material ui theme
  const useStyles = makeStyles((theme) => ({
    track: {
      "&.Mui-checked": {
        backgroundColor: "rgb(0, 162, 255)",
      },
      opacity: 1,
      backgroundColor: "#35d3dbc2",
    },
    switchBase: {
      color: "black",
    },
    root: {
      width: "58px",
    },
    colorSecondary: {
      "&.Mui-checked": {
        color: "rgb(0, 162, 255)",
      },
      color: "#35d3db",
    },
  }));

  const classes = useStyles();

  // variants for animation
  const parentList = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  // this function sets the visibility for the add form
  const showAddCnx = (event) => {
    event.preventDefault();

    setCnx(!cnxform);
  };

  // change handler for search value
  const searchChange = (event) => {
    event.preventDefault();

    setSearch(event.target.value);
  };

  // this function is the switch for how the jobs are displayed
  const switchOrganizer = (event) => {
    event.preventDefault();

    setOrganizer(!table);
  };

  useEffect(() => {
    // checks to see if the connection was added
    // and closes the add box
    setCnx(false);
  }, [props]);

  // search array
  const searchedCnx = props.connections.filter((cnx) =>
    cnx.lastname.toUpperCase().includes(searchValue.toUpperCase())
  );

  /*this returns however the connections should be displayed*/

  if (table) {
    return (
      <motion.div
        variants={parentList}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="networkingPage"
      >
        <div className="switchAndSearch">
          <div className="switch">
            <h4 className="switchName">Layout</h4>
            <Switch
              classes={{
                root: classes.root, // class name, e.g. `root-x`
                checked: classes.checked,
                colorSecondary: classes.colorSecondary, // class name, e.g. `disabled-x`
                track: classes.track,
                switchBase: classes.switchBase,
              }}
              onClick={switchOrganizer}
              checked={false}
            />
          </div>
          <input
            type="text"
            placeholder="Search by last name"
            onChange={searchChange}
            value={searchValue}
          />
        </div>
        <div className="connectionsTable">
          <div
            className={searchedCnx.length < 1 ? "columnnull" : "columnNames"}
          >
            <h4 id="namecolumn">Name</h4>
            <h4 id="cnxcocolumn">Company</h4>
            <h4 id="titlecolumn">Title</h4>
            <h4 id="cnxphonecolumn">Phone</h4>
            <h4 id="cnxemailcolumn">Email</h4>
            <h4 id="cnxnotescolumn">Notes</h4>
            <h4 id="cnxeditcolumn">Edit</h4>
          </div>
          {searchValue === ""
            ? props.connections.map((connection) => {
                return (
                  <NetworkingRow
                    removeCnx={props.deleteConnection}
                    connection={connection}
                  />
                );
              })
            : searchedCnx.map((connection) => {
                return (
                  <NetworkingRow
                    removeCnx={props.deleteConnection}
                    connection={connection}
                  />
                );
              })}
        </div>
        <button
          className={cnxform ? "exOutCnx" : "addCnxButton"}
          onClick={showAddCnx}
        >
          <i className={cnxform ? "fas fa-times" : "fas fa-plus"}></i>
        </button>
        <Modal visible={cnxform}>
          <div className="grayedBackdrop">
            <div className="editConnectionForm" id="addConnection">
              <h3>ADD CONNECTION</h3>
              <NetworkingForm initialValues={initialValues} addingCnx={true} />
            </div>
          </div>
        </Modal>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        variants={parentList}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="networkingPage"
      >
        <div className="switchAndSearch">
          <div className={width > 620 ? "switch" : "switchHide"}>
            <h4 className="switchName">Layout</h4>
            <Switch
              classes={{
                root: classes.root, // class name, e.g. `root-x`
                checked: classes.checked,
                colorSecondary: classes.colorSecondary, // class name, e.g. `disabled-x`
                track: classes.track,
                switchBase: classes.switchBase,
              }}
              onClick={switchOrganizer}
              checked={true}
            />
          </div>
          <input
            type="text"
            placeholder="Search by last name"
            onChange={searchChange}
            value={searchValue}
          />
        </div>
        {props.connections.length < 1 ? (
          <h1 className="emptyPageHeader">Add a connection you made!</h1>
        ) : null}
        <div className="networkingBlocks">
          {searchValue === ""
            ? props.connections.map((connection) => {
                return (
                  <NetworkingCard
                    removeCnx={props.deleteConnection}
                    connection={connection}
                    key={connection.id}
                  />
                );
              })
            : searchedCnx.map((connection) => {
                return (
                  <NetworkingCard
                    removeCnx={props.deleteConnection}
                    connection={connection}
                  />
                );
              })}
        </div>
        <button
          className={cnxform ? "exOutCnx" : "addCnxButton"}
          onClick={showAddCnx}
        >
          <i className={cnxform ? "fas fa-times" : "fas fa-plus"}></i>
        </button>
        <Modal visible={cnxform}>
          <div className="modalBackdrop">
            <div className="editConnectionForm" id="addConnection">
              <h3>ADD CONNECTION</h3>
              <NetworkingForm initialValues={initialValues} addingCnx={true} />
            </div>
          </div>
        </Modal>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    connections: state.user.connections,
  };
};

const mapDispatchToProps = {
  deleteConnection: deleteConnection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Networking);
