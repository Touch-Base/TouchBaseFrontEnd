import React from 'react';
import { connect } from 'react-redux';
import '../../Styling/dashboard/overview.scss'

function Overview(props) {

    return(
        <div className="overviewPage">
            <h1>Welcome {props.firstname}!</h1>
            <p>
                Lorem Ipsum is simply dummy text 
                of the printing and typesetting 
                industry. Lorem Ipsum has been the 
                industry's standard dummy text ever 
                since the 1500s, when an unknown 
                printer took a galley of type and 
                scrambled it to make a type specimen 
                book. It has survived not only five centuries, 
                but also the leap
            </p>
            <div className="jobsAndConnections">
                <div className="jobsCount">
                    <h2>Jobs Applied:</h2><h2 className="numberOne">0</h2>
                </div>
                <div className="connectionsCount">
                    <h2>Connections:</h2><h2 className="numberTwo">0</h2>
                </div>
            </div>
            <button>Get Started!</button>
        </div>
        )
    }

const mapStateToProps = (state) => {
    return {
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        email: state.user.email
    }
  }
  
  export default(
    connect(
        mapStateToProps,
        null
    )(Overview)
  );