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
			view: null,
			cardsToAdd: [],
			decks: [],
			cardpool: [],
			faveCards: [],
			hiddenCards: [],
		}
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
	addToCardSheet = (cardId) => {

		const cardToAdd = this.state.cardpool.find( (card) => {
			if (card.data.id === cardId) {
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

			const adjId = "short-" + cardId;

			// this should work, regardless of whether EVT gets carried through: 
			document.getElementById(adjId).style.display = "none"

		} else {
			console.log("ERROR -- card not added");
			return
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
	defaultView = (divId) => {

		// adjust for fact that these divs have the ID "short-" + id: 

		const adjId = "short-" + divId;
		// reset opacity to 1 for the div of viewed card: 

		const thisDiv = document.getElementById(adjId);

		thisDiv.style.opacity = "1";

		this.setState({
			view: null
		})
	}
	viewCard = (id) => {

		// adjust for the fact that these divs have ids of the form "short-" + cardId: 

		const adjId = "short-" + id;

		// if there was a previous viewed card, reset its div to opacity 1: 

		if (this.state.view) {
			const adjId2 = "short-" + this.state.view.id;
			const lastDiv = document.getElementById(adjId2)
			lastDiv.style.opacity = "1" 
		}

		// find card to view: 

		const cardToView = this.state.cardpool.find((card)=>{
			if (card.data.id === id) {
				return true
			} else {
				return false
			}
		})

		// make div opaque -- div ID was set to Card ID so this is easy to find: 

		const thisDiv = document.getElementById(adjId);

		thisDiv.style.opacity = "0.3";

		this.setState({
			view: {name: cardToView.data.name, url: cardToView.data.imageUrl, id: id}
		})
	}
	getUser = async () => {
		// get info about USER: 
		try {

			const URL = "http://localhost:9000/user/" + this.state.userId;

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
		console.log(this.state);

		const cards = this.state.cardpool.map((card)=>{
			return card.data
		})

		const authData = {
			loggedIn: this.state.loggedIn,
			loggedInAs: this.state.loggedInAs,
			userId: this.state.userId,
		}

		return (
			<div id="dashboard">
				<div className="leftDash">
					<UserNav />
					<div className="cardPool">
						<h2> CARDS </h2>
						{ this.state.view ? <CardView defaultView={this.defaultView} view={this.state.view} authData={authData} viewLow={false} /> : null }
						{ this.state.cardpool ? <CardSheet priors={this.state.hiddenCards} short={true} addToCardSheet={this.addToCardSheet} viewBtns={true} searched={true} cards={cards} viewCard={this.viewCard} /> : null }
					</div>
				</div>
				<div className="rightDash">
					{ this.state.cardpool ? <CardSheet short={true} viewBtns={false} searched={true} cards={this.cardsToAdd} viewCard={null} removeFromList={this.removeFromList} /> : null }
				</div>
			</div>
		)
	}
}

export default Cards;