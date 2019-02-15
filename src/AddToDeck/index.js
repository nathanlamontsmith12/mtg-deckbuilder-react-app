import React, { Component } from "react";

class AddToDeck extends Component {
	constructor(props) {
		super();
		this.state = {
			decks: props.deckList,
			targetDeckId: "",
			thisCard: props.cardApid
		}
	}
	handleSubmit = (evt) => {

		evt.preventDefault();

		if (!this.state.targetDeckId) {
			return 
		}

		const targetDeckId = this.state.targetDeckId;

		this.setState({
			targetDeckId: ""
		})

		this.props.addToDeck(targetDeckId, this.state.thisCard);
	}
	handleChange = (evt) => {
		this.setState({
			targetDeckId: evt.currentTarget.value
		})
	}
	render(){

		const dropdownDecks = this.state.decks.map( (deck)=>{
			return <option value={deck._id} key={deck._id}> {deck.name} </option>
		})

		return(
			<form onSubmit={this.handleSubmit}>
				<small><span>Add to: &nbsp; </span></small>
				<select value={this.state.targetDeckId} onChange={this.handleChange}>
					<option></option>
					{ dropdownDecks }
				</select>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}

export default AddToDeck;

// <AddToDeck deckList={props.deckList} addToDeck={props.addToDeck} cardId={card._id} 