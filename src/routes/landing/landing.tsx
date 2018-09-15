import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style';

const _Landing = (props: any) => (
	<div className="landing">
		<div>
			<h1 onClick={props.fetchCharacter}>Landing page {props.character}</h1>
			<Link to="/home"><h4>Continue to Potifarfar »</h4></Link>
			<input type="text" value={props.character} onChange={(e: any) => props.updateCharacter(e.target.value)}/>
		</div>
	</div>
);

const mapStateToProps = (state: any) => ({
	character: state.landing.character
});

const mapStateToDispatch = (dispatch: any) => ({
	fetchCharacter: (id: any) => dispatch({ type: 'fetch-character', payload: { id } }),
	updateCharacter: (name: string) => dispatch({ type: 'update-character', payload: { name } })
});


export const Landing = connect(mapStateToProps, mapStateToDispatch)(_Landing);