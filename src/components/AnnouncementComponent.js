import React, { Component } from "react";

class CreateAnnouncement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (
      this.props.announcementText != null &&
      this.props.announcementText != ""
    ) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#eb9694",
            color: "white",
            textAlign: "center",
            margin: "30px",
            padding: "30px",
          }}
        >
          {this.props.announcementText}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default CreateAnnouncement;
