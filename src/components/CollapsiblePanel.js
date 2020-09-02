import React, { Component } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Collapsible UI panel, used in admin.
class Collapsible extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		this.togglePanel = this.togglePanel.bind(this);
	}
	togglePanel(e) {
		this.setState({ open: !this.state.open });
	}
	render() {
		return (
			<div
				style={{
					margin: "10px",
				}}
			>
				<hr />
				<div onClick={(e) => this.togglePanel(e)}>
					<h5>
						{this.props.title}
						<FontAwesomeIcon icon={faCaretDown} />
					</h5>
				</div>
				{this.state.open ? <div>{this.props.children}</div> : null}
			</div>
		);
	}
}

export default Collapsible;
