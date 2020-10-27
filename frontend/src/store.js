import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productAdminDeleteReducer,
  productAdminCreateReducer,
  productAdminUpdateReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers.js';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliveredReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productAdminDelete: productAdminDeleteReducer,
  productAdminCreate: productAdminCreateReducer,
  productUpdate: productAdminUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userListAdmin: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateAdmin: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDelivered: orderDeliveredReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? //return cartItems, else return empty array if sl
    JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? //return cartItems, else return empty array if sldds
    JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? //return cartItems, else return empty array if sl
    JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

//create storage getter for paymentmethod?

const initialState = {
  //cart is an object with contains cartItems, which is defined above and shipping address
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  //what the fuck does this line do?
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
