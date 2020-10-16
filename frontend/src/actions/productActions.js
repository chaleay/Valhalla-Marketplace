//create constant, reducer, action, fire off in component
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  //dispatch actions to the reducer
  try {
    //dispatch a request (goes to productReducers)
    dispatch({ type: PRODUCT_LIST_REQUEST });

    //fecth data from route (await since need to wait for all data to be fetched)
    const { data } = await axios.get('/api/products');

    //dispatch a successful request after obtaining the data
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  //dispatch actions to the reducer
  try {
    //dispatch a request (goes to productReducers)
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    //fecth data from route (await since need to wait for all data to be fetched)
    const { data } = await axios.get(`/api/products/${id}`);

    //dispatch a successful request after obtaining the data
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
