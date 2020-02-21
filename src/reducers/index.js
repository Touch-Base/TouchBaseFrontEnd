import {
    REGISTERING_USER,
    REGISTERED_USER,
    FAILED_REGISTER,

    LOGGING_IN,
    LOGIN_SUCCESS,
    FAILED_LOGIN,

    UPDATING_USER,
    USER_UPDATE_SUCCESS,
    FAILED_USER_UPDATE,

    ////////////
    ADDING_JOB,
    ADDED_JOB,
    FAILED_ADD_JOB,

    UPDATING_JOB,
    UPDATED_JOB,
    FAILED_UPDATE_JOB,
    
    ////////////
    ADDING_CONNECTION,
    ADDED_CONNECTION,
    FAILED_ADD_CONNECTION,
    
    ////////////
    ADDING_EVENT,
    ADDED_EVENT,
    FAILED_ADD_EVENT,

    ////////////
    FILLING_STATE_JOBS,
    FILLED_JOBS,
    FAILED_FILLED_JOBS,
    
    FILLING_STATE_CONNECTIONS,
    FILLED_CONNECTIONS,
    FAILED_FILLED_CONNECTIONS,
    
    FILLING_STATE_EVENTS,
    FILLED_EVENTS,
    FAILED_FILLED_EVENTS
} from '../actions/index';


let initialState = {
    user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        age: '',
        location: '',
        summary: '',
        position: '',
        jobs: '',
        connections: '',
        events: '',
        jobsTotal: 0,
        connectionsTotal: 0
        },
    token: '',
}

// /* persistent storage */

const persistedState = localStorage.getItem('reduxState');

if (persistedState) {
    initialState = JSON.parse(persistedState)
}

// /* reducer */

const reducer = (state = initialState, action) => {
    switch(action.type) {

        /// REGISTERING CASES

        case REGISTERING_USER: {
            return {
                ...state
            }
        }

        case REGISTERED_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    firstname: action.payload.user.firstname,
                    lastname: action.payload.user.lastname,
                    email: action.payload.user.email,
                    password: action.payload.user.password
                },
                token: action.payload.token
            }
        }

        case FAILED_REGISTER: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        /// LOGGING IN CASES

        case LOGGING_IN: {
            return {
                ...state
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    firstname: action.payload.user.firstname,
                    lastname: action.payload.user.lastname,
                    email: action.payload.user.email,
                    password: action.payload.user.password,
                    age: action.payload.user.age,
                    location: action.payload.user.location,
                    position: action.payload.user.position,
                    summary: action.payload.user.summary
                },
                token: action.payload.token
            }
        }

        case FAILED_LOGIN: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        /// UPDATING USER CASES

        case UPDATING_USER: {
            return {
                ...state
            }
        }

        case USER_UPDATE_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    firstname: action.payload.user.firstname,
                    lastname: action.payload.user.lastname,
                    email: action.payload.user.email,
                    password: action.payload.user.password,
                    age: action.payload.user.age,
                    location: action.payload.user.location,
                    position: action.payload.user.position,
                    summary: action.payload.user.summary
                }
            }
        }

        case FAILED_USER_UPDATE: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        
        /// FILL STATE WITH JOBS, CONNECTIONS, EVENTS

        case FILLING_STATE_JOBS: {
            return {
                ...state
            }
        }

        case FILLED_JOBS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    jobs: action.payload.allJobs,
                    jobsTotal: action.payload.allJobs.length
                }
            }
        }

        case FAILED_FILLED_JOBS: {
            return {
                ...state,
                error: action.payload.error
            }
        }
            
        case FILLING_STATE_CONNECTIONS: {
            return {
                ...state
            }
        }

        case FILLED_CONNECTIONS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    connections: action.payload.allConnections,
                    connectionsTotal: action.payload.allConnections.length
                }
            }
        }

        case FAILED_FILLED_CONNECTIONS: {
            return {
                ...state,
                error: action.payload.error
            }
        }
            
        case FILLING_STATE_EVENTS: {
            return {
                ...state
            }
        }

        case FILLED_EVENTS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    events: action.payload.allEvents
                }
            }
        }

        case FAILED_FILLED_EVENTS: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        /// ADDING JOB CASES

        case ADDING_JOB: {
            return {
                ...state
            }
        }

        case ADDED_JOB: {
            return {
                ...state,
                user: {
                    ...state.user,
                    jobs: action.payload.allJobs
                }
            }
        }

        case FAILED_ADD_JOB: {
            return {
                ...state,
                error: action.payload.error
            }
        }
            
         /// ADDING CONNECTION CASES

        case ADDING_CONNECTION: {
            return {
                ...state
            }
        }

        case ADDED_CONNECTION: {
            return {
                ...state,
                user: {
                    ...state.user,
                    connections: action.payload.allConnections
                }
            }
        }

        case FAILED_ADD_CONNECTION: {
            return {
                ...state,
                error: action.payload.error
            }
        }
            
        /// ADDING EVENT CASES

        case ADDING_EVENT: {
            return {
                ...state
            }
        }

        case ADDED_EVENT: {
            return {
                ...state,
                user: {
                    ...state.user,
                    events: action.payload.allEvents
                }
            }
        }

        case FAILED_ADD_EVENT: {
            return {
                ...state,
                error: action.payload.error
            }
        }

        default: {
            return state;
        }
    }
}

export default reducer;
