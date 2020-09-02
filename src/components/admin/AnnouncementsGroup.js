import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

// UI for the announcements
const AnnouncementComponent = (props) => {
	if (
		props.announcementText !== null &&
		props.announcementText.length !== 0
	) {
		return (
			<Alert severity="info" onClose={props.closeAnnouncement}>
				<AlertTitle>
					<strong>Announcement</strong>
				</AlertTitle>
				<p>{props.announcementText}</p>
			</Alert>
		);
	} else {
		return <div></div>;
	}
};

// Handles fetching announcement from backend and closing the announcement
class AnnouncementsGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayedAnnouncement: <></>,
		};

		this.closeAnnouncement = this.closeAnnouncement.bind(this);
	}

	closeAnnouncement() {
		this.setState({
			displayedAnnouncement: <></>,
		});
	}

	componentDidMount() {
		// Get from backend
		fetch(
			"http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/getAnnouncement",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.text())
			.then((res) => {
				console.log("Displaying announcement: " + res);
				this.setState({
					displayedAnnouncement: (
						<AnnouncementComponent
							announcementText={res}
							closeAnnouncement={this.closeAnnouncement}
						/>
					),
				});
			})
			.catch((err) => console.log("Error getting announcement."));
	}

	render() {
		return (
			<div style={{ marginBottom: "15px" }}>
				{this.state.displayedAnnouncement}
			</div>
		);
	}
}

export default AnnouncementsGroup;
