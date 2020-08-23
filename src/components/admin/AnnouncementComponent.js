import React, { Component } from "react";

class CreateAnnouncement extends Component {
  render() {
    if (
      this.props.announcementText !== null &&
      this.props.announcementText !== ""
    ) {
      return (
        <div
          style={{
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            background: "#fbf7ff",
            padding: "1.2rem 1rem 1.1rem 1.4rem",
            margin: "1rem 3rem",
            borderRadius: "10px",
            border: "2px solid #bc97db",
          }}
        >
          <div
            style={{
              marginRight: ".5rem",
              color: "#4a018a",
            }}
          >
            {this.props.announcementText}
          </div>
          <button
            style={{
              padding: 0,
              backgroundColor: "initial",
              border: 0,
              color: "grey",
            }}
            type="button"
            aria-label="Close"
            onClick={() => this.props.closeAnnouncement(this.props.id)}
          >
            X
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default CreateAnnouncement;
