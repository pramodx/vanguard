import * as fromVending from './vending.actions';

describe('loadVendings', () => {
  it('should return an action', () => {
    expect(fromVending.loadVendings().type).toBe('[Vending] Load Vendings');
  });
});
