import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { result } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import contact from "../api/contact";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  removeRecord() {}

  render() {
    const contacts = result(this.props, "state.contacts", {});
    console.log("contacts", contacts);
    console.log("props", this.props);
    return (
      <>
        <Modal show={this.modalShow}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ modalShow: false });
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => {}}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>age</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  {contact.firstName} {contact.lastName}
                </td>
                <td>{contact.age}</td>
                <td>
                  <Link className="btn" to={"/contactForm/" + contact.id}>
                    edit
                  </Link>
                  <Button
                    onClick={() => {
                      this.setState({ modalShow: true });
                    }}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default connect((state) => ({ state }))(ContactList);
