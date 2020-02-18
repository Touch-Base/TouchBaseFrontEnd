import React from 'react';
import '../../Styling/dashboard/networking.scss'

function Connection(props) {

    return(
        <div className="connectionCard">
          <h1>{props.connection.firstname} {props.connection.lastname}</h1>
        </div>
        )
    }

  
  export default Connection;
