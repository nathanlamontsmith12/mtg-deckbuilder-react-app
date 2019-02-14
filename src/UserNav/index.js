import React from "react";
import { Link } from "react-router-dom";

const UserNav = (props) => {
	return (
		<div className="userNav">
			<Link to="/"><div className="divBtn">
				Search
			</div></Link>
			<Link to="/cards"><div className="divBtn">
				CardPool
			</div></Link>
			<Link to="/decks"><div className="divBtn">
				Decks
			</div></Link>				
		</div>
	)
}

export default UserNav;