import { Action, createReducer, on } from '@ngrx/store';

import * as VendingActions from './../actions/vending.actions';
import { VendingMachine } from './../entities/models';
import * as Handlers from './../handlers';
export const vendingSelectorKey = 'vending';

export interface State {
  model: VendingMachine;
}

export const initialState: State = {
  model: { cans: 1, unitPrice: 1.2, funds: 1.2 },
};
// export const initialState = initialiseState();
// console.log('i', initialState);

export const vendingReducer = createReducer(
  initialState,
  on(VendingActions.vendingMachineInit, (state, action) => {
    return { ...state };
  }),
  on(VendingActions.purchaseCan, (state, { purchase }) => {
    const updatedModel = Handlers.handlePurchase(state.model, purchase);
    return Object.assign({}, state, {
      model: updatedModel,
    });
  }),
  on(VendingActions.refillVendingMachine, (state, { cans }) => {
    const updatedModel = Handlers.refill(state.model, cans);
    return Object.assign({}, state, {
      model: updatedModel,
    });
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return vendingReducer(state, action);
}

export const selectInit = (state: State) => state.model;
export const selectFunds = (state: State) => state.model.funds;
export const selectCans = (state: State) => state.model.cans;
export const selectUnitPrice = (state: State) => state.model.unitPrice;
