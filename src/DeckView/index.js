import React from "react";
import CardSheet from "../CardSheet";

const DeckView = (props) => {

	const cards = props.deck.cards;

// NEED TO INTEGRATE EDIT FUNCTIONALITY VIA PROPS BOOLEAN

	return (
		<div> 
			{ props.clearDeck ? <button onClick={props.clearDeck.bind(this, props.deck._id)}>CLOSE</button> : null }
			<h4> &nbsp; &nbsp; {props.deck.name} </h4>
			<CardSheet short={true} viewBtns={true} searched={true} cards={props.cards} viewCard={props.viewCard} deckId={props.deck._id} />
			{ props.clearDeck ? <button onClick={props.clearDeck.bind(this, props.deck._id)}>CLOSE</button> : null }
		</div>
	)
}

export default DeckView;