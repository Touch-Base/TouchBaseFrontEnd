import axios from 'axios';

// export action types

      //////////////// USER \\\\\\\\\\\\\\\\\ 

// REGISTERING A USER
export const REGISTERING_USER = 'REGISTERING_USER';
export const REGISTERED_USER = 'REGISTERED_USER';
export const FAILED_REGISTER = 'FAILED_REGISTER';

// LOGGING IN A USER
export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FAILED_LOGIN = 'FAILED_LOGIN';

// UPDATING A USER
export const UPDATING_USER = 'UPDATING_USER';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const FAILED_USER_UPDATE = 'FAILED_USER_UPDATE';


  //////////////// FILLING STATE  \\\\\\\\\\\\\\\\\ 

// FILLING THE STATE WITH THE JOBS, CONNECTIONS,EVENTS
export const FILLING_STATE_JOBS = 'FILLING_STATE_JOBS';
export const FILLED_JOBS = 'FILLED_JOBS';
export const FAILED_FILLED_JOBS = 'FAILED_FILLED_JOBS'

export const FILLING_STATE_CONNECTIONS = 'FILLING_STATE_CONNECTIONS';
export const FILLED_CONNECTIONS = 'FILLED_CONNECTIONS';
export const FAILED_FILLED_CONNECTIONS = 'FAILED_FILLED_CONNECTIONS'

export const FILLING_STATE_EVENTS = 'FILLING_STATE_EVENTS';
export const FILLED_EVENTS = 'FILLED_EVENTS';
export const FAILED_FILLED_EVENTS = 'FAILED_FILLED_EVENTS'

        //////////////// JOBS  \\\\\\\\\\\\\\\\\ 

// ADDING A JOB
export const ADDING_JOB = 'ADDING_JOB';
export const ADDED_JOB = 'ADDED_JOB';
export const FAILED_ADD_JOB = 'FAILED_ADD_JOB';

// UPDATING A JOB
export const UPDATING_JOB = 'UPDATING_JOB';
export const UPDATED_JOB = 'UPDATED_JOB';
export const FAILED_UPDATE_JOB = 'FAILED_UPDATE_JOB';

    //////////////// CONNECTIONS  \\\\\\\\\\\\\\\\\ 

// ADDING A CONNECTION
export const ADDING_CONNECTION = 'ADDING_CONNECTION';
export const ADDED_CONNECTION = 'ADDED_CONNECTION';
export const FAILED_ADD_CONNECTION = 'FAILED_ADD_CONNECTION';

    //////////////// EVENTS  \\\\\\\\\\\\\\\\\ 

// ADDING AN EVENT
export const ADDING_EVENT = 'ADDING_EVENT';
export const ADDED_EVENT = 'ADDED_EVENT';
export const FAILED_ADD_EVENT = 'FAILED_ADD_EVENT';




/// THIS ACTION REGISTERS A USER

export function registerUser(payload) {

  /* register data here */

  return dispatch => {

      dispatch({ type: REGISTERING_USER });

      return axios.post(`https://touch-base-server.herokuapp.com/api/users/register/`, payload)
        .then((response) => {

          dispatch({ type: REGISTERED_USER, payload: response.data });

          localStorage.setItem('token', response.data.token);
        })
  
        .catch((error) => {
          console.log(error)
          dispatch({ type: FAILED_REGISTER, payload: error })
        })
  
        }
}

/// THIS ACTION LOGS IN A USER

export function loginUser(payload) {

  /* login data here */

  return dispatch => {

      dispatch({ type: LOGGING_IN });

      return axios.post(`https://touch-base-server.herokuapp.com/api/users/login/`, payload)
        .then((response) => {
          console.log(response.data)
          dispatch({ type: LOGIN_SUCCESS, payload: response.data });

          localStorage.setItem('token', response.data.token);
        })
  
        .catch((error) => {
          console.log(error)
          dispatch({ type: FAILED_LOGIN, payload: error })
        })
  
        }
}


/// THIS ACTION UPDATES A USER

export function updateUser(payload) {

  /* update data here */

  return dispatch => {

    dispatch({ type: UPDATING_USER });
    console.log(payload)

    return axios.put(`https://touch-base-server.herokuapp.com/api/users/update/`, payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }})
      .then((response) => {
        console.log(response.data)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: response.data });
      })

      .catch((error) => {
        console.log(error)
        dispatch({ type: FAILED_USER_UPDATE, payload: error })
      })

      }
}

