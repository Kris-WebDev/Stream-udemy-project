// this is just importing the names of types. it is now used as a variable
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
  CREATE_STREAM,
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      return _.omit(state, action.payload); // no ID in this one because the payload of DELETE_STREAM is only returning ID

    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    // mapKeys is a lodash function to map the array into a new one. using a property inside the array
    // in our code.. it takes the action.payload (which is the api.data) and create a new array with the key "ID"
    /* for example a list of objects
    state = 
       { apt: 1, name: Joe }
       { apt: 2, name: Amy }
       { apt: 3, name: Mark }
       
     then to put those in a new array with key values of apt
     _.mapKeys(state, 'apt')
     the output will be
     
      {
        [1] : 
           { apt: 1, name: Joe }
        [2] : 
           { apt: 2, name: Amy }
        [3] : 
           { apt: 3, name: Mark }
      }
    
      is basically creating a new array and using one of the property as an identifier/key for that array
    */

    default:
      return state;
  }
};

//explanation for the syntax of object-base switch case approach ES2015  return{ ...state, [ ]: action.type }
/* as example
   const aptNumber = { joe: 1, amy: 2, john: 3}

   lets say we need to add jane apt 4 in the array
    
   so the code goes like

   { ...aptNumber, [jane]: 4}

   1st argument refer to the array to add ...aptNumber
   2nd arrgument is the property name 
   3rd argument is the value of that property name

   so for our code { ...state, [action,payload.id]: action.payload}

   1st argument refers to the state object
   2nd is the id/property of some variable that you want to add to the state object 
   3rd argument is the value of it. which is action.payload
  
    this is called KEY interpolation. this is not making a new array. its changing the property inside that state object. i've tried it.
    to refer to a specific property you need to specify it inside the 2nd argument [ ' ' ]

*/
