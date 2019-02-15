// DASHBOARD

import React, { Component } from "react";
import CardSheet from "../CardSheet";
import Search from "../Search";
import UserNav from "../UserNav";

class Dashboard extends Component {
	constructor (props) {
		super();
		this.state = {
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			userId: props.authData.userId,
			upResults: [],
			query: "",
			view: null,
			cardsToAdd: [],
			decks: [],
			cardpool: [],
			faveCards: [],
			hiddenCards: [],
			processing: false
		}
	}
	addToCardSheet = (cardId) => {

		// make sure that we have access to the event and currentTarget, the ID of which contains the card's ID 
		// (also the DIV id)

		const cardToAdd = this.state.upResults.find( (card) => {
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
			document.getElementById(cardId).style.display = "none"

		} else {
			console.log("ERROR -- card not added");
			return
		}
	}
	addToCardpool = async () => {
		// got to post array of cards for cardpool back to the server in order to save the new data in the DB
		// then set state to initial (partially)
		try {

			this.setState({
				processing: true
			})


			const URL = process.env.REACT_APP_SERVER_URL + "card";

			const reqBody = JSON.stringify({cardsToAdd: this.state.cardsToAdd, userId: this.state.userId});

			const response = await fetch(URL, {
				method: "POST",
				body: reqBody,
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				}
			})

			if(!response.ok) {
				throw Error(response.statusText)
			}

			this.setState({
				query: "",
				view: null,
				cardsToAdd: [],
			})

			this.getUser()

		} catch (err) {
			this.setState({
				processing: false
			})
			console.log(err)
			return err
		}
	}
	removeFromList = (cardId) => {

		const newCardsToAddArray = this.state.cardsToAdd;

		const index = this.state.cardsToAdd.findIndex( (card) => card.id === cardId);

		newCardsToAddArray.splice(index, 1);

		this.setState({
			cardsToAdd: newCardsToAddArray
		})

		// this should work, regardless of whether EVT carries through: 
		document.getElementById(cardId).style.display = "block";
	}
	passResultsUp = (results) => {
		this.setState({
			upResults: results
		})
	}
	authenticate = () => {
		if (!this.props.authData.loggedIn) {
			this.props.setLogOut();
			this.props.history.push("/auth");
			return false
		} else {
			return true
		}
	}
	getUser = async () => {
		// get info about USER: 
		try {

			this.setState({
				processing: true
			})

			const URL = process.env.REACT_APP_SERVER_URL + "user/" + this.state.userId;

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

			let cardpoolData = [];

			if (user.data.cardpool) {
				cardpoolData = user.data.cardpool
			}

			const currResults = this.state.upResults;

			this.setState({
				decks: user.data.decks,
				cardpool: cardpoolData,
				faveCards: user.data.faveCards,
				hiddenCards: user.data.hiddenCards,
				upResults: currResults,
				processing: false
			})

		} catch (err) {
			this.setState({
				processing: false
			})
			alert("Error - failed to load user data");
			this.props.setLogOut();
			this.props.history.push("/auth")
		}	
	}
	async componentDidMount(){
		try {

			if(!this.authenticate()) {
				return
			};

			// get rid of footer
			document.querySelector("footer").style.display = "none";

			await this.getUser();

		} catch (err) {
			console.log(err);
			return err	
		}

	}
	render(){

		const authData = {
			loggedIn: this.state.loggedIn,
			loggedInAs: this.state.loggedInAs,
			userId: this.state.userId,
		}

		// get the "priors" -- the ids for all cards that need to be displayed differently 
		const cardpoolPriors = this.state.cardpool.map( (card) => {
			return card.data.id
		})

		const cardAddPriors = this.state.cardsToAdd.map ((card) => {
			return card.id
		})

		const priors = cardpoolPriors.concat(cardAddPriors);


		let procStyle = null;

		if (this.state.processing) {
			procStyle = {
				opacity: "0.3",
				zIndex: "-1"
			}
		}

		return (
			<div id="dashboard" style={procStyle}>
				<div className="leftDash">
					<UserNav />
					<div className="innerLeftDash">
						<Search passResultsUp={this.passResultsUp} authData={authData} viewBtns={true} viewLow={false} priors={priors} addToCardSheet={this.addToCardSheet} />
					</div>
				</div>
				<div className="rightDash">
					<h4> &nbsp; &nbsp; Add to Your CardPool </h4>
					{ this.state.cardsToAdd && this.state.cardsToAdd.length > 0 ? <CardSheet short={true} addToCardpool={this.addToCardpool} removeFromList={this.removeFromList} viewBtns={false} searched={true} cards={this.state.cardsToAdd} viewCard={null} /> : null }
				</div> 
			</div>
		)
	}
}

export default Dashboard;