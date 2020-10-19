import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import contact from "../../api/contact";
import "../../assets/css/Form.css";
import ContactList from "../../components/ContactList";
import { addContacts } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class ContactListScreen extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = async () => {
    const resp = await contact.getContacts();
    if (!resp.ok) {
      return;
    }
    this.props.addContacts(resp.data.data);
  };

  render() {
    return (
      <div className="panel pb-3">
        <div className="list">
          <div className="row">
            <div className="col-12 mb-4">
              <Link to="/contactForm" className="btn btn-block btn-purple">
                <FontAwesomeIcon icon={faPlus} /> Add
              </Link>
            </div>
          </div>
          <ContactList />
        </div>
      </div>
    );
  }
}

export default connect(null, { addContacts })(ContactListScreen);
