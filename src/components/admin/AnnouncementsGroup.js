import React, { Component } from "react";

const AnnouncementComponent = (props) => {
	if (
		props.announcementText !== null &&
		props.announcementText.length !== 0
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
					onClick={() => props.closeAnnouncement()}
				>
					X
				</button>
			</div>
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
				console.log(res);
				this.setState({
					displayedAnnouncement: (
						<AnnouncementComponent
							announcementText={res}
							closeAnnouncement={this.closeAnnouncement}
						/>
					),
				});
			})
			.catch((err) => console.log("Error getting announcement"));
	}

	render() {
		return <>{this.state.displayedAnnouncement}</>;
	}
}

export default AnnouncementsGroup;
