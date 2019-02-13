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
			cardsToAdd: [],
			decks: null,
			cardpool: [],
			faveCards: null,
			hiddenCards: null
		}
	}
	addToCardSheet = (cardId, evt) => {

		console.log("addToCardSheetBtn: ", evt);

		// make sure that we have access to the event and currentTarget, the ID of which contains the card's ID 
		// (also the DIV id)

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

			// this should work, regardless of whether EVT gets carried through: 
			document.querySelector(`#${cardId}`)[0].style.display = "none"

		} else {
			console.log("ERROR -- card not added");
			return
		}
	}
	addToCardpool = async () => {
		// got to post array of cards for cardpool back to the server in order to save the new data in the DB
		// then set state to initial (partially)
		try {



		} catch (err) {
			console.log(err)
			return err
		}
	}
	removeFromList = (cardId) => {

		console.log("removeCardBtn: ", evt.currentTarget.id);

		// make sure that we have access to the event and currentTarget, the ID of which contains the card's ID 
		// (also the DIV id)


		const newCardsToAddArray = this.state.cardsToAdd;

		const index = this.state.cardsToAdd.findIndex( (card) => card.id === cardId);

		newCardsToAddArray.splice(index, 1);

		this.setState({
			cardsToAdd: newCardsToAddArray
		})

		// this should work, regardless of whether EVT carries through: 
		document.querySelector(`#${cardId}`)[0].style.display = "block"
	}
	passResultsUp = (results) => {
		this.setState({
			upResults: results
		})
	}
	componentDidMount(){

		// get rid of footer; authenticate user: 

		document.querySelector("footer").style.display = "none";

		if (!this.props.authData.loggedIn) {
			this.props.setLogOut();
			this.props.history.push("/auth");
			return
		}

		// get info about USER: 
		try {
			const URL = "http://localhost:9000/user/" + this.state.userId;

			console.log(URL);

			const response = await fetch(URL, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (!response.ok) {
				throw Error(response.statusText);
			}

			const user = await response.json()

			console.log(user);

			let cardpoolData = [];

			if (user.data.cardpool) {
				cardpoolData = user.data.cardpool
			}

			this.setState({
				decks: user.data.decks,
				cardpool: cardpoolData,
				faveCards: user.data.faveCards,
				hiddenCards: user.data.hiddenCards,
			})

		} catch (err) {
			alert("Error - failed to load user data");
			this.props.setLogOut();
			this.props.history.push("/auth")
		}	
	}
	render(){

		const authData = {
			loggedIn: this.state.loggedIn,
			loggedInAs: this.state.loggedInAs,
			userId: this.state.userId,
		}

		const priors = this.state.cardpool.map( card => card.id);

		console.log(this.state);
		return (
			<div id="dashboard">
				<div className="leftDash">
					<UserNav />
					<div className="searchDash">
						<Search passResultsUp={this.passResultsUp} authData={authData} viewBtns={true} viewLow={false} priors={priors} addToCardSheet={this.addToCardSheet} />
					</div>
				</div>
				<div className="rightDash">
					{ this.state.cardsToAdd && this.state.cardsToAdd.length > 0 ? <CardSheet short={true} addToCardpool={this.addToCardpool} removeFromList={this.removeFromList} viewBtns={false} searched={true} cards={this.state.cardsToAdd} viewCard={null} /> : null }
				</div>
			</div>
		)
	}
}

export default Dashboard;