import React, { Component } from "react";
import LoginForm from "../LoginForm";

class Authorization extends Component {
	constructor (props) {
		super();
		this.state = {
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			inputFailMessage: "",
			username: "",
			password: "",
			passwordConfirm: "",
			email: "",
			reg: false
		}
	}
	loginView = () => {
		this.setState({
			reg: false,
			inputFailMessage: "",
			username: "",
			password: "",
			passwordConfirm: "",
			email: ""
		})
	}
	regView = () => {
		this.setState({
			reg: true,
			inputFailMessage: "",
			username: "",
			password: "",
			passwordConfirm: "",
			email: ""			
		})
	}
	handleUserInput = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value
		})
	}
	fail = (failMessage) => {
		
		let message;

		if (!failMessage) {
			message = ""
		} else {
			message = failMessage
		}

		this.setState({
			inputFailMessage: message,
			username: "",
			password: "",
			passwordConfirm: "",
			email: ""
		})

		this.props.setLogOut();
	}
	success = (username) => {
		
		this.props.setLogIn(username);
		
		this.setState({
			inputFailMessage: "",
			username: "",
			password: "",
			passwordConfirm: "",
			email: ""
		})
	}
	logIn = async () => {
		try {

			// quick user input checking on frontend: 
			if (!this.state.username || !this.state.password) {
				this.fail("Invalid username and/or password");
				return
			}

			// communicate w/ back end; set body, stringify, fetch: 
			const body = {
				username: this.state.username, 
				password: this.state.password
			}

			const bodyString = JSON.stringify(body);

			const response = await fetch("http://localhost:9000/user/login", {
				method: "POST",
				body: bodyString,
				credentials: "include",
				headers: {
					"Content-Type": "application/json"					
				}
			})
			

			// set frontend state to logged in, if everything checks out 
			if(!response.ok) {
				throw Error(response.statusText)
			} 

			const parsedResponse = await response.json();

			console.log(parsedResponse);

			if (parsedResponse.data) {
				console.log("LOG IN SUCCESSFUL");
				this.success(this.state.username);
			} else {
				throw Error("Late fail Log In")
			}
		} catch (err) {
			console.log(err);
			this.fail("Log In Failed");
			return err
		}
	}
	createNewAccount = async () => {
		try {

			// quick input checks on frontend: 
			if (!this.state.username || !this.state.password) {
				this.fail("Invalid username and/or password");
				return
			} 
		
			if (!this.state.email) {
				this.fail("Invalid email address input");
				return
			}

			if (this.state.password !== this.state.passwordConfirm) {
				this.fail("Password must match Password confirmation");
				return
			}


			// Communicate w/ back end -- set body, stringify, fetch: 
			const body = {
				username: this.state.username, 
				password: this.state.password, 
				email: this.state.email,
				registered: Date.now()
			}

			const bodyString = JSON.stringify(body);
			
			const response = await fetch("http://localhost:9000/user", {
				method: "POST",
				body: bodyString,
				credentials: "include",
				headers: {
					"Content-Type": "application/json"					
				}
			})

			// set frontend state to logged in if everything checks out 
			if(!response.ok) {
				throw Error(response.statusText)
			} 

			const parsedResponse = await response.json();

			console.log(parsedResponse);

			if (parsedResponse.data) {
				console.log("ACCOUNT CREATION AND LOG IN SUCCESSFUL");
				this.success(this.state.username);
			} else {
				throw Error("Late fail account creation")
			}
		
		} catch (err) {
			console.log(err);
			this.fail("Failed to Create New Account");
			return err
		}
	}
	render(){

		const notLoggedIn =	
			<div>
				{ this.state.inputFailMessage ? <h1> {this.state.inputFailMessage} </h1> : <h1> &nbsp; </h1> }
				{ this.state.reg ? <button onClick={this.loginView}> Already Have Account? </button> : <button onClick={this.regView}> Make New Accout </button> }
				<LoginForm data={this.state} handleUserInput={this.handleUserInput} logIn={this.logIn} createNewAccount={this.createNewAccount}/>
			</div>

		const loggedIn = 
			<div>
				<h1>Logged In</h1>
				<h3> You are logged in as {this.props.authData.loggedInAs} </h3>
			</div>

		return (
			<div>
				{ this.props.authData.loggedIn ? loggedIn : notLoggedIn }
			</div>
		)
	}
} 

export default Authorization;