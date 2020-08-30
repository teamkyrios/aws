import React, { Component } from "react";

const AnnouncementComponent = (props) => {
	if (props.announcementText !== null && props.announcementText[0] !== "") {
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
					{props.announcementText[0]}
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

// Handles fetching announcement from backend and closing the announcement
class AnnouncementsGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayedAnnouncements: [],
		};

		this.closeAnnouncement = this.closeAnnouncement.bind(this);
	}

	fetchAnnouncement() {
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
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				var setkey = 0;
				//res.foreach((element) => {
				this.state.displayedAnnouncements.unshift(
					<AnnouncementComponent
						announcementText={res}
						key={setkey}
						id={setkey}
						closeAnnouncement={this.closeAnnouncement}
					/>
				);
				setkey++;
				//});
			});
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

	componentDidMount() {
		this.fetchAnnouncement();
	}

	render() {
		return <div>{this.state.displayedAnnouncements}</div>;
	}
}

export default AnnouncementsGroup;
