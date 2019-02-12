import React, { Component } from "react";
import CardSheet from "../CardSheet";
import CardView from "../CardView"

class Search extends Component {
	constructor(props){
		super();
		this.state = {
			viewLow: props.viewLow,
			viewBtns: props.viewBtns,
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			results: null,
			searching: false,
			searched: false,
			query: "",
			view: null,
		}
	}
	handleQueryInput = (evt) => {
		this.setState({
			query: evt.currentTarget.value
		})
	}
	submitSearch = async (evt) => {

		const queryName = this.state.query;

		// if cardview modal is active, reset opacity to 1 
		if (this.state.view) {
			const lastDiv = document.getElementById(this.state.view.id)
			lastDiv.style.opacity = "1" 
		}

		await this.setState({
			view: null,
			searching: true,
			searched: false,
			query: ""
		})

		const cardQueryObject = {
			name: queryName
		}

		this.getCards(cardQueryObject);
	}
	defaultView = (divId) => {

		// reset opacity to 1 for the div of viewed card: 

		const thisDiv = document.getElementById(divId);

		thisDiv.style.opacity = "1";

		this.setState({
			view: null
		})
	}
	getCards = async (query) => {
		try{

			const queryString = JSON.stringify(query);

			const response = await fetch("http://localhost:9000/search/cards/name", {
				method: "POST",
				body: queryString,
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if(!response.ok) {
				throw Error(response.statusText)
			}

			const responseParsed = await response.json();

			const cardsParsed = await JSON.parse(responseParsed.data.text);

			const newCardArray = cardsParsed.cards.filter((card)=>{
				if (card.imageUrl) {
					return true
				} else {
					return false
				}
			})

			this.setState({
				searching: false,
				searched: true,
				results: newCardArray
			})
		} catch (err) {
			alert("Error: Search Failed");
			console.log(err);
			this.setState({
				loggedIn: this.props.authData.loggedIn,
				loggedInAs: this.props.authData.loggedInAs,
				results: null,
				searching: false,
				searched: false,
				query: "",
				view: null	
			})
			return err;
		}
	}
	viewCard = (id) => {

		// if there was a previous viewed card, reset its div to opacity 1: 

		if (this.state.view) {
			const lastDiv = document.getElementById(this.state.view.id)
			lastDiv.style.opacity = "1" 
		}

		// find card to view: 

		const cardToView = this.state.results.find((card)=>{
			if (card.id === id) {
				return true
			} else {
				return false
			}
		})

		// make div opaque -- div ID was set to Card ID so this is easy to find: 

		const thisDiv = document.getElementById(id);

		thisDiv.style.opacity = "0.3";

		this.setState({
			view: {name: cardToView.name, url: cardToView.imageUrl, id: id}
		})
	}
	render(){

		const authData = {
			loggedIn: this.state.loggedIn,
			loggedInAs: this.state.loggedInAs,
		}

		const searchBar = 
			<div>
				<h1>SEARCH FOR CARDS BY NAME</h1>
				<input name="query" value={this.state.query} onChange={this.handleQueryInput} />
				<button onClick={this.submitSearch}>Search</button>
				<br />
			</div>

		const searching = 
			<div>
				<h1>SEARCHING.... </h1>
				<input hidden name="query" value={this.state.query} onChange={this.handleQueryInput} />
				<button hidden onClick={this.submitSearch}>Search</button>
				<br />
			</div>

		return(
			<div>
				{ this.state.view ? <CardView defaultView={this.defaultView} view={this.state.view} authData={authData} viewLow={this.state.viewLow} /> : null }
				{ this.state.searching ? searching : searchBar}
				{ this.state.results ? <CardSheet viewBtns={this.state.viewBtns} cards={this.state.results} searched={this.state.searched} viewCard={this.viewCard} /> : null }
			</div>
		)
	}
}

export default Search;