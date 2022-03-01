import React from "react";
import { connect } from "react-redux";
import { createStreams } from "../../actions/";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValue) => {
    this.props.createStreams(formValue); //this calls the action creator createStreams
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
    // ↑ above is using the StreamForm component and doing a onSubmit function with the property onSubmit (aswel)
  }
}

//assigning createStream function form the action creator as this.props
export default connect(null, { createStreams })(StreamCreate);
