import React from "react";
import AddToDeck from "../AddToDeck";

const CardSheet = (props) => {
	let cards = <p>&nbsp;</p>

	if (!props.cards) {
		return (<div> </div>)
	} else {

		if (props.cards.length > 0) {
			cards = props.cards.map((card, i)=>{

				let colors = "Colorless";

				if (card.colors.length === 1) {
					colors = card.colors[0];
				}


				if (card.colors.length > 1) {

					colors = "";

					for (let q = 0; q < card.colors.length; q++) {
						colors += card.colors[q];
						if (q < card.colors.length - 1) {
							colors += " / ";
						}
					}
				}


				let creatureStrength = "";

				if (card.power && card.toughness) {
					creatureStrength = `Power: ${card.power} / Toughness: ${card.toughness}`
				}

				const cardDetail = <div>{colors}<br />{card.manaCost}<br /> {card.type}<br />{card.setName}<br />{card.rarity}{ creatureStrength ? <div>{creatureStrength} </div> : null}<br />{card.text}<br /><br /></div>

				let idName = card.id;

				if (props.short) {
					idName = "short-" + card.id;
				}

				// check if card is already in the User's cardpool: 
				let include = true;

				if (props.priors) {
					if (props.priors.includes((card.id)) ) {
						include = false
					}
				}


				let onClickForViewButtons = () => {};


				if (props.viewBtns) {
					
					onClickForViewButtons = props.viewCard.bind(null, card.id);

					if (props.deckId) {
						onClickForViewButtons = props.viewCard.bind(null, card.id, props.deckId);
					}
				}


				let showDeckList = false;

				if (props.deckList) {
					if (props.deckList.length > 0) {
						showDeckList = true;
					}
				}

				if (props.cardpoolDash) {
					return (
						<li className="listCardCon" key={`card-${i}`} id={idName} >
							<div className="separate">
								<span><strong>{card.name}</strong></span>
								<span><strong>{card.manaCost}</strong></span>
							</div>
							<div className="separate">
								{ props.viewBtns ? <button onClick={onClickForViewButtons}>View</button> : null}
								{ showDeckList ? <AddToDeck deckList={props.deckList} addToDeck={props.addToDeck} cardApid={card.id} /> : null }
								{ props.deleteCard ? <button onClick={props.deleteCard.bind(this, card.id)}>Delete</button> : null }
							</div>
						</li>
					)
				} else {
					return (
						<li className="listCardCon" key={`card-${i}`} id={idName} >
							<strong>{card.name}</strong>
							<br /> 
							{ props.viewBtns ? <button onClick={onClickForViewButtons}>View</button> : null}
							{ props.deleteCard ? <button onClick={props.deleteCard.bind(this, card.id)}>Delete</button> : null }
							{ props.addToCardSheet && include ? <button id={`addBtn-${card.id}`} onClick={props.addToCardSheet.bind(this, card.id)}> Add </button> : null }
							{ props.addToCardSheet && !include ? <button disabled={true}> Add </button> : null }
							{ props.removeFromList ? <button id={`removeBtn-${card.id}`} onClick={props.removeFromList.bind(this, card.id)}> Remove </button> : null }
							{ props.viewBtns ? <br /> : null}
							{ props.short ? null : cardDetail }
						</li>
					)
				}
			})
		}
		return (
			<div>
				<ul className = "cardSheet">
					{ props.searched ? cards : null }
				</ul>
				{ props.addToCardpool ? <button onClick={props.addToCardpool}> Save Your Cards </button> : null }
			</div>
		)	
	}
}

export default CardSheet;

// artist: "Volkan Baga"
// cmc: 5
// colorIdentity: ["W"]
// colors: ["White"]
// flavor: "Every tear shed is a drop of immortality."
// foreignNames: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// id: "57f9ac6c-6f0b-5a33-874d-8dcd0e69ae9e"
// imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129465&type=card"
// layout: "normal"
// legalities: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// manaCost: "{4}{W}"
// multiverseid: 129465
// name: "Angel of Mercy"
// number: "2"
// originalText: "Flying (This creature can't be blocked except by creatures with flying or reach.)↵When Angel of Mercy comes into play, you gain 3 life."
// originalType: "Creature - Angel"
// power: "3"
// printings: (11) ["10E", "8ED", "9ED", "DDC", "DVD", "IMA", "INV", "P02", "PS11", "PSAL", "S99"]
// rarity: "Uncommon"
// rulings: []
// set: "10E"
// setName: "Tenth Edition"
// subtypes: ["Angel"]
// supertypes: []
// text: "Flying↵When Angel of Mercy enters the battlefield, you gain 3 life."
// toughness: "3"
// type: "Creature — Angel"
// types: ["Creature"]
