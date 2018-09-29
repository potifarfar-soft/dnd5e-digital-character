export type InventoryAction = { type: 'update-inventory', payload: InventoryState };

export type InventoryItem = {
	id: string;
	weight: number;
};

export type InventoryEntry = {
	item: InventoryItem;
	count: number;
};

export type InventoryState = {
	entries: {
		[x: string]: InventoryEntry;
	};
};

export class InventoryModule {
	public static initialState: InventoryState = {
		entries: {},
	};

	public static reducer(
		state: InventoryState = InventoryModule.initialState,
		action: InventoryAction,
	): InventoryState {
		switch (action.type) {
			case 'update-inventory':
				return {
					...state,
					...action.payload,
				};
			default:
				return state;
		}
	}

	public static updateInventory(inventoryState: InventoryState): InventoryAction {
		return {
			payload: inventoryState,
			type: 'update-inventory',
		};
	}
}
