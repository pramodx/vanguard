import * as fromReducer from './index';
import * as fromActions from './../actions/vending.actions';
import { Messages } from './../entities/constants';

describe('VendingReducer', () => {
  describe('state checks', () => {
    beforeEach(() => {});
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.vendingReducer(initialState, action);

      expect(state).toBe(initialState);
    });

    it('should update funds on can purchase', () => {
      const { initialState } = fromReducer;
      const action = fromActions.purchaseCan({ quantity: 1, amount: 2 });

      const funds = initialState.funds;

      const state = fromReducer.vendingReducer(initialState, action);

      expect(state.funds).toBe(funds + 1.2);
    });

    it('should update message if sufficient payment is not made', () => {
      const { initialState } = fromReducer;
      const action = fromActions.purchaseCan({ quantity: 1, amount: 1 });

      const state = fromReducer.vendingReducer(initialState, action);

      expect(state.message).toBe(Messages.ERROR_INSUFFICIENT_PAYMENT);
    });

    it('should update message if cans are out of stock payment is not made', () => {
      const { initialState } = fromReducer;
      const action = fromActions.purchaseCan({ quantity: 2, amount: 2.4 });

      const state = fromReducer.vendingReducer(initialState, action);

      expect(state.message).toBe(Messages.ERROR_INSUFFICIENT_STOCK);
    });

    it('should update stock of cans on refill', () => {
      const { initialState } = fromReducer;
      const action = fromActions.refillVendingMachine(10);

      const state = fromReducer.vendingReducer(initialState, action);

      const cans = initialState.cans;

      expect(state.cans).toBe(cans + 10);
    });

    it('should return correct change on purchase', () => {
      const { initialState } = fromReducer;
      const action = fromActions.purchaseCan({ quantity: 1, amount: 2 });

      const state = fromReducer.vendingReducer(initialState, action);

      const cans = initialState.cans;

      expect(action.purchase.amount - action.purchase.quantity * 1.2).toBe(0.8);
    });
  });
});
