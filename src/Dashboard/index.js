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

		return (
			<div>Hey yo this is the dashboard</div>
		)
	}
}

export default Dashboard;