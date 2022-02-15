const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      //added to the state with the ... this will return the isSignedIn value to the reducer index.js
      return { ...state, isSignedIn: true, userId: action.payload };

    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null };

    default:
      return state;
  }
};
