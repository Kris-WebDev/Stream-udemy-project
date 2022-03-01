import React from "react";
// inorder to fetch something from the redux store. you import connect
import { connect } from "react-redux";
// also import the function from the actions folder
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  //helper function to render the delete and edit button for login users
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/delete/${stream.id}`} className="ui red button">
            Delete
          </Link>
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
        </div>
      );
    }
  }

  //helper method to render the list
  renderList() {
    // mapping the streams.data to a single stream
    return this.props.streams.map((stream) => {
      //grabing each element of the mapped array and returning it one by one
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <p className="description">{stream.description}</p>
          </div>
        </div>
      );
    });
  }

  renderCreateBtn() {
    if (this.props.isSignedIn) {
      return (
        <div className="content">
          <Link
            to="/streams/new"
            className="ui positive basic right floated button"
          >
            <i className="plus square outline icon" />
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateBtn()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Object.values takes and object as value. in this example the streams data from. it is state.streams because of the key name in the streamReducer
    // then it creates an array from it
    streams: Object.values(state.streams),

    //mapping the userID. the value comes from state.auth.userId
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
