import * as React from 'react';
import { Input, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { State } from 'redux/store';
import { CharacterInfoModule, CharacterInfoAction, CharacterInfoState } from 'redux/modules';
import './style';

type FormInputName = 'alignment' | 'background' | 'characterName' | 'class' | 'experience' | 'level' | 'playerName' | 'race';

type CharacterInfoRouteProps = {
	characterInfo: CharacterInfoState,
	updateCharacterInfo: (_: CharacterInfoState) => CharacterInfoAction,
};

type CharacterInfoRouteState = {
	characterInfo: CharacterInfoState,

	edit: boolean,
};

class CharacterInfoRoute extends React.Component<CharacterInfoRouteProps, CharacterInfoRouteState> {
	constructor(props: CharacterInfoRouteProps) {
		super(props);
		const { characterInfo } = this.props;
		// init state with values form redux.
		this.state = {
			characterInfo,
			edit: false,
		};
	}

	public render() {
		return (
			<div className="character-info">
				<Form>
					<div className="two-columns">
						{this.renderInput('characterName')}
						{this.renderInput('playerName')}
						{this.renderInput('race')}
						{this.renderInput('alignment')}
						{this.renderInput('background')}
						{this.renderInput('experience', { type: 'number', min: 0 })}
						{this.renderInput('class')}
						{this.renderInput('level', { type: 'number', min: 0, max: 100 })}
					</div>
				</Form>
				<div>
					{this.state.edit || <Button color="blue" onClick={this.toggleEdit}>Edit</Button>}
					{this.state.edit && <Button color="green" onClick={this.handleSave}>Save</Button>}
					{this.state.edit && <Button color="red" onClick={this.handleCancel}>Cancel</Button>}
				</div>
			</div>
		);
	}

	private renderInput = (name: FormInputName, props?: any) => (
		<Form.Field disabled={!this.state.edit}>
			<label>{name}</label>
			<Input
				name={name}
				value={this.state.characterInfo[name]}
				onChange={this.handleChange}
				{...props}
			/>
		</Form.Field>
	)

	private handleChange = (_: any, { name, value, type }: { name: FormInputName, value: string, type: string}) => {
		this.setState({
			characterInfo: {
				[name]: type === 'number' ? parseInt(value, 10) : value,
			},
		} as any);
	}

	private toggleEdit = () => this.setState({ edit: !this.state.edit });

	private handleCancel = () => {
		const { characterInfo } = this.props;
		// init state with values form redux.
		const state = {
			characterInfo,
			edit: false,
		};
		this.setState(state);
	}

	private handleSave = () => {
		const { characterInfo } = this.state;
		this.props.updateCharacterInfo(characterInfo);
		this.setState({ edit: false });
	}
}

const mapStateToProps = (state: State) => ({
	characterInfo: state.characterInfo,
});

const mapStateToDispatch = (dispatch: any) => ({
	updateCharacterInfo: (characterInfo: CharacterInfoState) => dispatch(CharacterInfoModule.updateCharacterInfo(characterInfo)),
});

export const CharacterInfo = connect(mapStateToProps, mapStateToDispatch)(CharacterInfoRoute);
