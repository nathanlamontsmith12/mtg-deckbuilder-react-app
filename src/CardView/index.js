import React from "react";

const CardView = (props) => {

	return (
		<div className="cardViewOuter">
			<div className="cardViewInner">
				<img alt={props.view.name} src={props.view.url} />
				<button onClick={props.defaultView.bind(this, props.view.id)}>Close</button> 
			</div>
		</div>
	)
}

export default CardView;