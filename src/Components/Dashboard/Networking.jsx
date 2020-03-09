import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteConnection } from '../../actions/index'
import '../../Styling/dashboard/networking.scss'
import '../../Styling/dashboard/networkingform.scss'
import NetworkingForm from './NetworkingForm';
import NetworkingCard from './NetworkingCard';
import Modal from './Modal';


function Networking(props) {

    // this sets the visibility for adding a new connection form
    const [ cnxform, setCnx ] = useState(false);

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

    useEffect(() => {

        // checks to see if the connection was added
        // and closes the add box
        setCnx(false)
  
      }, [props]);

    return(
        <div className="networkingPage">
            {props.connections.map( connection => {
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

