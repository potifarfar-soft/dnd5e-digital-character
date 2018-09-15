import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { LandingModule } from 'redux/modules';

import './style';

const landing = (props: any) => (
	<div className="landing">
		<div>
			<h1 onClick={props.fetchCharacter}>Landing page {props.character}</h1>
			<Link to="/home"><h4>Continue to Potifarfar »</h4></Link>
			<input type="text" value={props.character} onChange={(e: any) => props.updateCharacter(e.target.value)}/>
		</div>
	</div>
);

const mapStateToProps = (state: any) => ({
	character: state.landing.character,
});

const mapStateToDispatch = (dispatch: any) => ({
	fetchCharacter: () => dispatch(LandingModule.fetchCharacter()),
	updateCharacter: (name: string) => dispatch(LandingModule.updateCharacter(name)),
});

export const Landing = connect(mapStateToProps, mapStateToDispatch)(landing);