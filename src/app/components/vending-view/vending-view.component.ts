import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { VendingMachine } from './../../entities/models';
import * as VendingActions from './../../actions/vending.actions';
import { NotificationTypes, EventTypes } from './../../entities/enums';

@Component({
  selector: 'app-vending-view',
  templateUrl: './vending-view.component.html',
  styleUrls: ['./vending-view.component.scss'],
})
export class VendingViewComponent implements OnInit {
  vm$: Observable<VendingMachine>;
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

  constructor(private store: Store<{ vm: VendingMachine }>) {
    this.vm$ = this.store.pipe(select('vm'));
  }

  ngOnInit(): void {
    this.VendingSubscription = this.vm$
      .pipe(
        map((x) => {
          this.vendingMachine = x;

          // update change if successful state update
          this.updateReturnChange(x);

          // show hide notification as required
          if (x && x.message) {
            this.toggleNotification();
          }
        })
      )
      .subscribe();
  }

  // This is a counter just to render the cans based on the number of cans in the state
  counter(i): number[] {
    return new Array(i);
  }

  // Check if its a successful purchase. Then update the return change.
  updateReturnChange(x): void {
    if (
      x &&
      x.message &&
      x.notificationType === NotificationTypes.success &&
      x.lastEvent === EventTypes.purchase
    ) {
      this.returnChange = parseFloat(
        (this.minAmount - this.purchaseQty * x.unitPrice).toFixed(2)
      );
    }
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
