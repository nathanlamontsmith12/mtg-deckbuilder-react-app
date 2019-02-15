import React, { Component } from "react";
import UserNav from "../UserNav";
import DeckList from "../DeckList";
import DeckView from "../DeckView";
import CardSheet from "../CardSheet";
import NewDeck from "../NewDeck";
import CardView from "../CardView";


class Decks extends Component {
	constructor (props) {
		super();
		this.state={
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			userId: props.authData.userId,
			view: null,
			cardsToAdd: [],
			decks: [],
			new: false,
			edit: false,
			cardpool: [],
			faveCards: [],
			hiddenCards: [],
			thisDeck: null,
			thisDeckName: null,
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
	authenticate = () => {
		if (!this.props.authData.loggedIn) {
			this.props.setLogOut();
			this.props.history.push("/auth");
			return false
		} else {
			return true
		}
	}
	clearEdit = () => {
		this.setState({
			edit: false,
			thisDeck: null
		})

		this.getUser();
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
	viewCard = (id, deckId) => {

		// adjust for the fact that these divs have ids of the form "short-" + cardId: 

		const adjId = "short-" + id;

		// if there was a previous viewed card, reset its div to opacity 1: 

		if (this.state.view) {
			const adjId2 = "short-" + this.state.view.id;
			const lastDiv = document.getElementById(adjId2)
			lastDiv.style.opacity = "1" 
		}

		// find card to view: 

		const deckWithCard = this.state.decks.find((deck)=>{
			if (deck._id.toString() === deckId) {
				return true
			} else {
				return false
			}
		})

		const cardToView = deckWithCard.find((card)=>{
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
	defaultView = (divId) => {

		// reset opacity to 1 for the div of viewed card: 

		const thisDiv = document.getElementById(divId);

		thisDiv.style.opacity = "1";

		this.setState({
			view: null
		})
	}
	deleteCard = async (apid) => {

		try {

			this.setState({
				processing: true
			})

			// find card: 
			const cardToRemove = this.state.cardpool.find((card)=>{
				if (card.apid === apid) {
					return true
				} else {
					return false
				}
			})

			// send it to the server 
			const URL = process.env.REACT_APP_SERVER_URL + "card/remove";

			const reqBody = JSON.stringify({cardToRemove: cardToRemove, userId: this.state.userId}); 

			const response = await fetch(URL, {
				method: "POST",
				credentials: "include",
				body: reqBody,
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (!response.ok) {
				throw Error(response.statusText);
			}

			await this.getUser();

		} catch (err) {
			console.log(err)
			this.setState({
				processing: false	
			})
			return err
		}

		// REMEMBER to set state so that card is removed 
		// AND to set it to "default" (null) view 

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

			this.setState({
				decks: user.data.decks,
				cardpool: cardpoolData,
				faveCards: user.data.faveCards,
				hiddenCards: user.data.hiddenCards,
				processing: false
			})

		} catch (err) {
			alert("Error - failed to load user data");
			this.props.setLogOut();
			this.props.history.push("/auth")
			this.setState({
				processing: false	
			})
		}	
	}
	setDeck = async (deckToSet) => {

		await this.getUser();

		this.setState({
			thisDeck: deckToSet,
			thisDeckName: deckToSet.name,
			edit: false,
			new: false,
			processing: false
		}) 
	}
	newDeckModeOn = () => {
		this.setState({
			new: true
		})
	}
	newDeckModeOff = () => {
		this.setState({
			new: false,
			thisDeck: null,
			edit: false
		})
	}
	viewDeck = (deckId) => {

		// set opacity 1 on previous div IF THERE IS ONE: 
		if (this.state.thisDeck) {
			const lastDiv = document.getElementById(this.state.thisDeck._id);
			lastDiv.style.opacity="1";
		}

		// opacity 0.3 on div: 
		const deckDiv = document.getElementById(deckId);
		deckDiv.style.opacity = "0.3";

		// find deck 
		const deck = this.state.decks.find((deck)=>{
			if (deck._id === deckId) {
				return true
			} else {
				return false 
			}
		})

		//set state to focus on this deck: 

		this.setState({
			thisDeck: deck
		})
	}
	clearDeck = (deckId) => {

		// opacity 1 on div: 
		const deckDiv = document.getElementById(deckId)
		deckDiv.style.opacity = "1"

		this.setState({
			thisDeck: null
		})
	}
	editDeck = (deckId) => {

		// find deck 
		const deck = this.state.decks.find((deck)=>{
			if (deck._id === deckId) {
				return true
			} else {
				return false 
			}
		})

		// set state to focus on deck WITH edit mode active: 
		this.setState({
			thisDeck: deck,
			edit: true
		})
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
	
		// 	const cards = this.state.cardpool.map((card)=>{
		// 	return card.data
		// })

		// const cardsToEdit = this.state.cardsToAdd.map((card)=>{
		// 	return card.data
		// })

		const authData = {
			loggedIn: this.state.loggedIn,
			loggedInAs: this.state.loggedInAs,
			userId: this.state.userId,
		}

		let procStyle = null;

		if (this.state.processing) {
			procStyle = {
				opacity: "0.3",
				zIndex: "-1"
			}
		}

		const newDeckAccess = true;

		// SOME STUFF: could make it false

		console.log(this.state)


		// let list = "Your Decks";

		// if (!this.state.thisDeck && !this.state.new) {
		// 	list = "Your CardPool"
		// }

		const nullDeck = {
			description_short: "",
			description_long: "",
			name: ""
		}

		let display = 
			<div id="dashboard" style={procStyle}>
				<div className="leftDash">
					<UserNav />
					<div className="innerLeftDash"> 
						<h2> YOUR DECKS </h2>
						{ this.state.view ? <CardView defaultView={this.defaultView} view={this.state.view} authData={authData} viewLow={false} /> : null }
						<button onClick={this.newDeckModeOn} > New Deck </button>
						<DeckList decks={this.state.decks} viewDeck={this.viewDeck} editDeck={this.editDeck} />
					</div>
				</div>
				<div className="rightDash">
					{ this.state.thisDeck ? <DeckView deck={this.state.thisDeck} clearDeck={this.clearDeck } /> : null }
				</div>
			</div>


		if (this.state.new) {
			display = 
				<div className="newDeck">
					<NewDeck history={this.props.history} deck={nullDeck} setLogOut={this.props.setLogOut} edit={false} newDeckModeOff={this.newDeckModeOff} setDeck={this.setDeck} authData={authData} />
				</div>
		}

		if (this.state.edit) {
			display = 
				<div id="dashboard" style={procStyle}>
					<div className="leftDash">
						<UserNav />
						<div className="innerLeftDash"> 
							<button onClick={this.clearEdit} > CLOSE </button>
							<h2> { this.state.thisDeck.view } </h2>
							{ <NewDeck clearEdit={this.clearEdit} edit={true} authData={authData} deck={this.state.thisDeck} history={this.props.history} setLogOut={this.props.setLogOut} /> }
						</div>
					</div>
					<div className="rightDash">
						<button onClick={this.clearEdit} > CLOSE </button>
						{ this.state.thisDeck && !this.state.edit ? <DeckView deck={this.state.thisDeck} clearDeck={this.clearDeck } edit={true} /> : null }
						{ this.state.thisDeck && this.state.edit ? <DeckView deck={this.state.thisDeck} edit={true} /> : null }
					</div>
				</div> 
		}

//		{ this.state.view ? <CardView defaultView={this.defaultView} view={this.state.view} authData={authData} viewLow={false} /> : null }

		return (
			<div>
				{ display }
			</div>
		)
	}
}

export default Decks;




		// let display = 
		// 	<div id="dashboard" style={procStyle}>
		// 		<div className="leftDash">
		// 			<UserNav />
		// 			<div className="deckList"> 
		// 				{ this.state.thisDeck ? <h2> {this.state.thisDeckName} </h2> : <h2> {list} </h2> }
		// 				{ newDeckAccess ? <button onClick={this.newDeckModeOn} > New Deck </button> : <button disabled={true}> New Deck </button> }
		// 				{ !this.state.thisDeck && !this.state.new ? <CardSheet deck={true} viewBtns={true} searched={true} cards={this.state.cardpool} viewCard={null} /> : null }
		// 				{ this.state.thisDeck && !this.state.new ? <DeckView /> : null }
		// 			</div>
		// 		</div>
		// 		<div className="rightDash">
		// 			{ this.state.thisDeck ? <CardSheet viewBtns={false} searched={true} cards={this.state.thisDeck} viewCard={null} /> : null }
		// 		</div>
		// 	</div>

		// if (this.state.new) {
		// 	display = 
		// 		<div className="newDeck">
		// 			<NewDeck setLogOut={this.props.setLogOut} edit={false} newDeckModeOff={this.newDeckModeOff} setDeck={this.setDeck} authData={authData} />
		// 		</div>
		// }

