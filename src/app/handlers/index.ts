import { NotificationTypes, EventTypes } from './../entities/enums';
import { Messages } from './../entities/constants';
import { VendingMachine } from './../entities/models';

export const handlePurchase = (model: VendingMachine, purchase) => {
  let message = '';
  const newModel: VendingMachine = { ...model };

  // Check if right payment is made to purchase cans
  if (purchase.quantity * model.unitPrice > purchase.amount) {
    message = Messages.ERROR_INSUFFICIENT_PAYMENT;
  }
  // Check for stock availability
  else if (model.cans - purchase.quantity < 0) {
    message = Messages.ERROR_INSUFFICIENT_STOCK;
  }
  // Check if there is sufficient balance to give back change.
  else if (
    model.funds <
    purchase.amount - purchase.quantity * model.unitPrice
  ) {
    message = Messages.ERROR_INSUFFICIENT_BALANCE;
  }

  // Update message if there is an error. Do not update any other state property
  if (message.length) {
    newModel.message = message;
    newModel.notificationType = NotificationTypes.error;
  } else {
    newModel.cans = model.cans - purchase.quantity;
    newModel.funds = model.funds + purchase.quantity * model.unitPrice;
    newModel.message = Messages.SUCCESSFUL_PURCHASE;
    newModel.notificationType = NotificationTypes.success;
  }

  return newModel;
};

export const refill = (model, cans) => {
  const message = '';
  const newModel: VendingMachine = { ...model };

  // Update message if there is an error. Do not update any other state property
  if (message.length) {
    newModel.message = message;
    newModel.notificationType = NotificationTypes.error;
  } else {
    newModel.cans = model.cans + cans;
    newModel.funds = newModel.cans * newModel.unitPrice;
    newModel.message = Messages.REFILL_SUCCESSFUL;
    newModel.notificationType = NotificationTypes.success;
  }
  return newModel;
};
