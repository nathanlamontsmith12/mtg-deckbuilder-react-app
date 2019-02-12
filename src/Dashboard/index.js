import React, { Component } from "react";
import CardSheet from "../CardSheet";
import Search from "../Search";
import CardView from "../CardView";

class Dashboard extends Component {
	constructor (props) {
		super();
		this.state = {
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			userId: props.authData.userId,
			decks: null,
			cardpool: null,
			favecards: null,
			results: null,
			query: "",
			view: null
		}
	}
	render(){

		console.log("dashboard state: ", this.state);
		console.log("dashboard props: ", this.props);
		console.log("dashboard nope: ", this.props.nope);

		if (this.props.nope) {
			this.props.setLogOut(this.props.history);
			this.props.history.push("/auth");
		}

		return (
			<div>Hey yo this is the dashboard</div>
		)
	}
}

export default Dashboard;