import * as React from 'react';
import { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Equipment } from './5e-equipment';

const columnsStyle = {
	display: 'grid',
	gap: '30px',
	gridTemplateColumns: 'repeat(3, 33.33%)',
};

export class EqTest extends Component {
	public render() {
		return  (
			<Container>
				<h1>Equipment test page</h1>
				<div style={columnsStyle}>
					{this.renderEqTypes()}
					{this.renderWeapons()}
					{this.renderLongSword()}
				</div>
			</Container>
		);
	}

	private renderEqTypes = () => {
		const types = Equipment.getEquipmentTypeList();
		return (
			<div>
				<h3>Equipment types</h3>
				<ul>
					{types.map(type => <li>{type}</li>)}
				</ul>
			</div>
		);
	}

	private renderWeapons = () => {
		const weapons = Equipment.getEquipmentList('Weapon');
		return (
			<div>
				<h3>Weapons</h3>
				<ul>
					{weapons.map(weapon => <li>{weapon}</li>)}
				</ul>
			</div>
		);
	}

	private renderLongSword = () => {
		const longSword = new Equipment();
		longSword.getEquipment('Longsword');
		return (
			<div>
				<h3>Long sword</h3>
				<pre style={{ fontSize: '90%' }}>
					{JSON.stringify(longSword, null, 2)}
				</pre>
			</div>
		);
	}
}
