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
			origDescription: "",
			processing: false
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
				{ this.state.message ? <h3>{this.state.message}</h3> : <h3>&nbsp;</h3> }
				<form className="newDeckForm">
					<input name="name" value={this.state.name} onChange={this.handleInput} placeholder="Deck Name" /> <br />
					<input name="description_short" value={this.state.description_short} onChange={this.handleInput} placeholder="Short description" /> <br />
					<h4> Long Description: </h4>
					{ this.state.edit ? <p>{this.state.origDescription} </p> : null }
					<textarea cols="32" rows="5" name="description_long" value={this.state.description_long} onChange={this.handleInput}> </textarea> <br />
				</form> <br />
				{ this.state.edit ? <button onClick={this.editDeck}> SAVE CHANGES </button> : <button onClick={this.createDeck}> CREATE NEW DECK </button> }
			</div>
		)
	}
}

export default NewDeck;