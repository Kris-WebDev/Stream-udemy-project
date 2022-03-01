import React from "react";
// inorder to fetch something from the redux store. you import connect
import { connect } from "react-redux";
// also import the function from the actions folder
import { fetchStream } from "../../actions";
import flv from "flv.js";

class StreamShow extends React.Component {
  //creating ref for the video tag
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);

    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    //using the flv for the video. its like a converter
    //documentation for it is in https://www.npmjs.com/package/flv.js
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${this.props.match.params.id}.flv`,
    });
    // ↑ above is setting up the video player with those properties

    // this is basically attaching the element to the video tag at the render()
    this.player.attachMediaElement(this.videoRef.current);

    // ↓ calling the function above
    this.player.load();
  }

  render() {
    // fail safe. this is render first if because props doesnt have a value initially
    if (!this.props.stream) {
      return <div className="ui active centered inline loader"></div>;
    }

    return (
      <React.Fragment>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <div className="ui items">
          <div className="item">
            <div className="content">
              <div className="header">{this.props.stream.title}</div>
              <div className="description">{this.props.stream.description}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // streams variable is the key name in the reducer index.
    // it holds the payload from the api call.
    // payload is an array so we are trying to find the array with the key value of id
    stream: state.streams[ownProps.match.params.id],
  };
  // the result of the return is the stream value will now have the data with the key of the ID
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
