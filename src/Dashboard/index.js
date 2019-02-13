// DASHBOARD

import React, { Component } from "react";
import CardSheet from "../CardSheet";
import Search from "../Search";
import CardView from "../CardView";
import UserNav from "../UserNav";

class Dashboard extends Component {
	constructor (props) {
		super();
		this.state = {
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			userId: props.authData.userId,
			upResults: null,
			query: "",
			view: null,
			cardsToAdd: []
		}
	}
	addToCardSheet = (cardId) => {

		const cardToAdd = this.state.upResults.find( (card) => {
			console.log(card);
			console.log(card.id);
			if (card.id === cardId) {
				return true 
			} else {
				return false 
			}
		}); 

		if (cardToAdd) {

			const newCardAddArray = this.state.cardsToAdd;
			newCardAddArray.push(cardToAdd);

			this.setState({
				cardsToAdd: newCardAddArray
			})
		} else {
			console.log("ERROR -- card not added");
			return
		}
	}
	addToCardpool = async () => {

	}
	removeFromList = (cardId) => {

		const newCardsToAddArray = this.state.cardsToAdd;

		const index = this.state.cardsToAdd.findIndex( (card) => card.id === cardId);

		newCardsToAddArray.splice(index, 1);

		this.setState({
			cardsToAdd: newCardsToAddArray
		})
	}
	passResultsUp = (results) => {
		this.setState({
			upResults: results
		})
	}
	componentDidMount(){

		document.querySelector("footer").style.display = "none";

		if (!this.props.authData.loggedIn) {
			this.props.setLogOut();
			this.props.history.push("/auth");
			return
		}
		
	}
	render(){

		const authData = {
			loggedIn: this.state.loggedIn,
			loggedInAs: this.state.loggedInAs,
			userId: this.state.userId,
		}

			console.log(this.state);
		return (
			<div id="dashboard">
				<div className="leftDash">
					<UserNav />
					<div className="searchDash">
						<Search passResultsUp={this.passResultsUp} authData={authData} viewBtns={true} viewLow={false} addToCardSheet={this.addToCardSheet} />
					</div>
				</div>
				<div className="rightDash">
					{ this.state.cardsToAdd && this.state.cardsToAdd.length > 0 ? <CardSheet addToCardpool={this.addToCardpool} removeFromList={this.removeFromList} viewBtns={false} searched={true} cards={this.state.cardsToAdd} viewCard={null} /> : null }
				</div>
			</div>
		)
	}
}

export default Dashboard;