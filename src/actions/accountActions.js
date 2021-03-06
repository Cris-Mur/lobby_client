import axios from 'src/utils/axios';
import authService from 'src/services/authService';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const REGISTER = '@account/register';
export const UPDATE_PROFILE = '@account/update-profile';
export const CREATE_PROFILE = '@account/create-profile';
export function login(email, password) {
  return async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const user = await authService.loginWithEmailAndPassword(email, password);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function setUserData(user) {
  return dispatch =>
    dispatch({
      type: SILENT_LOGIN,
      payload: {
        user
      }
    });
}

export function logout() {
  return async dispatch => {
    authService.logout();

    dispatch({
      type: LOGOUT
    });
  };
}

export function register() {
  return true;
}

export function updateProfile(update) {
  console.log(update);
  const token = window.localStorage.getItem('accessToken');
  const request = axios.put(
    `${process.env.REACT_APP_LOCALHOST}/accounts/profile`,
    update,
    { headers: {
      accessToken: `Bearer ${token}`
    }}
  );

  return dispatch => {
    request.then(response =>
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.data
      })
    );
  };
}
export function addProfile(update) {
  console.log(update);
  const token = window.localStorage.getItem('accessToken');
  console.log()
  axios.post(
    `${process.env.REACT_APP_LOCALHOST}/accounts`,
    update,
    { headers: {
      accessToken: `Bearer ${token}`
    }}
  )
  .then(response =>
      {console.log(response)}
  ).catch(err => {
    console.log({error: err})
  })
}
