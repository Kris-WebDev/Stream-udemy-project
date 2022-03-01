import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { Link } from "react-router-dom";

// inorder to fetch something from the redux store. you import connect
import { connect } from "react-redux";

//importing from the action
import { deleteStream, fetchStream } from "../../actions";

class StreamDelete extends React.Component {
  // fetching the stream
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // this is for setting up the button to pass down to the props for the modals
  // <> is equal to using React.Fragment also
  renderButtons() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui red button"
        >
          Delete
        </button>
        <Link className="ui button" to="/">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderDeleteContent() {
    if (!this.props.stream) {
      return "These is no currently selected stream to delete";
    }

    return (
      <React.Fragment>
        <p>Are you sure you want to delete?</p>
        <h4>Title: {this.props.stream.title}</h4>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <Modal
          title="Delete Stream"
          content={this.renderDeleteContent()}
          actions={this.renderButtons()}
          onDismiss={() => history.push("/")} //pushing the redirect to the / "root"
        />
      </div>
    );
  }
}

//use mapStateToProps 2nd argument to fetch the props at ↑ StreamEdit because props is only passed down to that function
// to access that props.. use "ownProps" as a 2nd argument
const mapStateToProps = (state, ownProps) => {
  return {
    // streams variable is the key name in the reducer index.
    // it holds the payload from the api call.
    // the payload is an array so we are trying to find the array with the key value of id
    stream: state.streams[ownProps.match.params.id],
  };
  // the result of the return is the stream value will now have the data with the key of the ID
};
// note: when using mapStateToProps. it has 2 argument
// 1: is all the state inside the redux store
// 2: is the props object inside the component. in this example the StreamEdit compo

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
