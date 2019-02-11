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
			inputFailMessage: ""
		})
	}
	regView = () => {
		this.setState({
			reg: true,
			inputFailMessage: ""
		})
	}
	handleUserInput = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value
		})
	}
	logIn = () => {

	}
	createNewAccount = () => {
		if (!this.state.username || !this.state.password) {
			this.setState({
				inputFailMessage: "Invalid Username and/or Password"
			})
			return
		} 
		if (this.state.password === this.state.passwordConfirm) {
			this.setState({
				inputFailMessage: "Password Confirmation must match Password"
			})
			return
		}
		this.setState({

		})
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