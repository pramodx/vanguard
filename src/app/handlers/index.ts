import { NotificationTypes, EventTypes } from './../entities/enums';
import { Messages } from './../entities/constants';
import { VendingMachine } from './../entities/models';

export const handlePurchase = (state, purchase) => {
  let message = '';
  const newState: VendingMachine = { ...state };

  // Check if right payment is made to purchase cans
  if (purchase.quantity * state.unitPrice > purchase.amount) {
    message = Messages.ERROR_INSUFFICIENT_PAYMENT;
  }
  // Check for stock availability
  else if (state.cans - purchase.quantity < 0) {
    message = Messages.ERROR_INSUFFICIENT_STOCK;
  }
  // Check if there is sufficient balance to give back change.
  else if (
    state.funds <
    purchase.amount - purchase.quantity * state.unitPrice
  ) {
    message = Messages.ERROR_INSUFFICIENT_BALANCE;
  }

  // Update message if there is an error. Do not update any other state property
  if (message.length) {
    newState.message = message;
    newState.notificationType = NotificationTypes.error;
  } else {
    newState.cans = state.cans - purchase.quantity;
    newState.funds = state.funds + purchase.quantity * state.unitPrice;
    newState.message = Messages.SUCCESSFUL_PURCHASE;
    newState.notificationType = NotificationTypes.success;
    newState.lastEvent = EventTypes.purchase;
  }

  return { ...state, ...newState };
};

export const refill = (state, cans) => {
  const message = '';
  const newState: VendingMachine = { ...state };

  // Update message if there is an error. Do not update any other state property
  if (message.length) {
    newState.message = message;
    newState.notificationType = NotificationTypes.error;
  } else {
    newState.cans = state.cans + cans;
    newState.funds = newState.cans * newState.unitPrice;
    newState.message = Messages.REFILL_SUCCESSFUL;
    newState.notificationType = NotificationTypes.success;
    newState.lastEvent = EventTypes.refill;
  }
  return { ...state, ...newState };
};
