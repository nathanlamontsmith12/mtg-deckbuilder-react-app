// DASHBOARD

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
	componentDidMount () {
		document.querySelector("footer").style.display = "none";
		// generate user stats and display them on userDash
		// find info about the user based on user ID -- get cardpool, favecards, etc. 
	}
	render(){

		const authData = {
			loggedIn: this.state.loggedIn,
			loggedInAs: this.state.loggedInAs,
			userId: this.state.userId,
		}

		return (
			<div id="dashboard">
				<div className="searchDash">
					<Search authData={authData} viewBtns={true} />
				</div>
				<div className="cardDash">
					{ this.state.cardpool ? <CardSheet viewBtns={false} searched={true} cards={this.state.cardpool} viewCard={null} /> : null }
				</div>
			</div>
		)
	}
}

export default Dashboard;