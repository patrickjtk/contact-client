import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { result } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import contact from "../api/contact";
import ContactDetail from "./ContactDetail";
import { Spinner } from "reactstrap";

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      selectedId: "",
      redirect: false,
      errorMsg: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.removeRecord = this.removeRecord.bind(this);
  }

  toggleModal(id) {
    this.setState({ modalShow: !this.state.modalShow, selectedId: id });
  }

  removeRecord = async () => {
    const resp = await contact.deleteContact(this.state.selectedId);
    if (!resp.ok) {
      this.setState({
        modalShow: !this.state.modalShow,
        errorMsg: resp.data.message,
      });
      return;
    }
    this.setState({ modalShow: !this.state.modalShow, redirect: true });
  };

  render() {
    const contacts = result(this.props, "state.contacts", {});

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Modal
          isOpen={this.state.modalShow}
          toggle={this.toggleModal}
          className="modal-dialog"
        >
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>Are you sure?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.removeRecord}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {this.state.errorMsg && (
          <Alert color="danger">{this.state.errorMsg}</Alert>
        )}
        {contacts.length == 0 ? (
          <Spinner style={{ width: "3rem", height: "3rem" }} color="success" />
        ) : (
          <div className="row p-0 m-0">
            {contacts.map((contact) => (
              <ContactDetail
                key={contact.id}
                contactDetail={contact}
                onpressAction={() => {
                  this.toggleModal(contact.id);
                }}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default connect((state) => ({ state }))(ContactList);
