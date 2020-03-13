import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteConnection } from '../../actions/index'
import '../../Styling/dashboard/networking.scss'
import '../../Styling/dashboard/networkingform.scss'
import NetworkingForm from './NetworkingForm';
import NetworkingCard from './NetworkingCard';
import NetworkingRow from './NetworkingRow';
import Modal from './Modal';
import { Switch } from '@material-ui/core';


function Networking(props) {

    // this sets the visibility for adding a new connection form
    const [ cnxform, setCnx ] = useState(false);
    
    // this sets whether the connections will be displayed as cards or in a table
    const [ table, setOrganizer ] = useState(false);

    // this sets the value for the search feature
    const [ searchValue, setSearch ] = useState('');

    // these empty values are passed to the connection form 
    // for adding a new connection
    const initialValues = { 
        firstname: '',
        lastname: '',
        title: '',
        company: '',
        phone: '',
        email: '',
        notes: ''
    }

    // this function sets the visibility for the add form
    const showAddCnx = event => {
        event.preventDefault();

        setCnx(!cnxform)
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

    useEffect(() => {

        // checks to see if the connection was added
        // and closes the add box
        setCnx(false)
  
      }, [props]);

    // search array
    const searchedCnx = props.connections.filter(cnx => cnx.lastname.toUpperCase().includes(searchValue.toUpperCase()))

    return(
        <div className="networkingPage">
            <input type="text" placeholder="Search by last name" onChange={searchChange} value={searchValue} />
            {props.connections.map( connection => {
                return <NetworkingCard removeCnx={props.deleteConnection} connection={connection} />
            })}
            {searchValue === '' ? 
               props.connections.map( connection => {
                return <NetworkingCard removeCnx={props.deleteConnection} connection={connection} />
            }) :
                searchedCnx.map(connection => {
                return <NetworkingCard removeCnx={props.deleteConnection} connection={connection} />
            })}
            <button className={cnxform ? "exOutCnx" : "addCnxButton"} onClick={showAddCnx}>
                <i className={cnxform ? "fas fa-times" : "fas fa-plus"}></i>
            </button>
            <Modal visible={cnxform}>
                <div className="editConnectionForm" id="addConnection">
                    <h3>ADD CONNECTION</h3>
                    <NetworkingForm initialValues={initialValues} addingCnx={true} />
                </div>
            </Modal>
        </div>
        )
    }


const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        connections: state.user.connections
    }
  }

  const mapDispatchToProps = {
    deleteConnection: deleteConnection    
  }
  
  export default(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Networking)
  );

