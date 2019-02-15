import React from "react";

const LoginForm = (props) => {

	const reg = props.data.reg;

	const regForm = 
		<div>
			<h2>NEW ACCOUNT</h2>
			<form />
				<input type="text" name="username" value={props.data.username} onChange={props.handleUserInput} placeholder="Username" />
				<br />
				<input type="email" name="email" value={props.data.email} onChange={props.handleUserInput} placeholder="Email" />
				<br />
				<input type="password" name="password" value={props.data.password} onChange={props.handleUserInput} placeholder="Password" />
				<br />
				<input type="password" name="passwordConfirm" value={props.data.passwordConfirm} onChange={props.handleUserInput} placeholder="Confirm password" />
				<br />
				<button onClick={props.createNewAccount}> New Account </button>
			<form />
		</div>

	const logForm = 
		<div>
			<h2>LOG IN</h2>
			<input type="text" name="username" value={props.data.username} onChange={props.handleUserInput} placeholder="Enter your username" /> 
			<br />
			<input type="password" name="password" value={props.data.password} onChange={props.handleUserInput} placeholder="Enter your password" /> 
			<br />
			<button onClick={props.logIn}> Log In </button>
		</div>

	return (
		<div>
			{ reg ? regForm : logForm }
		</div>
	)
}

export default LoginForm;