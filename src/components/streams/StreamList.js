import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  //helper method to render the list
  renderList() {
    // mapping the streams.data to a single stream
    return this.props.streams.map((stream) => {
      //grabing each element of the mapped array and returning it one by one
      return (
        <div className="item" key={stream.id}>
          <i className="large middle aligned icon camera" />
          <div className="content">
            <h4 className="header">{stream.title}</h4>
            <p className="description">{stream.description}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log(this.props.streams);
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { streams: Object.values(state.streams) };
  // Object.values takes and object as value. in this example the streams data from. it is state.streams because of the key name in the streamReducer
  // then it creates an array from it
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
