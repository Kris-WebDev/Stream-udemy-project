import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStreams } from "../../actions/";

class StreamCreate extends React.Component {
  // destructed pass from meta to just the error and touched
  renderError({ error, touched }) {
    //if touch and error is true
    if (touched && error) {
      return (
        <div className="ui pointing red basic label">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // destructuring frmProps to just { input } to shorten it for the return line
  renderInput = ({ input, label, meta }) => {
    // props will be passed down to renderInput. see console.log(frmProps). it will show avaible function in the props(property)
    // for this... its going to use the onChange function and value data inside the props
    //this is basically using all availble function inside frmProps, console.log(frmProps) it to see

    //console.log(meta);
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  /* NOTE: if an error Cannot read properties of undefined (reading 'renderError') or any
  undefined. find the function and turn it to a => function because this.{somevalue} started
  as null so its not defined 
  */

  onSubmit = (formValue) => {
    this.props.createStreams(formValue); //this calls the action creator createStreams
  };

  render() {
    // the onSubmit{this.props.handleSubmit} is from the reduxForm data that got connect with this.props
    // the .handleSubmit is from one of the function inside the this.props. console log it to see
    // then it passes the function call onSubmit to invoke it. with an argument that the form will pass down to it.
    // console.log(formValue) to see
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//form validation method in redux-form
// formValues contain all the values in the form
const validate = (formValues) => {
  const errors = {};

  //if no Title value
  if (!formValues.title) {
    // the connection between this error.title and the Field above is the Name property.
    // it needs to be the same so the error will show below the field associated with the name.
    // this is establish by using meta.error in the renderInput function <---
    errors.title = "You must enter a title";
  }

  //if no description value
  if (!formValues.description) {
    errors.description = "You must enter a Description";
  }

  return errors;
};

// reduxForm will be connected to this.props
const formWrapped = reduxForm({
  form: "createStream",
  validate: validate, // the validate function above that is now assigned to a key "validate"
})(StreamCreate);

//assigning createStream function form the action creator as this.props
export default connect(null, { createStreams })(formWrapped);
