import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/networking.scss'
import NetworkingForm from './NetworkingForm';
import NetworkingCard from './NetworkingCard';


function Networking(props) {

    return(
        <div className="networkingPage">
            <NetworkingForm />
            {props.connections.map( connection => {
                return <NetworkingCard connection={connection} />
            })}
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
  
  export default(
    connect(
        mapStateToProps,
        null
    )(Networking)
  );
