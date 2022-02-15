import apiStreams from "../api/apiStreams";
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

// Below are Action function. API fecth and assigning it to an action.type and returns the api.data as payload

// Create stream. 2nd argument for redux thunk is the getState. to grab something from the store
export const createStreams = (formValues) => async (dispatch, getState) => {
  // destructured way ↓ from auth.userId
  const { userId } = getState().auth;

  // post to api
  const res = await apiStreams.post("/streams", { ...formValues, userId });
  // the ↑ above method { ...forValues, userId} is saying that append to "fromValue" the value of userId
  // and create a new object

  // returning the api call
  dispatch({
    type: CREATE_STREAM,
    payload: res.data,
  });
};

// Fetching multiple streams
export const fetchStreams = () => async (dispatch) => {
  const res = await apiStreams.get("/streams"); //API function call from the apiStream file

  //returning the api call
  dispatch({
    type: FETCH_STREAMS,
    payload: res.data,
  });
};

// Fetching ONE streams. passing the ID as var to determine the record to fetch
export const fetchStream = (id) => async (dispatch) => {
  const res = await apiStreams.get(`/streams/${id}`); //API function call from the apiStream file

  //returning the api call
  dispatch({
    type: FETCH_STREAM,
    payload: res.data,
  });
};

// edit A streams, passing the ID as var to determine the record to fetch
// passing the formValue as well to update the record
export const editStream = (id, formValues) => async (dispatch) => {
  const res = await apiStreams.put(`/streams/${id}`, formValues);
  // 2nd argument is the updated value. so it goes like .put( 'endpoint' , 'data to update')

  //returning the api call
  dispatch({
    type: EDIT_STREAM,
    payload: res.data,
  });
};

// Deleting a streams. passing the ID as var to determine the record to fetch
export const deleteStream = (id) => async (dispatch) => {
  await apiStreams.delete(`/streams/${id}`);
  //delete the record with the specified ID

  //returning the api call
  dispatch({
    type: DELETE_STREAM,
    payload: id, // as payload we return the id value, so the reducer can reference it
  });
};
