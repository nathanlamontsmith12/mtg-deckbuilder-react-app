import React, { Component } from "react";
import UserNav from "../UserNav";
import CardSheet from "../CardSheet";
import CardView from "../CardView";

class Cards extends Component {
	constructor (props) {
		super();
		this.state={
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			userId: props.authData.userId,
			decks: null,
			cardpool: null,
			faveCards: null,
			hiddenCards: null,
			results: [null],
			query: "",
			view: null
		}
	}
	async componentDidMount(){

		document.querySelector("footer").style.display = "none";

		if (!this.props.authData.loggedIn) {
			this.props.setLogOut();
			this.props.history.push("/auth");
			return
		}

		try {
			const URL = "http://localhost:9000/user/" + this.state.userId;

			console.log(URL);

			const response = await fetch(URL, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (!response.ok) {
				throw Error(response.statusText);
			}

			const user = await response.json()

			console.log(user);

			this.setState({
				decks: user.data.decks,
				cardpool: user.data.cardpool,
				faveCards: user.data.faveCards,
				hiddenCards: user.data.hiddenCards,
			})

		} catch (err) {
			alert("Error - failed to load user data");
			this.props.setLogOut();
			this.props.history.push("/auth")
		}
	}
	render(){
		console.log(this.state);
		return (
			<div id="dashboard">
				<div className="leftDash">
					<UserNav />
					<div className="cardPool">
						<h2> CARDS </h2>
						{ this.state.cardpool ? <CardSheet viewBtns={false} searched={true} cards={this.state.cardpool} viewCard={null} /> : null }
					</div>
				</div>
				<div className="rightDash">
					{ this.state.cardpool ? <CardSheet viewBtns={false} searched={true} cards={this.state.cardpool} viewCard={null} /> : null }
				</div>
			</div>
		)
	}
}

export default Cards;