import React, { Component } from "react";

class CreateAnnouncement extends Component {
  constructor(props) {
    super(props);
  }

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
            background: "#eb9694",
            padding: "1.2rem 1rem 1.1rem 1.4rem",
            margin: "1rem 3rem",
          }}
        >
          <div
            style={{
              marginRight: ".5rem",
              color: "white",
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
