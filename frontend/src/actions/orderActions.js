import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_FAIL,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
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

    //NEED TO RESET - CART MODIFIED SO LIST NEEDS TO BE RENDERED AGAIN IN USER PROFILE
    dispatch({
      type: ORDER_LIST_MY_RESET,
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

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    //redux action type - FIRST THE REQUEST
    dispatch({
      type: ORDER_PAY_REQUEST,
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
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    //after request, dispatch redux success event
    dispatch({
      type: ORDER_PAY_SUCCESS,
      //payload: data,
    });

    dispatch({
      type: ORDER_LIST_MY_RESET,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    //redux action type - FIRST THE REQUEST
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
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
    const { data } = await axios.get(`/api/orders/myorders`, config);
    ///

    //after request, dispatch redux success event
    dispatch({
      type: ORDER_LIST_MY_SUCCESS, //this returns userInfo object
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    //redux action type - FIRST THE REQUEST
    dispatch({
      type: ORDER_LIST_REQUEST,
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
    const { data } = await axios.get(`/api/orders`, config);
    ///

    //after request, dispatch redux success event
    dispatch({
      type: ORDER_LIST_SUCCESS, //this returns userInfo object
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    //redux action type
    dispatch({
      type: ORDER_DELETE_REQUEST,
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
    var data = await axios.delete(`/api/orders/${id}`, config);
    //const { _id, name, email, isAdmin } = data;

    //after request, dispatch redux success event
    dispatch({
      type: ORDER_DELETE_SUCCESS, //this returns userInfo object
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    //redux action type
    dispatch({
      type: ORDER_DELIVERED_REQUEST,
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
    await axios.put(`/api/orders/${order._id}/deliver`, {}, config);
    //const { _id, name, email, isAdmin } = data;

    //after request, dispatch redux success event
    dispatch({
      type: ORDER_DELIVERED_SUCCESS, //this returns userInfo object
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
