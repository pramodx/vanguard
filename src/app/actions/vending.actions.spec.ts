import * as fromVending from './vending.actions';
import { Purchase } from './../entities/models';
describe('loadVendings', () => {
  it('should return an action', () => {
    expect(fromVending.purchaseCan({}).type).toBe('[Vending] Purchase Can');
  });
});
