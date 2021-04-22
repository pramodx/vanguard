import { Action, createReducer, on } from '@ngrx/store';

import * as VendingActions from './../actions/vending.actions';
import { VendingMachine } from './../entities/models';
import * as Handlers from './../handlers';
export const vendingSelectorKey = 'vending';

export interface State {
  vm: VendingMachine;
}

const initialiseState = (): VendingMachine => {
  return {
    cans: 1,
    unitPrice: 1.2,
    funds: 1.2,
  };
};

export const initialState: State = {
  vm: { cans: 1, unitPrice: 1.2, funds: 1.2 },
};
// export const initialState = initialiseState();
// console.log('i', initialState);

export const vendingReducer = createReducer(
  initialState,
  on(VendingActions.vendingMachineInit, (state, action) => {
    return { ...state };
  }),
  on(VendingActions.purchaseCan, (state, { purchase }) =>
    Handlers.handlePurchase(state, purchase)
  ),
  on(VendingActions.refillVendingMachine, (state, { cans }) =>
    Handlers.refill(state, cans)
  )
);

export function reducer(state: State | undefined, action: Action): any {
  return vendingReducer(state, action);
}

export const selectInit = (state: State) => state.vm;
export const selectFunds = (state: State) => state.vm.funds;
export const selectCans = (state: State) => state.vm.cans;
export const selectUnitPrice = (state: State) => state.vm.unitPrice;
