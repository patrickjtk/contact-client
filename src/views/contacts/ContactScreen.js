import React, { Component } from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import "../../assets/css/Form.css";
import { Link, Redirect } from "react-router-dom";
import contact from "../../api/contact";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  age: Yup.number().required().label("Age"),
  photo: Yup.string().label("Photo Url"),
});

class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      errorMsg: null,
      isLogin: false,
      alertState: "alert alert-primary",
      loading: false,
      redirect: false,
      contactId: this.props.match.params.id ? this.props.match.params.id : null,
      contact: {
        firstName: "",
        lastName: "",
        age: "",
        photo: "",
      },
    };

    this.addContact = this.addContact.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getContactFromServer = this.getContactFromServer.bind(this);
  }

  componentDidMount() {
    if (this.state.contactId !== null) {
      this.getContactFromServer();
    }
  }

  async addContact(fields) {
    this.setState({ loading: true });
    const resp = await (this.state.contactId
      ? contact.putContact(this.state.contactId, fields)
      : contact.postContact(fields));
    if (!resp.ok) {
      this.setState({ loading: false, errorMsg: resp.data.error });
      return;
    }
    this.setState({ loading: false, redirect: true });
    this.goBack();
  }

  async getContactFromServer() {
    this.setState({ loading: true });
    const resp = await contact.getContact(this.state.contactId);
    if (!resp.ok) {
      this.setState({ loading: false, errorMsg: resp.data.error });
      return;
    }
    let arr = resp.data.data;
    delete arr.id;
    this.setState({ loading: false, contact: arr });
  }

  goBack() {
    this.setState({ redirect: true });
  }

  render() {
    let months = [],
      dates = [];
    for (let index = 0; index < 12; index++) {
      months[index] = (index + 1).toString().padStart(2, "0");
    }
    for (let index = 0; index < 31; index++) {
      dates[index] = (index + 1).toString().padStart(2, "0");
    }
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="panel pb-3">
          <div className="form">
            <h1 className="title">Add Contact</h1>
            {this.state.errorMsg && (
              <div className="alert alert-danger" role="alert">
                {this.state.errorMsg}
              </div>
            )}
            <Formik
              enableReinitialize={true}
              initialValues={this.state.contact}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                this.addContact(values);
              }}
            >
              <Form>
                <fieldset disabled={this.state.loading}>
                  <div className="form-group row">
                    <ErrorMessage name="firstName">
                      {(msg) => <div className="speech-bubble">{msg}</div>}
                    </ErrorMessage>
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group row">
                    <ErrorMessage name="lastName">
                      {(msg) => <div className="speech-bubble">{msg}</div>}
                    </ErrorMessage>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group row">
                    <ErrorMessage name="age">
                      {(msg) => <div className="speech-bubble">{msg}</div>}
                    </ErrorMessage>
                    <Field
                      name="age"
                      type="number"
                      placeholder="Age"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group row">
                    <ErrorMessage name="photo">
                      {(msg) => <div className="speech-bubble">{msg}</div>}
                    </ErrorMessage>
                    <Field
                      name="photo"
                      type="text"
                      placeholder="Photo Url"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group row">
                    <button type="submit" className="btn btn-block btn-purple">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-block btn-purple"
                      onClick={this.goBack}
                    >
                      Back
                    </button>
                  </div>
                </fieldset>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactScreen;
