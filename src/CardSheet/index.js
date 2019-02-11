import React from "react";

const CardSheet = (props) => {

	let cards = <p>&nbsp;</p>

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

			return (
				<li key={`card-${i}`}>
					<strong>{card.name}</strong>
					<br /> 
					<button id={`${card.id}`} onClick={props.viewCard.bind(null, card.id)}>View</button>
					<br />
					{colors}
					<br />
					{card.manaCost}
					<br /> 
					{card.type}
					<br />
					{card.setName}
					<br />
					{card.rarity}
					{ creatureStrength ? <div>{creatureStrength} </div> : null}
					<br />
					{card.text}
					<br />
					<br />
				</li>
			)
		})
	}

	return (
		<div>
			<ul>
				{ props.searched ? cards : null }
			</ul>
		</div>
	)
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