import React from 'react';
import '../../Styling/dashboard/networking.scss'

function Connection(props) {

    return(
        <div className="connectionCard">
          <h1>{props.connection.firstname.toUpperCase()} {props.connection.lastname.toUpperCase()}</h1>
          <h5>{props.connection.company.toUpperCase()}</h5>
          <h4>{props.connection.title}</h4>
          <div className="cnxContact">
            <div className="cnxPhone">
              <i className="fas fa-phone"></i>
              <h4>{props.connection.phone}</h4>
            </div>
            <div className="cnxEmail">
              <i className="fas fa-at"></i>
              <a href={props.connection.email}>{props.connection.email}</a>
            </div>
          </div>
          <h4>{props.connection.notes}</h4>
        </div>
        )
    }

  
  export default Connection;
