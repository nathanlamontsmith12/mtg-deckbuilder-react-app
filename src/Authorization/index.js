import React, { Component } from "react";
import LoginForm from "../LoginForm";

class Authorization extends Component {
	constructor(){
		super();
		this.state = {
			inputFailMessage: "",
			loggedIn: false,
			loggedInAs: "",
			reg: false,
			username: "",
			password: "",
			passwordConfirm: "",
			email: ""
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
	logIn = () => {
		if (!this.state.username || !this.state.password) {
			this.setState({
				inputFailMessage: "Invalid Username and/or Password",
				loggedIn: false,
				loggedInAs: "",
				username: "",
				password: "",
				passwordConfirm: "",
				email: ""
			})
			return
		}

		// communicate w/ back end 
			// CODE 

		// set frontend state to logged in
		this.setLogIn()
	}
	createNewAccount = () => {
		if (!this.state.username || !this.state.password) {
			this.setState({
				inputFailMessage: "Invalid Username and/or Password", 
				loggedIn: false,
				loggedInAs: "",
				username: "",
				password: "",
				passwordConfirm: "",
				email: ""
			})
			return
		} 
		if (!this.state.email) {
			this.setState({
				inputFailMessage: "Invalid Email Address",
				loggedIn: false,
				loggedInAs: "",
				username: "",
				password: "",
				passwordConfirm: "",
				email: ""
			})
		}
		if (this.state.password !== this.state.passwordConfirm) {
			this.setState({
				inputFailMessage: "Password Confirmation must match Password",
				loggedIn: false,
				loggedInAs: "",
				username: "",
				password: "",
				passwordConfirm: "",
				email: ""
			})
			return
		}

		// Communicate w/ back end
			// CODE 

		// set frontend state to logged in
		this.setLogIn();
	}
	setLogIn = () => {
		const currentUser = this.state.username 

		this.setState({
			loggedIn: true,
			loggedInAs: currentUser,
			username: "",
			password: "",
			passwordConfirm: "",
			email: ""
		})
	}
	render(){

		console.log(this.state);

		const notLoggedIn =	
			<div>
				{ this.state.inputFailMessage ? <h1> {this.state.inputFailMessage} </h1> : <h1> &nbsp; </h1> }
				{ this.state.reg ? <button onClick={this.loginView}> Already Have Account? </button> : <button onClick={this.regView}> Make New Accout </button> }
				<LoginForm data={this.state} handleUserInput={this.handleUserInput} logIn={this.logIn} createNewAccount={this.createNewAccount}/>
			</div>

		const loggedIn = 
			<div>
				<h1>Logged In</h1>
				<h3>You are logged in as {this.state.loggedInAs} </h3>
			</div>

		return (
			<div>
				{ this.state.loggedIn ? loggedIn : notLoggedIn }
			</div>
		)
	}
} 

export default Authorization;