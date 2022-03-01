import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    // onDismiss is a function props from StreamDelete
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>

        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

// the onClick function at the modal background is for when user clicks on the grey background
// it goes back to the specified root. the sytax {() => } means run this command
// the history.push is invoking that commaand to go to the root "/"

// the onClick={(e) => e.stopPropagation()} is a function to stop the parent function for the children

export default Modal;
