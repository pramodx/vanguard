import { createAction } from '@ngrx/store';

import { Purchase } from './../entities/models';

export const purchaseCan = createAction(
  '[Vending] Purchase Can',
  (purchase: Purchase) => ({ purchase })
);

export const refillVendingMachine = createAction(
  '[Vending] Refill',
  (cans: number) => ({ cans })
);
