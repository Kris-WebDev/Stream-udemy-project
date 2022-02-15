import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducers from "./authReducers";
import streamReducer from "./streamReducer";

//combineReducers is a function that combine all the reducers and put it into a key value which is passed to the connection
export default combineReducers({
  auth: authReducers, //return auth as key word from the authReducer.js
  form: formReducer, //from redux form change the name to formReducer
  streams: streamReducer, // from streamReducer
});
