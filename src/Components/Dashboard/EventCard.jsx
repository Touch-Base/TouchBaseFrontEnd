import React, { useState, useEffect } from 'react';
import '../../Styling/dashboard/events.scss'
import Modal from './Modal';
import EventForm from './EventForm';


function Event(props) {
    
    /// we have to use 'evt' for the props event variable because it will confuse with 
    /// actual jquery events

    // this is the visibility for the descritpion
    const [ description, setVisibility ] = useState(false);

    // this is the visibility for the modal
    const [ form, setVisible ] = useState(false);


    // this sets the visibility for notes
    const showDescription = event => {
      event.preventDefault();

      setVisibility(!description);
    }

    // this is the delete button 
    const deleteButton = event => {
      event.preventDefault();

      const id = props.evt.id

      props.removeEvent(id)

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
        <div className="eventCard">
          <h1>{props.evt.name.toUpperCase()}</h1>
          <h5>{props.evt.location.toUpperCase()}</h5>
          <h4>{props.evt.date.toUpperCase()}</h4>

          {/* notes pop up */}
          <button className="evtDescButton" onClick={showDescription}>
            <i className="fas fa-quote-left">&nbsp;</i>    
            <i className="fas fa-quote-right"></i>
          </button>
          {description ? 
            <p className="evtDescription">{props.evt.description}</p>
          : null }
        <button className="editEvt" onClick={showForm}>
            <i className="fas fa-pencil-alt"></i>
        </button>
        {/* // edit connection form modal */}
        <Modal visible={form}>
          <div className="editEvtForm">
            <h3 className="editEvtTitle">EDIT EVENT</h3>
            <button className="closeButton" onClick={showForm}>
              <i className="fas fa-times"></i>
            </button>
            <EventForm initialValues={props.evt} editing={true} id={props.evt.id}  />
            <button className="deleteEvtButton" onClick={deleteButton}>DELETE EVENT</button>
          </div>
        </Modal>
        </div>
        )
    }

  
  export default Event;
