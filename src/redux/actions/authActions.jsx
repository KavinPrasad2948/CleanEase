// src/redux/actions/authActions.js

import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'; // Ensure this is exported

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('https://cleanease-backend.onrender.com/signin', credentials);
    const user = response.data;
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  // Perform any necessary logout logic here, such as removing tokens from localStorage
  dispatch(logoutSuccess());
};
