import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "684800717834-lbfpd6s1p8jd7rcc8ep65so6m68fl0b2.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          //this.auth is from keyword in reducer. 'auth'
          this.auth = window.gapi.auth2.getAuthInstance(); //this.auth is now equal to the function to check if user is signed in
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  /*
  note: the gapi.auth2.getAuthInstance() is a function that calls the google api library. 
  if you do the command in the console. you'll be presented all the function library in that api
  like .isSignedIn etc...
  */

  // checking if isSignedIn has a value of true or false
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId()); //call from the action creator?
    } else {
      this.props.signOut();
    }
  };

  onSignedOutClick = () => {
    this.auth.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  renderAuthButton() {
    //check if the isSigned in is null
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      //check if its isSignedIn is True
      return (
        <button
          className="ui red google button"
          onClick={this.onSignedOutClick}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      //check if its false
      return (
        <button className="ui green google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign in with google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
  // setting the isSignedIn state with the value from the reducers
  // it goes like state = to the passed variable from the connect function below
  // auth = the keyword used in the reducer index.js
  // and isSignedIn is from the authReducer data that was passed to the reducer index.js
};

//signIn and signOut from the action creator is not CONNECTed to the this.props
//marStateToProps grabs the reducers data.
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
