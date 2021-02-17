import { Action, createReducer, on } from '@ngrx/store';

import * as VendingActions from './../actions/vending.actions';
import { VendingMachine, Purchase } from './../entities/models';
import * as Handlers from './../handlers';
export const vendingSelectorKey = 'vending';

const initialiseState = (): VendingMachine => {
  return {
    cans: 1,
    unitPrice: 1.2,
    funds: 1.2,
  };
};

export const initialState = initialiseState();

export const vendingReducer = createReducer(
  initialState,
  on(VendingActions.purchaseCan, (state, { purchase }) =>
    Handlers.handlePurchase(state, purchase)
  ),
  on(VendingActions.refillVendingMachine, (state, { cans }) =>
    Handlers.refill(state, cans)
  )
);

export function reducer(
  state: VendingMachine | undefined,
  action: Action
): any {
  return vendingReducer(state, action);
}
