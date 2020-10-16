import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? //return cartItems, else return empty array if sl
    JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: cartItemsFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  //what the fuck does this line do?
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
