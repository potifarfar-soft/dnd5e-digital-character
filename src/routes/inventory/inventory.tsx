import * as React from 'react';

import * as Redux from 'react-redux';

import { InventoryModule } from 'redux/modules';

import './style';

interface State {
	inventoryInfo: any;
}

interface Props {
	inventoryInfo: any;
}

class InventoryRoute extends React.Component<Props, State> {

	public static mapStateToProps = (state: State) => ({
		inventoryInfo: state.inventoryInfo,
	})

	public static mapStateToDispatch = (dispatch: any) => ({
		updateCharacterInfo: (inventoryInfo: any) => dispatch(InventoryModule.updateInventory(inventoryInfo)),
	})

	public render() {
		return (
			<div className="inventory">

			</div>
		);
	}

}

export const Inventory = Redux.connect(
	InventoryRoute.mapStateToProps,
	InventoryRoute.mapStateToDispatch,
)(InventoryRoute);