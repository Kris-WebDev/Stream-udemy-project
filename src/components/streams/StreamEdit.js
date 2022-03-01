import React from "react";
// inorder to fetch something from the redux store. you import connect
import { connect } from "react-redux";
// also import the function from the actions folder
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

//NOTE: when using react-router. every component needs to fetch there own data. separately.
// so for this component to work. it needs to do the fetchStreams() function
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // fail safe. this is render first if because props doesnt have a value initially
    if (!this.props.stream) {
      return <div className="ui active centered inline loader"></div>;
    }

    return (
      <div>
        <h3>Edit your Stream</h3>
        <br />
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, "title", "description")}
        />
      </div>
    );
    /* the ↑ above code initialValues={_.pick(this.props.stream, "title", "description")}
   is a lodash helper tool to pick just certain properties inside our api.data (which is the props.stream)
   and display the initial values to the form that has the name "title" and "description"
   the syntax is .pick( the property , "the name of the properties")
   */
  }
}

//use mapStateToProps 2nd argument to fetch the props at ↑ StreamEdit because props is only passed down to that function
// to access that props.. use "ownProps" as a 2nd argument

const mapStateToProps = (state, ownProps) => {
  return {
    // streams variable is the key name in the reducer index.
    // it holds the payload from the api call.
    // payload is an array so we are trying to find the array with the key value of id
    stream: state.streams[ownProps.match.params.id],
  };
  // the result of the return is the stream value will now have the data with the key of the ID
};
// note: when using mapStateToProps. it has 2 argument
// 1: is all the state inside the redux store
// 2: is the props object inside the component. in this example the StreamEdit compo

export default connect(mapStateToProps, { editStream, fetchStream })(
  StreamEdit
);
