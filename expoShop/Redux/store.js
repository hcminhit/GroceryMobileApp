import { createStore, combineReducers, applyMiddleware } from 'redux';
import cartItems from './Reducers/cartItems';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const reducers = combineReducers({
    cartItems: cartItems,
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))   
)
export default store;