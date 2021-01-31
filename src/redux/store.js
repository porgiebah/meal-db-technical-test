import { createStore, applyMiddleware } from "redux";
import appReducer from "./appReducer";
import thunk from 'redux-thunk';

export default createStore(appReducer, applyMiddleware(thunk));
