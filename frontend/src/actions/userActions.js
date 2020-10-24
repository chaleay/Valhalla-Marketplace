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
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_SUCCESS,
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

  //user stuff reset
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });

  //admin reset
  dispatch({ type: USER_LIST_RESET });

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
    //we update values from user parameter - user is sent as part req.body
    const { data } = await axios.put(`/api/users/profile`, user, config);
    //const { _id, name, email, isAdmin } = data;

    //after request, dispatch redux success event
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS, //this returns userInfo object
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

//@admin function
//list users as admin
export const listUsers = () => async (dispatch, getState) => {
  try {
    //redux action type
    dispatch({
      type: USER_LIST_REQUEST,
    });

    //destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        //put in header to allow auth - otherwise get 401 error
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //BACKEND CALL to update user info
    //make request using axios
    //we update values from user parameter
    const { data } = await axios.get(`/api/users`, config);
    //const { _id, name, email, isAdmin } = data;

    //after request, dispatch redux success event
    dispatch({
      type: USER_LIST_SUCCESS, //this returns userInfo object
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//@admin function
//list users as admin
export const deleteUserAdmin = (id) => async (dispatch, getState) => {
  try {
    //redux action type
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    //destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        //put in header to allow auth - otherwise get 401 error
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //BACKEND CALL to update user info
    //make request using axios
    //we update values from user parameter
    var data = await axios.delete(`/api/users/${id}`, config);
    //const { _id, name, email, isAdmin } = data;

    //after request, dispatch redux success event
    dispatch({
      type: USER_DELETE_SUCCESS, //this returns userInfo object
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//@ADMIN FUNCTION
//updates user of choice through panel
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    //redux action type
    dispatch({
      type: USER_UPDATE_ADMIN_REQUEST,
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
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    //const { _id, name, email, isAdmin } = data;

    //after request, dispatch redux success event
    dispatch({
      type: USER_UPDATE_ADMIN_SUCCESS, //this returns userInfo object
    });

    //reset user details after put request
    dispatch({
      type: USER_DETAILS_SUCCESS, //this returns userInfo object
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
