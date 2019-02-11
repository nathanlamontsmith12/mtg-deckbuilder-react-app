import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {

	return (
		<header>
			<h1> Header </h1>
				{ props.authData.loggedIn ? <p>Logged in as {props.authData.loggedInAs}</p> : <p> &nbsp; </p> }
			<nav>
				{ props.authData.loggedIn ? <Link onClick={props.setLogOut} to="/auth"> Logout </Link> : <Link to="/auth">Login / Sign up</Link> }
				<br />
				<Link to="/">Search</Link>
			</nav>
		</header>
	)
}

export default Header;