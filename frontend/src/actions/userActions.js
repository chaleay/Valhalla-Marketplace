import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from '../constants/userConstants';

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
