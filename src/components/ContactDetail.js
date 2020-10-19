import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      selectedId: "",
      redirect: false,
      errorMsg: "aaaa",
    };
  }

  render() {
    return (
      <div className="col-3">
        <div className="row panel-contact p-2 m-2">
          <div className="col-4">
            {/* <div className="img-container rounded-circle"> */}
            <div
              className="ratio img-responsive img-circle"
              style={{
                backgroundImage: `url(${this.props.contactDetail.photo})`,
                top: "20%",
              }}
            ></div>
            {/* </div> */}
          </div>
          <div className="col-8 m-0 p-0">
            <div className="row p-0">
              <div className="col-12">
                <label className="title-panel">
                  {this.props.contactDetail.firstName}{" "}
                  {this.props.contactDetail.lastName}{" "}
                </label>
              </div>
            </div>
            <div className="row p-0">
              <div className="col-12">Age: {this.props.contactDetail.age}</div>
            </div>
            <div className="pull-right btn-group-sm">
              <Link
                className="btn btn-success tooltips"
                to={"/contactForm/" + this.props.contactDetail.id}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <Button
                className="btn btn-danger tooltips"
                onClick={this.props.onpressAction}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactDetail;
