import React, { useState } from 'react';
import '../../Styling/dashboard/networking.scss'

function Connection(props) {

    const [ notes, setVisibility ] = useState(false);

    const showNotes = event => {
      event.preventDefault();

      setVisibility(!notes);
    }

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
        </div>
        )
    }

  
  export default Connection;
