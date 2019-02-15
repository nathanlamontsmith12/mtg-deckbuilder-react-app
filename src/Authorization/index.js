import React, { Component } from "react";
import LoginForm from "../LoginForm";

class Authorization extends Component {
	constructor (props) {
		super();
		this.state = {
			loggedIn: props.authData.loggedIn,
			loggedInAs: props.authData.loggedInAs,
			processing: false,
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
			email: "",
			processing: false
		})
	}
	regView = () => {
		this.setState({
			reg: true,
			inputFailMessage: "",
			username: "",
			password: "",
			passwordConfirm: "",
			email: "",
			processing: false			
		})
	}
	handleUserInput = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value,
			inputFailMessage: ""
		})
	}
	fail = (failMessage, viewType) => {
		
		let regSet = viewType;

		if(typeof viewType !== "boolean") {
			regSet = false
		}

		let message;

		if (!failMessage) {
			message = ""
		} else {
			message = failMessage
		}

		this.setState({
			reg: regSet,
			inputFailMessage: message,
			username: "",
			password: "",
			passwordConfirm: "",
			email: "",
			processing: false
		})

		this.props.setLogOut();
	}
	success = (username, userId) => {
		
		
		this.setState({
			inputFailMessage: "",
			username: "",
			password: "",
			passwordConfirm: "",
			email: "",
			processing: false
		})

		this.props.setLogIn(username, userId);

		this.props.history.push("/");
	}
	logIn = async () => {
		try {

			// quick user input checking on frontend: 
			if (!this.state.username || !this.state.password) {
				this.fail("Invalid username and/or password", false);
				return
			}

			this.setState({
				processing: true
			})

			// communicate w/ back end; set body, stringify, fetch: 
			const body = {
				username: this.state.username, 
				password: this.state.password
			}

			const bodyString = JSON.stringify(body);

			const URL = process.env.REACT_APP_SERVER_URL + "user/login";

			const response = await fetch(URL, {
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


			// "parsedResponse" is the ID of the user, sent back from server
			if (parsedResponse.data) {
				this.success(this.state.username, parsedResponse.data);
			} else {
				throw Error("Late fail Log In")
			}
		} catch (err) {
			console.log("Error: ", err);
			this.fail("Log In Failed", false);
			return err
		}
	}
	createNewAccount = async () => {
		try {

			// cannot make new account if already logged in: 
			if(this.state.loggedIn || this.state.loggedInAs) {
				this.fail("You must log out before creating a new account", true);
				return
			}

			// quick input checks on frontend: 
			if (!this.state.username || !this.state.password) {
				this.fail("Invalid username and/or password", true);
				return
			} 
		
			if (!this.state.email) {
				this.fail("Invalid email address input", true);
				return
			}

			if (this.state.password !== this.state.passwordConfirm) {
				this.fail("Password must match Password confirmation", true);
				return
			}

			this.setState({
				processing: true
			})

			// Communicate w/ back end -- set body, stringify, fetch: 
			const body = {
				username: this.state.username, 
				password: this.state.password, 
				email: this.state.email,
				registered: Date.now()
			}

			const bodyString = JSON.stringify(body);
			
			const URL = process.env.REACT_APP_SERVER_URL + "user";

			const response = await fetch(URL, {
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

			// "parsedResponse" is the ID of the user, sent back from server
			if (parsedResponse.data) {
				this.success(this.state.username, parsedResponse.data);
			} else {
				throw Error("Late fail account creation")
			}
		
		} catch (err) {
			console.log("Error: ", err);
			this.fail("Failed to Create New Account", true);
			return err
		}
	}
	componentDidMount () {
		document.querySelector("footer").style.display = "flex";
	}
	render(){

		const notLoggedIn =	
			<div>
				{ this.state.inputFailMessage ? <h1> {this.state.inputFailMessage} </h1> : <h1> &nbsp; </h1> }
				{ this.state.reg ? <button onClick={this.loginView}> Log In to Existing Account </button> : <button onClick={this.regView}> Make New Accout </button> }
				{ this.state.processing ? <h2> Logging in.... </h2> : <LoginForm data={this.state} handleUserInput={this.handleUserInput} logIn={this.logIn} createNewAccount={this.createNewAccount} />}
			</div>

		const loggedIn = 
			<div>
				<h2>Logged In</h2>
				<h3> You are logged in as {this.props.authData.loggedInAs} </h3>
			</div>

		return (
			<div>
				<h1> AUTHENTICATION </h1>
				{ this.props.authData.loggedIn ? loggedIn : notLoggedIn }
				<div className="spacerAuth"></div>
			</div>
		)
	}
} 

export default Authorization;