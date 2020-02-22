import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/networking.scss'
import EventForm from './EventForm';
import EventCard from './EventCard';


function Events(props) {

    return(
        <div className="events">
            <EventForm />
            {props.events.map( event => {
                return <EventCard event={event} />
            })}
        </div>
        )
    }


const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email,
        events: state.user.events
    }
  }
  
  export default(
    connect(
        mapStateToProps,
        null
    )(Events)
  );
