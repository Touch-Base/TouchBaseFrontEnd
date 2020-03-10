import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import NetworkingForm from './NetworkingForm';
import '../../Styling/dashboard/networking.scss'

function Connection(props) {

    // this is the visibility for the notes
    const [ notes, setVisibility ] = useState(false);

    // this is the visibility for the modal
    const [ form, setVisible ] = useState(false);


    // this sets the visibility for notes
    const showNotes = event => {
      event.preventDefault();

      setVisibility(!notes);
    }

    // this is the delete button 
    const deleteButton = event => {
      event.preventDefault();

      const id = props.connection.id

      props.removeCnx(id)

      setVisibility(false)
    }

    // this sets the visibility for the form modal
    const showForm = event => {
      event.preventDefault();
      
      setVisible(!form)
      
    }

    useEffect(() => {

      // checks to see if the connection was updated
      // and closes the edit box
      setVisible(false);
      setVisibility(false);
      console.log("here here")

    }, [props]);

    return(
        <div className="connectionCard">
          <h1>{props.connection.firstname.toUpperCase()} {props.connection.lastname.toUpperCase()}</h1>
          <h5>{props.connection.company.toUpperCase()}</h5>
          <h4>{props.connection.title.toUpperCase()}</h4>
          <div className="cnxContact">
            <div className="cnxIcons">
              <i className="fas fa-phone"></i>
              <i className="fas fa-at"></i>
            </div>
            <div className="divider"></div>
            <div className="cnxAddresses">
              <h4>{props.connection.phone}</h4>
              <a href={props.connection.email}>{props.connection.email}</a>
            </div>
          </div>

          {/* notes pop up */}
          <button className="cnxNotesButton" onClick={showNotes}>
            <i className="fas fa-quote-left">&nbsp;</i>    
            <i className="fas fa-quote-right"></i>
          </button>
          {notes ? 
            <p className="cnxNotes">{props.connection.notes}</p>
          : null }
        <button className="editCnx" onClick={showForm}>
            <i className="fas fa-pencil-alt"></i>
        </button>
        {/* // edit connection form modal */}
        <Modal visible={form}>
          <div className="editConnectionForm">
            <h3 className="editCnxTitle">EDIT CONNECTION</h3>
            <button className="closeButton" onClick={showForm}>
              <i className="fas fa-times"></i>
            </button>
            <NetworkingForm initialValues={props.connection} editing={true} id={props.connection.id}  />
            <button className="deleteCnxButton" onClick={deleteButton}>DELETE CONNECTION</button>
          </div>
        </Modal>
        </div>
        )
    }

  
  export default Connection;
