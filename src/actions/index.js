import axios from 'axios';

// export action types

// REGISTERING A USER
export const REGISTERING_USER = 'REGISTERING_USER';
export const REGISTERED_USER = 'REGISTERED_USER';
export const FAILED_REGISTER = 'FAILED_REGISTER';

// LOGGING IN A USER
export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FAILED_LOGIN = 'FAILED_LOGIN';

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
