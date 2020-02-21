import React from 'react';
import '../../Styling/dashboard/events.scss'

function Event(props) {

    return(
        <div className="eventCard">
          <h1>{props.event.name}</h1>
        </div>
        )
    }

  
  export default Event;
