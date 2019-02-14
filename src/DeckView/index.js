import React from "react";
import CardSheet from "../CardSheet";

const DeckView = (props) => {

	const cards = props.deck.cards;


	return (
		<div> 
			<CardSheet short={true} viewBtns={true} searched={true} cards={props.cards} viewCard={props.viewCard} deckId={props.deck._id} />
		</div>
	)
}

export default DeckView;