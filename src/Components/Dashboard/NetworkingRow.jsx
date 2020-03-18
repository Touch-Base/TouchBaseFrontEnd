import React, { useState, useEffect } from 'react';
import '../../Styling/dashboard/networkingrow.scss';
import '../../Styling/dashboard/networking.scss';
import NetworkingForm from './NetworkingForm';
import Modal from './Modal';

function NetworkingRow(props) {
    
    const [ visible, setVisibility ] = useState(false);
    const [ notes, setShowNotes ] = useState(false);
  
    // this controls the visibility of the modal for the form
    
    const showForm = event => {
      event.preventDefault();

      setVisibility(!visible)
      setShowNotes(false)
    }

    const deleteButton = event => {
      event.preventDefault();

      const id = props.connection.id

      props.removeCnx(id)

      setVisibility(false)
    }

    useEffect(() => {

      // checks to see if the job was updated
      // and closes the edit box
      setVisibility(false)

    }, [props.connection]);


    // this is the handler to show the notes
    const handlesNotes = (event) => {
      event.preventDefault();

      setShowNotes(!notes);
    };

  
    // this closes the notes
    const handleClose = () => {
      setShowNotes(false)

    };

  
  return(
    <div className="connectionRow">
      <h5 className="cnxcolumn" id="name">{props.connection.firstname} {props.connection.lastname}</h5>
      <h5 className="cnxcolumn" id="company">{props.connection.company}</h5>
      <h5 className="cnxcolumn" id="title">{props.connection.title}</h5>
      <h5 className="cnxcolumn" id="phone">{props.connection.phone}</h5>
      <h5 className="cnxcolumn" id="email">
        <a href={props.connection.email}><i className="fas fa-at"></i></a>
      </h5>
      <button className="notesRow" onClick={handlesNotes}>
        <i className="fas fa-quote-left">&nbsp;</i>    
        <i className="fas fa-quote-right"></i>
      </button>
      {notes ? 
        <p className="rowNotes">{props.connection.notes}</p>
      : null }
      
        {/* this is the edit button */}
        <button className="editButton" onClick={showForm}>
          <i className="fas fa-pencil-alt"></i>
        </button>
                       
                       
      {/* this is the modal for the edit form */}
      <Modal visible={visible}>
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


export default NetworkingRow;
