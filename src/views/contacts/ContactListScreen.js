import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import contact from "../../api/contact";
import "../../assets/css/Form.css";
import ContactList from "../../components/ContactList";
import { addContacts } from "../../redux/actions";

class ContactListScreen extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = async () => {
    const resp = await contact.getContacts();
    console.log(resp);
    if (!resp.ok) {
      return "r";
    }
    this.props.addContacts(resp.data.data);
  };

  render() {
    return (
      <div className="panel pb-3">
        <div>
          <Link to="/contactForm" className="btn btn-block btn-purple">
            add
          </Link>
        </div>
        <div className="list">
          <ContactList />
        </div>
      </div>
    );
  }
}

export default connect(null, { addContacts })(ContactListScreen);
