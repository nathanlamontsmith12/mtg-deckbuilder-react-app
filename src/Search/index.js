import React, { Component } from "react";
import CardSheet from "../CardSheet";

class Search extends Component {
	constructor(props){
		super();
		this.state = {
			results: "",
			searching: false,
			searched: false,
			query: ""
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

			this.setState({
				searching: false,
				searched: true,
				results: cardsParsed
			})
		} catch (err) {
			console.log(err);
			return err;
		}
	}
	render(){
		return(
			<div>
				<h1>SEARCH FOR CARDS BY NAME</h1>
				<input name="query" value={this.state.query} onChange={this.handleQueryInput} />
				<br />
				<button onClick={this.submitSearch}>Search</button>
				<CardSheet results={this.state.results} searched={this.state.searched} />
			</div>
		)
	}
}

export default Search;