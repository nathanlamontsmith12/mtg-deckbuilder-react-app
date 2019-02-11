import React from "react";

const CardView = (props) => {

	let yPos = 140 
	// + Math.floor(window.scrollY);

	yPos = yPos.toString();

	const style = {
		marginTop: yPos + "px"
	}

	return (
		<div id="MTG-card-view" style={style}>
			<div>
				<img alt={props.view.name} src={props.view.url} />
				<button onClick={props.defaultView.bind(this, props.view.id)}>Close</button> 
			</div>
		</div>
	)
}

export default CardView;