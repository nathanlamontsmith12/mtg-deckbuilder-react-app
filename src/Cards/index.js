import React, { Component } from "react";
import UserNav from "../UserNav";
import CardSheet from "../CardSheet";
import CardView from "../CardView";
import EditView from "../EditView";

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
			view: cardToView.data
		})
	}
	deleteCard = (id) => {
		// REMOVE card entirely from the User's data 
		console.log("DELETE CARD: ", id) 
		// REMEMBER to set state so that card is removed 
		// AND to set it to "default" (null) view 
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

		const cards = this.state.cardpool.map((card)=>{
			return card.data
		})

		const cardsToEdit = this.state.cardsToAdd.map((card)=>{
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
						<h2> YOUR CARDPOOL </h2>
						{ this.state.cardpool ? <CardSheet deleteCard={this.deleteCard} short={true} viewBtns={true} searched={true} cards={cards} viewCard={this.viewCard} /> : null }
					</div>
				</div>
				<div className="rightDash">
					<EditView deleteCard={this.deleteCard} defaultView={this.defaultView} view={this.state.view} />
				</div>
			</div>
		)
	}
}
// { this.state.view ? <CardView defaultView={this.defaultView} view={this.state.view} authData={authData} viewLow={false} /> : null }
export default Cards;