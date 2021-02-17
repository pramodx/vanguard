export class VendingMachine {
  funds: number; // money remaining in the vending machine
  unitPrice: number; // price of one can
  cans: number; // number of cans in stock
  message?: string; // Capture success msgs/errors if any
  notificationType?: number; // Success/Failure
  lastEvent?: number;
}

export class Purchase {
  amount?: number; // amount paid by customer
  quantity?: number; // number of cans ordered
}
