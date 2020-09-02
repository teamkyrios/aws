import React, { Component } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// UI for modal component, including form to toggle visitors allowed status
const ModalDetails = ({ name, nric, visitorsAllowedStatus, closeModal }) => {
  const CheckStatus = ({ visitorsAllowedStatus }) => {
    if (String(visitorsAllowedStatus).includes("does not allow visitors")) {
      return false;
    } else {
      return true;
    }
  };

  const ChangeStatus = () => {
    // toggle visitor
    console.log(name);
    console.log(nric);
    fetch(
      "http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/toggleVisitor",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: name,
          patientNric: nric,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res.message))
      .catch((err) => console.log(err));
    //closeModal();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FontAwesomeIcon
        icon={faTimes}
        onClick={closeModal}
        style={{ position: "relative", left: "90%", top: "10%" }}
      />
      <p>Patient's name: {name}</p>
      <p>Patient's NRIC: {nric}</p>
      <p>
        <strong>{visitorsAllowedStatus}.</strong>
      </p>

      <form
        onSubmit={(event) => {
          ChangeStatus();
          event.preventDefault();
        }}
      >
        <button
          style={{
            borderRadius: "10px",
          }}
          type="submit"
        >
          {CheckStatus(visitorsAllowedStatus)
            ? "Don't allow visitors for this patient"
            : "Allow visitors for this patient"}
        </button>
      </form>
    </div>
  );
};

/**
 * Modal component for allowing/barring visitors from a specific patient, searched via admin form.
 */
class ToggleVisitors extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <ModalDetails
            name={this.props.patientName}
            nric={this.props.patientNric}
            visitorsAllowedStatus={this.props.visitorsAllowedStatus}
            closeModal={this.props.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

export default ToggleVisitors;
