import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_CREATE_RESET,
} from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    //redux action type - FIRST THE REQUEST
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    //destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //ADD authorization for header - important get passing middleware check where we check for bearer token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        //put in header to allow auth - otherwise get 401 error
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //BACKEND CALL
    const { data } = await axios.post(`/api/orders`, order, config);

    //after request, dispatch redux success event
    dispatch({
      type: ORDER_CREATE_SUCCESS, //this returns userInfo object
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    //redux action type - FIRST THE REQUEST
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    //destructure getState.userLogin.userInfo
    const {
      userLogin: { userInfo },
    } = getState();

    //ADD authorization for header - important get passing middleware check where we check for bearer token
    const config = {
      headers: {
        //put in header to allow auth - otherwise get 401 error
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //BACKEND CALL
    const { data } = await axios.get(`/api/orders/${id}`, config);

    //after request, dispatch redux success event
    dispatch({
      type: ORDER_DETAILS_SUCCESS, //this returns userInfo object
      payload: data,
    });

    dispatch({
      type: ORDER_CREATE_RESET, //this returns userInfo object
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
