import React, { Component } from "react";
import CardSheet from "../CardSheet";
import CardView from "../CardView"

class Search extends Component {
	constructor(props){
		super();
		this.state = {
			results: null,
			searching: false,
			searched: false,
			query: "",
			view: null
		}
	}
	handleQueryInput = (evt) => {
		this.setState({
			query: evt.currentTarget.value
		})
	}
	submitSearch = async (evt) => {

		const queryName = this.state.query;

		await this.setState({
			searching: true,
			query: ""
		})

		const cardQueryObject = {
			name: queryName
		}

		this.getCards(cardQueryObject);
	}
	defaultView = (btnId) => {

		// reset opacity to 1 of the button: 

		const thisButton = document.getElementById(btnId);

		thisButton.style.opacity = "1";

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
			console.log(err);
			return err;
		}
	}
	viewCard = (id) => {

		// if there was a previous viewed card, reset its view button to opacity 1: 

		if (this.state.view) {
			const lastBtn = document.getElementById(this.state.view.id)
			lastBtn.style.opacity = "1" 
		}

		// find card to view: 

		const cardToView = this.state.results.find((card)=>{
			if (card.id === id) {
				return true
			} else {
				return false
			}
		})

		// make button opaque -- button ID was set to Card ID so this is easy to find: 

		const thisButton = document.getElementById(id);

		thisButton.style.opacity = "0.3";

		this.setState({
			view: {name: cardToView.name, url: cardToView.imageUrl, id: id}
		})
	}
	render(){
		return(
			<div>
				{ this.state.view ? <CardView defaultView={this.defaultView} view={this.state.view} /> : null }
				<h1>SEARCH FOR CARDS BY NAME</h1>
				<input name="query" value={this.state.query} onChange={this.handleQueryInput} />
				<br />
				<button onClick={this.submitSearch}>Search</button>
				{ this.state.results ? <CardSheet cards={this.state.results} searched={this.state.searched} viewCard={this.viewCard} /> : null }
			</div>
		)
	}
}

export default Search;