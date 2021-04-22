import {} from './../reducers/index';
import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import * as fromVMReducer from './../reducers';

export interface State {
  vm: fromVMReducer.State;
}

export const selectVMState = (state: State) => state.vm;
export const selectInit = createSelector(
  selectVMState,
  fromVMReducer.selectInit
);
export const selectFunds = createSelector(
  selectVMState,
  fromVMReducer.selectFunds
);
export const selectCans = createSelector(
  selectVMState,
  fromVMReducer.selectCans
);
export const selectUnitPrice = createSelector(
  selectVMState,
  fromVMReducer.selectUnitPrice
);
