import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  State,
  selectCans,
  selectUnitPrice,
  selectFunds,
} from './../../shared';
import { VendingMachine } from './../../entities/models';
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

  VendingSubscription: Subscription;

  // default model values
  purchaseQty = 1;
  minAmount = 1.2;
  refillQty = 1;
  returnChange = 0;

  // for the notification popup
  notificationHidden = true;

  // state handler
  vendingMachine: VendingMachine;

  constructor(private store: Store<State>) {
    this.funds$ = store.select(selectFunds);
    this.unitPrice$ = store.select(selectUnitPrice);
    this.cans$ = store.select(selectCans);
    this.cans$.subscribe((num) => (this.cans = new Array(num)));
  }

  ngOnInit(): void {
    this.store.dispatch(VendingActions.vendingMachineInit());
  }

  toggleNotification(): void {
    this.notificationHidden = false;
    setTimeout(() => (this.notificationHidden = true), 2000);
  }

  // Dispatch purchase
  onSubmitPurchase(f): void {
    this.store.dispatch(VendingActions.purchaseCan(f.form.value));
  }

  // Dispatch refill action
  onSubmitRefill(): void {
    this.store.dispatch(VendingActions.refillVendingMachine(this.refillQty));
    this.refillQty = 1;
  }
}
