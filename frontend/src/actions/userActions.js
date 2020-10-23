import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    //redux action type
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    //
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    //BACKEND CALL
    //make request using axios
    //we get values back from authuser
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    //after request, dispatch redux success event
    dispatch({
      type: USER_LOGIN_SUCCESS, //this returns userInfo object
      payload: data,
    });

    //save data object (email, password ) into userInfo object in localstorage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  //remove data from localstorage
  localStorage.removeItem('userInfo');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    //redux action type
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    //
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    //BACKEND CALL for user registration
    //make request using axios
    //we get values back from authuser
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    //after request, dispatch redux success event
    dispatch({
      type: USER_REGISTER_SUCCESS, //this returns userInfo object
      payload: data,
    });

    //next login after register
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    //save data object (email, password ) into userInfo object in localstorage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    //redux action type
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    //destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        //put in header to allow auth - otherwise get 401 error
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //BACKEND CALL for user info
    //make request using axios
    //we get values back from getUserDetails() on backend
    const { data } = await axios.get(`/api/users/${id}`, config);

    //after request, dispatch redux success event
    dispatch({
      type: USER_DETAILS_SUCCESS, //this returns userInfo object
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    //redux action type
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    //destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        //put in header to allow auth - otherwise get 401 error
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //BACKEND CALL to update user info
    //make request using axios
    //we update values from user parameter
    const { data } = await axios.put(`/api/users/profile`, user, config);
    //const { _id, name, email, isAdmin } = data;

    //after request, dispatch redux success event
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS, //this returns userInfo object
      payload: data,
    });

    //dispatch this event to set the userLogin state to match our most current updated profile (Needed for header display of name)
    dispatch({
      type: USER_LOGIN_SUCCESS, //this returns userInfo object
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
