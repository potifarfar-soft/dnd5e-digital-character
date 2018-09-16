import * as React from 'react';
import { Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { State } from 'redux/store';
import { AbilityScoreModule, AbilityScoreAction, AbilityScoreState } from 'redux/modules';
import './style';

type Ability = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

type AbilityScoreRouteProps = {
	abilityScores: AbilityScoreState,
	updateAbilityScores: (_: AbilityScoreState) => AbilityScoreAction,
};

type AbilityScoreRouteState = {
	strength: number,
	dexterity: number,
	constitution: number,
	intelligence: number,
	wisdom: number,
	charisma: number,

	edit: boolean,
};

class AbilityScoresRoute extends React.Component<AbilityScoreRouteProps, AbilityScoreRouteState> {
	constructor(props: AbilityScoreRouteProps) {
		super(props);
		const { abilityScores } = this.props;
		// init state with values form redux.
		this.state = {
			...abilityScores,
			edit: false,
		};
	}

	public render() {
		return (
			<div className="ability-scores">
				<table>
					<tr>
						<td></td>
						<td>Ability score</td>
						<td>Modifier</td>
					</tr>
					<tr>
						<td>STR</td>
						<td>{this.renderInput('strength')}</td>
						<td>{this.calcModifier(this.state.strength)}</td>
					</tr>
					<tr>
						<td>DEX</td>
						<td>{this.renderInput('dexterity')}</td>
						<td>{this.calcModifier(this.state.dexterity)}</td>
					</tr>
					<tr>
						<td>CON</td>
						<td>{this.renderInput('constitution')}</td>
						<td>{this.calcModifier(this.state.constitution)}</td>
					</tr>
					<tr>
						<td>INT</td>
						<td>{this.renderInput('intelligence')}</td>
						<td>{this.calcModifier(this.state.intelligence)}</td>
					</tr>
					<tr>
						<td>WIS</td>
						<td>{this.renderInput('wisdom')}</td>
						<td>{this.calcModifier(this.state.wisdom)}</td>
					</tr>
					<tr>
						<td>CHA</td>
						<td>{this.renderInput('charisma')}</td>
						<td>{this.calcModifier(this.state.charisma)}</td>
					</tr>
				</table>
				<div className="button-container">
					{this.state.edit || <Button color="blue" onClick={this.toggleEdit}>Edit</Button>}
					{this.state.edit && <Button color="green" onClick={this.handleSave}>Save</Button>}
					{this.state.edit && <Button color="red" onClick={this.handleCancel}>Cancel</Button>}
				</div>
			</div>
		);
	}

	private renderInput = (name: Ability) => (
		<Input
			name={name}
			disabled={!this.state.edit}
			type="number"
			min="0"
			max="40"
			value={this.state[name]}
			onChange={this.handleChange}
		/>
	)

	private calcModifier = (abilityScore: number) => Math.floor((abilityScore - 10) / 2);

	private handleChange = (_: any, { name, value }: { name: Ability, value: string}) => {
		this.setState({ [name]: parseInt(value, 10) } as any);
	}

	private toggleEdit = () => this.setState({ edit: !this.state.edit });

	private handleCancel = () => {
		const { abilityScores } = this.props;
		// init state with values form redux.
		const state = {
			...abilityScores,
			edit: false,
		};
		this.setState(state);
	}

	private handleSave = () => {
		const { edit, ...abilityScores } = this.state;
		this.props.updateAbilityScores(abilityScores);
		this.setState({ edit: false });
	}
}

const mapStateToProps = (state: State) => ({
	abilityScores: state.abilityScores,
});

const mapStateToDispatch = (dispatch: any) => ({
	updateAbilityScores: (abilityScores: AbilityScoreState) => dispatch(AbilityScoreModule.updateAbilityScores(abilityScores)),
});

export const AbilityScores = connect(mapStateToProps, mapStateToDispatch)(AbilityScoresRoute);
