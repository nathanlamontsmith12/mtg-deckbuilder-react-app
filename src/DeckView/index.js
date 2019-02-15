import React from "react";
import CardSheet from "../CardSheet";

const DeckView = (props) => {

	const cards = props.deck.cards;

// NEED TO INTEGRATE EDIT FUNCTIONALITY VIA PROPS BOOLEAN

	return (
		<div> 
			<button onClick={props.clearDeck.bind(this, props.deck._id)}>X</button>
			<h4> &nbsp; &nbsp; {props.deck.name} </h4>
			<CardSheet short={true} viewBtns={true} searched={true} cards={props.cards} viewCard={props.viewCard} deckId={props.deck._id} />
			<button onClick={props.clearDeck.bind(this, props.deck._id)}>CLOSE</button>
		</div>
	)
}

export default DeckView;