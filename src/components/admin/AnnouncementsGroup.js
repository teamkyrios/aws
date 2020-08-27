import React, { Component } from "react";

const AnnouncementComponent = (props) => {
	if (props.announcementText !== null && props.announcementText !== "") {
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
					{props.announcementText}
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
					onClick={() => props.closeAnnouncement(props.id)}
				>
					X
				</button>
			</div>
		);
	} else {
		return <div></div>;
	}
};

class AnnouncementsGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayedAnnouncements: [],
			setkey: 0,
		};

		this.closeAnnouncement = this.closeAnnouncement.bind(this);
	}

	// make it auto trigger?
	fetchAnnouncement(formParameters) {
		// Get from backend
		this.state.displayedAnnouncements.unshift(
			<AnnouncementComponent
				announcementText={formParameters}
				key={this.state.setkey}
				id={this.state.setkey}
				closeAnnouncement={this.closeAnnouncement}
			/>
		);
		this.setState({ setkey: this.state.setkey + 1 });
	}

	closeAnnouncement(id) {
		this.state.displayedAnnouncements.splice(
			this.state.displayedAnnouncements.findIndex(
				(x) => x.props.id === id
			),
			1
		);
		this.setState({
			displayedAnnouncements: this.state.displayedAnnouncements,
		});
	}

	render() {
		return <div>{this.state.displayedAnnouncements}</div>;
	}
}

export default AnnouncementsGroup;
