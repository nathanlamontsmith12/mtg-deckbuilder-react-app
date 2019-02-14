import React, { Component } from "react";

class NewDeck extends Component {
	constructor(props){
		super();
		this.state={
			edit: props.edit,
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			userId: props.authData.userId,
			name: "",
			shortDescription: "",
			longDescription: "",
			message: "",
			origDescription: ""
		}
	}
	closeOut = () => {
		this.setState({
			name: "",
			shortDescription: "",
			longDescription: "hey",
			message: ""
		})
		this.props.newDeckModeOff();
	}
	createDeck = async () => {
		this.setState({
			message: ""
		})
		// save deck in DB, then set deck, then close out

		// POST request to deck 

		// this.props.setDeck(deck);
		// this.closeOut();
	}
	editDeck = async () => {

	}
	handleInput = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
			message: ""
		})
	}
	componentDidMount(){
		if (this.props.edit) {
			// SET A BUNCH OF THE STUFF 
		}
	}
	render(){
		return (
			<div className="newDeckPage"> 
				<br />
				<br />
				<button onClick={this.closeOut}> CLOSE </button> <br />
				<h1>NEW DECK</h1>
				<form className="newDeckForm">
					<input name="name" value={this.state.name} onChange={this.handleInput} placeholder="Deck Name" /> <br />
					<input name="shortDescription" value={this.state.shortDescription} onChange={this.handleInput} placeholder="Short description" /> <br />
					<h4> Long Description: </h4>
					{ this.state.edit ? <p>{this.state.origDescription} </p> : null }
					<textarea cols="32" rows="5" name="longDescription" value={this.state.longDescription} onChange={this.handleInput}> </textarea> <br />
				</form> <br />
				{ this.state.edit ? <button onClick={this.editDeck}> SAVE CHANGES </button> : <button onClick={this.createDeck}> CREATE NEW DECK </button> }
			</div>
		)
	}
}

export default NewDeck;