/// THIS ACTION ADDS A JOB FOR A USER

export function addJob(payload) {

  /* update data here */

  return dispatch => {

    dispatch({ type: ADDING_JOB });

    return axios.post(`https://touch-base-server.herokuapp.com/api/jobs/add/`, payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }})
      .then((response) => {
        console.log(response.data)
        dispatch({ type: ADDED_JOB, payload: response.data });
      })

      .catch((error) => {
        console.log(error)
        dispatch({ type: FAILED_ADD_JOB, payload: error })
      })

      }
}

/// THIS ACTION UPDATES A JOB FOR A USER

export function editJob(payload) {

  /* update data here */
  console.log(payload)

  return dispatch => {

    dispatch({ type: UPDATING_JOB });

    return axios.put(`https://touch-base-server.herokuapp.com/api/jobs/update/`, payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }})
      .then((response) => {
        console.log(response.data)
        dispatch({ type: UPDATED_JOB, payload: response.data });
      })

      .catch((error) => {
        console.log(error)
        dispatch({ type: FAILED_UPDATE_JOB, payload: error })
      })

      }
}

/// THIS ACTION ADDS A CONNECTION FOR A USER

export function addConnection(payload) {

  /* update data here */

  return dispatch => {

    dispatch({ type: ADDING_CONNECTION });

    return axios.post(`https://touch-base-server.herokuapp.com/api/connections/add/`, payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }})
      .then((response) => {
        console.log(response.data)
        dispatch({ type: ADDED_CONNECTION, payload: response.data });
      })

      .catch((error) => {
        console.log(error)
        dispatch({ type: FAILED_ADD_CONNECTION, payload: error })
      })

      }
}

/// THIS ACTION ADDS AN EVENT FOR A USER

export function addEvent(payload) {

  /* update data here */

  return dispatch => {

    dispatch({ type: ADDING_EVENT });

    return axios.post(`https://touch-base-server.herokuapp.com/api/events/add/`, payload, {
      headers: {
        Authorization: localStorage.getItem('token')
      }})
      .then((response) => {
        console.log(response.data)
        dispatch({ type: ADDED_EVENT, payload: response.data });
      })

      .catch((error) => {
        console.log(error)
        dispatch({ type: FAILED_ADD_EVENT, payload: error })
      })

      }
}

/// FILL STATE WITH JOBS

export function fillStateJobs() {

  return dispatch => {

    const token = localStorage.getItem('token')
    dispatch({ type: FILLING_STATE_JOBS });

    /// GETTING JOBS 

    return axios.get('https://touch-base-server.herokuapp.com/api/jobs/getall', {
      headers: {
        Authorization: token
      }})
      .then(response => {
        console.log(response.data)
        dispatch({ type: FILLED_JOBS, payload: response.data });
      })

      .catch((error) => {
        console.log(error)
        dispatch({ type: FAILED_FILLED_JOBS, payload: error })
      })

      }
}

/// FILL STATE WITH CONNECTIONS

export function fillStateConnections() {

  return dispatch => {

    const token = localStorage.getItem('token')
    dispatch({ type: FILLING_STATE_CONNECTIONS });

    /// GETTING JOBS 

    return axios.get('https://touch-base-server.herokuapp.com/api/connections/getall', {
      headers: {
        Authorization: token
      }})
      .then(response => {
        console.log(response.data)
        dispatch({ type: FILLED_CONNECTIONS, payload: response.data });
      })

      .catch((error) => {
        console.log(error)
        dispatch({ type: FAILED_FILLED_CONNECTIONS, payload: error })
      })

      }
}

/// FILL STATE WITH EVENTS

export function fillStateEvents() {

  return dispatch => {

    const token = localStorage.getItem('token')
    dispatch({ type: FILLING_STATE_EVENTS });

    /// GETTING JOBS 

    return axios.get('https://touch-base-server.herokuapp.com/api/events/getall', {
      headers: {
        Authorization: token
      }})
      .then(response => {
        console.log(response.data)
        dispatch({ type: FILLED_EVENTS, payload: response.data });
      })

      .catch((error) => {
        console.log(error)
        dispatch({ type: FAILED_FILLED_EVENTS, payload: error })
      })

      }
}
