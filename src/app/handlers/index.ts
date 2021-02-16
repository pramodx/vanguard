import { Messages } from './../entities/constants';
import { VendingMachine } from './../entities/models';

export const handlePurchase = (state, purchase) => {
  let error = '';
  const newState: VendingMachine = { ...state };

  error =
    state.cans - purchase.quantity < 0
      ? (error = Messages.ERROR_INSUFFICIENT_STOCK)
      : '';

  if (error.length) {
    newState.error = error;
  } else {
    newState.cans = state.cans - purchase.quantity;
    newState.error = '';
  }

  return { ...state, ...newState };
};

export const refill = (state, cans) => {
  const error = '';
  const newState: VendingMachine = { ...state };

  if (error.length) {
    newState.error = error;
  } else {
    newState.cans = state.cans + cans;
    newState.error = '';
  }
  return { ...state, ...newState };
};
