import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteConnection } from "../../actions/index";
import "../../Styling/dashboard/networking.scss";
import "../../Styling/dashboard/networkingform.scss";
import NetworkingForm from "./NetworkingForm";
import NetworkingCard from "./NetworkingCard";
import NetworkingRow from "./NetworkingRow";
import Modal from "./Modal";
import { Switch } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { motion } from "framer-motion";

function Networking(props) {
  // this sets the visibility for adding a new connection form
  const [cnxform, setCnx] = useState(false);

  // this sets whether the connections will be displayed as cards or in a table
  const [table, setOrganizer] = useState(false);

  // this sets the value for the search feature
  const [searchValue, setSearch] = useState("");

  // these empty values are passed to the connection form
  // for adding a new connection
  const initialValues = {
    firstname: "",
    lastname: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    notes: ""
  };

  // styling for the switch
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

  // this function sets the visibility for the add form
  const showAddCnx = event => {
    event.preventDefault();

    setCnx(!cnxform);
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

  useEffect(() => {
    // checks to see if the connection was added
    // and closes the add box
    setCnx(false);
  }, [props]);

  // search array
  const searchedCnx = props.connections.filter(cnx =>
    cnx.lastname.toUpperCase().includes(searchValue.toUpperCase())
  );

  {
    /*this checks to see how the jobs should be displayed */
  }
  if (table) {
    return (
      <div className="networkingPage">
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
            ? props.connections.map(connection => {
                return (
                  <NetworkingRow
                    removeCnx={props.deleteConnection}
                    connection={connection}
                  />
                );
              })
            : searchedCnx.map(connection => {
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
      </div>
    );
  } else {
    return (
      <div className="networkingPage">
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
            placeholder="Search by last name"
            onChange={searchChange}
            value={searchValue}
          />
        </div>
        {props.connections.length < 1 ? (
          <h1>Add a connection you made!</h1>
        ) : null}
        <div className="networkingBlocks">
          {searchValue === ""
            ? props.connections.map(connection => {
                return (
                  <NetworkingCard
                    removeCnx={props.deleteConnection}
                    connection={connection}
                  />
                );
              })
            : searchedCnx.map(connection => {
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    connections: state.user.connections
  };
};

const mapDispatchToProps = {
  deleteConnection: deleteConnection
};

export default connect(mapStateToProps, mapDispatchToProps)(Networking);
