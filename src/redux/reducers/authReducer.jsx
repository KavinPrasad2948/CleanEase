// src/redux/reducers/authReducer.js

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS, // Ensure this is imported
  } from '../actions/authActions';
  
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  