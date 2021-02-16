export class VendingMachine {
  funds: number; // money remaining in the vending machine
  unitPrice: number; // price of one can
  cans: number; // number of cans in stock
  error: string; // Capture errors if any
}

export class Purchase {
  amount?: number; // amount paid by customer
  quantity?: number; // number of cans ordered
}
