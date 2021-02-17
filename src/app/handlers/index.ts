import { Messages } from './../entities/constants';
import { VendingMachine } from './../entities/models';

export const handlePurchase = (state, purchase) => {
  let message = '';
  const newState: VendingMachine = { ...state };

  // Check for stock availability
  if (state.cans - purchase.quantity < 0) {
    message = Messages.ERROR_INSUFFICIENT_STOCK;
  }
  // Check if right payment is made to purchase cans
  else if (state.cans * state.unitPrice < purchase.amount) {
    message = Messages.ERROR_INSUFFICIENT_PAYMENT;
  }
  // Check if there is sufficient balance to give back change.
  else if (
    state.funds <
    purchase.amount - purchase.quantity * state.unitPrice
  ) {
    message = Messages.ERROR_INSUFFICIENT_BALANCE;
  }

  if (message.length) {
    newState.message = message;
  } else {
    newState.cans = state.cans - purchase.quantity;
    newState.message = '';
  }

  return { ...state, ...newState };
};

export const refill = (state, cans) => {
  const message = '';
  const newState: VendingMachine = { ...state };

  if (message.length) {
    newState.message = message;
  } else {
    newState.cans = state.cans + cans;
    newState.message = '';
  }
  return { ...state, ...newState };
};
