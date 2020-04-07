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
  DELETING_JOB,
  DELETED_JOB,
  FAILED_DELETE_JOB,

  ////////////
  ADDING_CONNECTION,
  ADDED_CONNECTION,
  FAILED_ADD_CONNECTION,
  UPDATING_CONNECTION,
  UPDATED_CONNECTION,
  FAILED_UPDATE_CONNECTION,
  DELETING_CONNECTION,
  DELETED_CONNECTION,
  FAILED_DELETE_CONNECTION,

  ////////////
  ADDING_EVENT,
  ADDED_EVENT,
  FAILED_ADD_EVENT,
  UPDATING_EVENT,
  UPDATED_EVENT,
  FAILED_UPDATE_EVENT,
  DELETING_EVENT,
  DELETED_EVENT,
  FAILED_DELETE_EVENT,

  ////////////
  FILLING_STATE_JOBS,
  FILLED_JOBS,
  FAILED_FILLED_JOBS,
  FILLING_STATE_CONNECTIONS,
  FILLED_CONNECTIONS,
  FAILED_FILLED_CONNECTIONS,
  FILLING_STATE_EVENTS,
  FILLED_EVENTS,
  FAILED_FILLED_EVENTS,

  ///////////
  REMOVE_ERROR,

  ///////////
  RESET_STATE,
} from "../actions/index";

let initialState = {
  user: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
    location: "",
    summary: "",
    position: "",
    profilepic: "",
    phone: "",
    creationDate: "",
    jobs: [],
    connections: [],
    events: [],
    jobsTotal: 0,
    connectionsTotal: 0,
  },
  token: "",
  error: null,
};

///

export const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    console.log("state is now undefined");
    state = undefined;
  }

  return userReducer(state, action);
};

// // // /* persistent storage */

const persistedState = localStorage.getItem("reduxState");

if (persistedState) {
  initialState = JSON.parse(persistedState);
}

