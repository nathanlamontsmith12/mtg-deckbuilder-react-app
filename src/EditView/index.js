import React, { Component } from "react";

const EditView = (props) => {

	let viewReturn = null;

	if (props.view) {
		viewReturn = 
			<div>
				<br />
				<br />
				<button onClick={props.defaultView.bind(this, props.view.id)}>CLOSE</button> <br />
				<img alt={props.view.name} src={props.view.imageUrl} />
				<br />
				<button onClick={props.deleteCard.bind(this, props.view.id)}>DELETE</button> 
			</div>
	}

	return (
		<div>
			{ viewReturn ? viewReturn : null }
		</div>
	)
}

export default EditView;


// props.view -->
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

