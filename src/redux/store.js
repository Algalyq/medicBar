import { createStore } from 'redux';
import orderReducer from './reducers/orderReducer';

const store = createStore(orderReducer);

export default store;
