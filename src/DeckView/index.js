import React from "react";
import CardSheet from "../CardSheet";
import DeckCardDisplay from "../DeckCardDisplay";

const DeckView = (props) => {

	console.log("DECKVIEW PROPS: ", props);

	return (
		<div> 
			{ props.clearDeck ? <button onClick={props.clearDeck.bind(this, props.deck._id)}>CLOSE</button> : null }
			<h4> &nbsp; &nbsp; {props.deck.name} </h4>
			{ props.clearDeck ? <button onClick={props.clearDeck.bind(this, props.deck._id)}>CLOSE</button> : null }
		</div>
	)
}

export default DeckView;

// <DeckCardDisplay getUser={props.getUser} authData={props.authData} deck={props.deck} removeFromDeck={props.removeFromDeck} clearDeck={props.clearDeck} />