// /* reducer */

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    /// REGISTERING CASES

    case REGISTERING_USER: {
      return {
        ...state,
      };
    }

    case REGISTERED_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          firstname: action.payload.user.firstname,
          lastname: action.payload.user.lastname,
          email: action.payload.user.email,
          creationDate: action.payload.user.creationDate,
          password: action.payload.user.password,
        },
        token: action.payload.token,
      };
    }

    case FAILED_REGISTER: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// LOGGING IN CASES

    case LOGGING_IN: {
      return {
        ...state,
      };
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
          summary: action.payload.user.summary,
          phone: action.payload.user.phone,
          creationDate: action.payload.user.creationDate,
          profilepic: action.payload.user.profilepic,
        },
        token: action.payload.token,
      };
    }

    case FAILED_LOGIN: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// UPDATING USER CASES

    case UPDATING_USER: {
      return {
        ...state,
      };
    }

    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          firstname: action.payload.user.firstname,
          lastname: action.payload.user.lastname,
          age: action.payload.user.age,
          location: action.payload.user.location,
          phone: action.payload.user.phone,
          position: action.payload.user.position,
          summary: action.payload.user.summary,
          profilepic: action.payload.user.profilepic,
        },
      };
    }

    case FAILED_USER_UPDATE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// FILL STATE WITH JOBS, CONNECTIONS, EVENTS

    case FILLING_STATE_JOBS: {
      return {
        ...state,
      };
    }

    case FILLED_JOBS: {
      return {
        ...state,
        user: {
          ...state.user,
          jobs: action.payload.allJobs,
          jobsTotal: action.payload.allJobs.length,
        },
      };
    }

    case FAILED_FILLED_JOBS: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case FILLING_STATE_CONNECTIONS: {
      return {
        ...state,
      };
    }

    case FILLED_CONNECTIONS: {
      return {
        ...state,
        user: {
          ...state.user,
          connections: action.payload.allConnections,
          connectionsTotal: action.payload.allConnections.length,
        },
      };
    }

    case FAILED_FILLED_CONNECTIONS: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case FILLING_STATE_EVENTS: {
      return {
        ...state,
      };
    }

    case FILLED_EVENTS: {
      return {
        ...state,
        user: {
          ...state.user,
          events: action.payload.allEvents,
        },
      };
    }

    case FAILED_FILLED_EVENTS: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// ADDING JOB CASES

    case ADDING_JOB: {
      return {
        ...state,
      };
    }

    case ADDED_JOB: {
      return {
        ...state,
        user: {
          ...state.user,
          jobs: action.payload.allJobs,
          jobsTotal: action.payload.allJobs.length,
        },
      };
    }

    case FAILED_ADD_JOB: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// UPDATING JOB CASES

    case UPDATING_JOB: {
      return {
        ...state,
      };
    }

    case UPDATED_JOB: {
      /// this maps through the jobs array
      /// and only changes the job that was updated

      return {
        ...state,
        user: {
          ...state.user,
          jobs: state.user.jobs.map((job) =>
            job.id === action.payload.updatedjob.id
              ? action.payload.updatedjob
              : job
          ),
        },
      };
    }

    case FAILED_UPDATE_JOB: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// DELETING JOB CASES

    case DELETING_JOB: {
      return {
        ...state,
      };
    }

    case DELETED_JOB: {
      return {
        ...state,
        user: {
          ...state.user,
          jobs: action.payload.allJobs,
          jobsTotal: action.payload.allJobs.length,
        },
      };
    }

    case FAILED_DELETE_JOB: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// ADDING CONNECTION CASES

    case ADDING_CONNECTION: {
      return {
        ...state,
      };
    }

    case ADDED_CONNECTION: {
      return {
        ...state,
        user: {
          ...state.user,
          connections: action.payload.allConnections,
          connectionsTotal: action.payload.allConnections.length,
        },
      };
    }

    case FAILED_ADD_CONNECTION: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// UPDATING CONNECTION CASES

    case UPDATING_CONNECTION: {
      return {
        ...state,
      };
    }

    case UPDATED_CONNECTION: {
      /// this maps through the connections array
      /// and only changes the connections that was updated

      return {
        ...state,
        user: {
          ...state.user,
          connections: state.user.connections.map((connection) =>
            connection.id === action.payload.updatedconnection.id
              ? action.payload.updatedconnection
              : connection
          ),
        },
      };
    }

    case FAILED_UPDATE_CONNECTION: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// DELETING CONNECTION CASES

    case DELETING_CONNECTION: {
      return {
        ...state,
      };
    }

    case DELETED_CONNECTION: {
      return {
        ...state,
        user: {
          ...state.user,
          connections: action.payload.allConnections,
          connectionsTotal: action.payload.allConnections.length,
        },
      };
    }

    case FAILED_DELETE_CONNECTION: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// ADDING EVENT CASES

    case ADDING_EVENT: {
      return {
        ...state,
      };
    }

    case ADDED_EVENT: {
      return {
        ...state,
        user: {
          ...state.user,
          events: action.payload.allEvents,
        },
      };
    }

    case FAILED_ADD_EVENT: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// UPDATING EVENT CASES

    case UPDATING_EVENT: {
      return {
        ...state,
      };
    }

    case UPDATED_EVENT: {
      /// this maps through the events array
      /// and only changes the event that was updated

      return {
        ...state,
        user: {
          ...state.user,
          events: state.user.events.map((evt) =>
            evt.id === action.payload.updatedevent.id
              ? action.payload.updatedevent
              : evt
          ),
        },
      };
    }

    case FAILED_UPDATE_EVENT: {
      return {
        ...state,
        error: action.payload,
      };
    }

    /// DELETING EVENT CASES

    case DELETING_EVENT: {
      return {
        ...state,
      };
    }

    case DELETED_EVENT: {
      return {
        ...state,
        user: {
          ...state.user,
          events: action.payload.allEvents,
        },
      };
    }

    case FAILED_DELETE_EVENT: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case REMOVE_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
};
