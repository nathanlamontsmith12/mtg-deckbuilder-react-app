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
			description_short: "",
			description_long: "",
			message: "",
			origDescription: props.deck.description_long,
			processing: false,
			editName: props.deck.name,
			editDS: props.deck.description_short,
			editLS: ""
		}
	}
	closeOut = () => {
		this.setState({
			name: "",
			description_short: "",
			description_long: "",
			message: "",
			processing: false
		})
		this.props.newDeckModeOff();
	}
	createDeck = async () => {
		try {
			this.setState({
				message: ""
			})
			// save deck in DB, then set deck, then close out

			// but first, check to make sure the name is reasonable: 
			if (!this.state.name || this.state.name.length > 15) {
				this.setState({
					message: "Invalid Deck Name: Empty field, or Over 15 characters",
					name: ""
				})
				return
			} 

			if (this.state.description_short.length > 40) {
				this.setState({
					message: "Invalid Short Description: Over 40 characters",
					name: ""
				})
				return
			} 

			this.setState({
				processing: true
			})

			const URL = process.env.REACT_APP_SERVER_URL + "deck";

			const reqBody = JSON.stringify({
				userId: this.state.userId,
				name: this.state.name,
				description_short: this.state.description_short,
				description_long: this.state.description_long
			})

			const response = await fetch(URL, {
				method: "POST",
				credentials: "include",
				body: reqBody,
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (!response.ok) {
				throw Error(response.statusText);
			}

			const parsedResponse = await response.json();

			const deck = parsedResponse.data;

			// close stuff out 
			this.closeOut();

			this.props.setDeck(deck);

		} catch (err) {
			alert("Error: " + err);

			this.setState({
				processing: false	
			})
			this.props.setLogOut();
			// this.props.history.push("/auth")
		}	
	}

	editDeck = async () => {
		console.log("EDIT DECK FIRED")
		// need to update deck
	}
	handleInput = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
			message: ""
		})
	}
	render(){

		let form = 
			<form className="newDeckForm">
				<input name="name" value={this.state.name} onChange={this.handleInput} placeholder="Deck Name" /> <br />
				<input name="description_short" value={this.state.description_short} onChange={this.handleInput} placeholder="Short description" /> <br />
				<h4> Long Description: </h4>
				{ this.state.edit ? <p>{this.state.origDescription} </p> : null }
				<textarea cols="32" rows="5" name="description_long" value={this.state.description_long} onChange={this.handleInput}> </textarea> <br />
			</form> 

		if (this.props.edit) {
			form = 
				<form className="editDeckForm">
					<input name="editName" value={this.state.editName} onChange={this.handleInput} /> <br />
					<input name="editDS" value={this.state.editDS} onChange={this.handleInput} /> <br />
					<h4 className="LDsubtitle"> Long Description: </h4>
					{ this.state.edit ? <p>{this.state.origDescription} </p> : null }
					<textarea cols="32" rows="5" name="editLS" value={this.state.description_long} onChange={this.handleInput}> </textarea> <br />
				</form> 	
		}
		return (
			<div className="newDeckPage"> 
				{ !this.props.edit ? <br /> : null }
				{ !this.props.edit ? <br /> : null }
				{ !this.props.edit ? <button onClick={this.closeOut}> CLOSE </button> : null }
				{ this.state.edit ? <button onClick={this.editDeck}> SAVE CHANGES </button> : null }
				{ this.props.edit ? <h1> EDIT {this.props.deck.name} </h1> : <h1>NEW DECK</h1>}
				{ this.state.message ? <h3>{this.state.message}</h3> : <h3>&nbsp;</h3> }
				{ form }
				<br />
				{ !this.state.edit ? <button onClick={this.createDeck}> CREATE NEW DECK </button> : null }
			</div>
		)
	}
}

export default NewDeck;