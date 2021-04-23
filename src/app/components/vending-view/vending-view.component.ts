import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  State,
  selectCans,
  selectUnitPrice,
  selectFunds,
} from './../../shared';
import { VendingMachine, Purchase } from './../../entities/models';
import * as VendingActions from './../../actions/vending.actions';
import { NotificationTypes, EventTypes } from './../../entities/enums';

@Component({
  selector: 'app-vending-view',
  templateUrl: './vending-view.component.html',
  styleUrls: ['./vending-view.component.scss'],
})
export class VendingViewComponent implements OnInit {
  funds$: Observable<number>;
  cans: Array<number>;
  cans$: Observable<number>;
  unitPrice$: Observable<number>;

  vmPurchaseModel: Purchase;
  vmRefillModel: number;

  // for the notification popup
  notificationHidden = true;

  // state handler
  vendingMachine: VendingMachine;

  constructor(private store: Store<State>) {
    this.funds$ = store.select(selectFunds);
    this.unitPrice$ = store.select(selectUnitPrice);
    store.select(selectCans).subscribe((num) => (this.cans = new Array(num)));

    this.vmPurchaseModel = {
      amount: 0,
      quantity: 0,
    };
    this.vmRefillModel = 0;
  }

  ngOnInit(): void {
    this.store.dispatch(VendingActions.vendingMachineInit());
  }

  toggleNotification(): void {
    this.notificationHidden = false;
    setTimeout(() => (this.notificationHidden = true), 2000);
  }

  // Dispatch purchase
  onSubmitPurchase(): void {
    this.store.dispatch(VendingActions.purchaseCan(this.vmPurchaseModel));
  }

  // Dispatch refill action
  onRefill(): void {
    this.store.dispatch(
      VendingActions.refillVendingMachine(this.vmRefillModel)
    );
    // this.refillQty = 1;
  }
}
