import React, { Component } from "react";
import UserNav from "../UserNav";
import CardSheet from "../CardSheet";
import CardView from "../CardView";

class Cards extends Component {
	constructor (props) {
		super();
		this.state={
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
			<div id="dashboard">
				<div className="leftDash">
					<UserNav />
					<div className="cardPool">
						{ this.state.cardpool ? <CardSheet viewBtns={false} searched={true} cards={this.state.cardpool} viewCard={null} /> : null }
					</div>
				</div>
				<div className="rightDash">
					{ this.state.cardpool ? <CardSheet viewBtns={false} searched={true} cards={this.state.cardpool} viewCard={null} /> : null }
				</div>
			</div>
		)
	}
}

export default Cards;