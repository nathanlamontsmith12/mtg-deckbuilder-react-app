import React from "react";

const DeckCardDisplay = (props) => {

	console.log("target: ", props.deck.cards[0].data);

	const displayCards = props.deck.cards.map( (item) => {
		console.log(item);
		return (
			<li key={item._id} >
				<h4> {item.data.name} </h4>
				<button onClick={props.removeFromDeck.bind(this, props.deck._id, item._id)}> REMOVE FROM DECK </button>
			</li>
		)
	})

	return (
		<div>
			<ul>
				{ displayCards }
			</ul>
		</div>
	)

}

export default DeckCardDisplay;


	// removeFromDeck = (deckId, cardId) => {
	// 	// OK
	// }
	// <DeckView 
	// removeFromDeck={this.removeFromDeck} 
	// authData={authData} getUser={this.getUser} deck={this.state.thisDeck} 
	// clearDeck={this.clearDeck } edit={true} />
