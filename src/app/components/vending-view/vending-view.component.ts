import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// import { Vending } from './../../entities';
// import { VendingState } from './../../reducers';
import { VendingMachine } from './../../entities/models';
import * as VendingActions from './../../actions/vending.actions';

@Component({
  selector: 'app-vending-view',
  templateUrl: './vending-view.component.html',
  styleUrls: ['./vending-view.component.scss'],
})
export class VendingViewComponent implements OnInit {
  vm$: Observable<VendingMachine>;
  VendingSubscription: Subscription;

  vendingMachine: VendingMachine;

  constructor(private store: Store<{ vm: VendingMachine }>) {
    // console.log(this.store);
    this.vm$ = this.store.pipe(select('vm'));
    // console.log(this.cans$);
  }

  ngOnInit(): void {
    this.VendingSubscription = this.vm$
      .pipe(
        map((x) => {
          this.vendingMachine = x;
        })
      )
      .subscribe();
  }

  counter(i): number[] {
    return new Array(i);
  }

  purchase(n): void {
    this.store.dispatch(VendingActions.purchaseCan({ quantity: 1 }));
  }

  refill(n): void {
    this.store.dispatch(VendingActions.refillVendingMachine(6));
  }
}
