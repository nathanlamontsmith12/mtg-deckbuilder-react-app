import React from "react";

const DeckList = (props) => {

	let decks = <div></div>

	if (props.decks && props.decks.length > 0) {
		decks = props.decks.map((deck)=>{
			return(
				<li key={deck._id} id={deck._id} className="deckListItem">
					<h4>{deck.name}</h4>
					<button onClick={props.viewDeck.bind(this, deck._id) }> VIEW </button> &nbsp; &nbsp; 
					<button onClick={props.editDeck.bind(this, deck._id) }> EDIT </button> <br />
					<span>{ deck.description_short }</span>
				</li>
			)
		})
	}

	return (
		<div className="deckListCon">
			<ul className="deckList">
				{ decks }
			</ul>
		</div>
	)
}

// <DeckList decks={this.decks} viewDeck={this.viewDeck} editDeck={this.editDeck} />

export default DeckList;