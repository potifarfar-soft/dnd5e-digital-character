import * as React from 'react';
import { Input, Button } from 'semantic-ui-react';
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
				<table>
					<tr>
						<td>Player name</td>
						<td colSpan={3}>{this.renderInput('playerName')}</td>
					</tr>
					<tr>
						<td>Character name</td>
						<td colSpan={3}>{this.renderInput('characterName')}</td>
					</tr>
					<tr>
						<td>Race</td>
						<td>{this.renderInput('race')}</td>
						<td>Background</td>
						<td>{this.renderInput('background')}</td>
					</tr>
					<tr>
						<td>Alignment</td>
						<td>{this.renderInput('alignment')}</td>
					</tr>
					<tr>
						<td>Experience</td>
						<td>{this.renderInput('experience', { type: 'number', min: 0 })}</td>
					</tr>
					<tr>
						<td>Class</td>
						<td>{this.renderInput('class')}</td>
						<td>Level</td>
						<td>{this.renderInput('level', { type: 'number', min: 0, max: 100 })}</td>
					</tr>
				</table>
				<div>
					{this.state.edit || <Button color="blue" onClick={this.toggleEdit}>Edit</Button>}
					{this.state.edit && <Button color="green" onClick={this.handleSave}>Save</Button>}
					{this.state.edit && <Button color="red" onClick={this.handleCancel}>Cancel</Button>}
				</div>
			</div>
		);
	}

	private renderInput = (name: FormInputName, props?: any) => (
		<Input
			name={name}
			disabled={!this.state.edit}
			value={this.state.characterInfo[name]}
			onChange={this.handleChange}
			{...props}
		/>
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
