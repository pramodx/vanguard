import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { VendingViewComponent } from './vending-view.component';
import { VendingMachine } from './../../entities/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Injector } from '@angular/core';

describe('VendingViewComponent', () => {
  let component: VendingViewComponent;
  let fixture: ComponentFixture<VendingViewComponent>;

  let store: MockStore;
  const initialState = {
    cans: 1,
    unitPrice: 1.2,
    funds: 1.2,
  };

  beforeEach(() => {
    const injector = Injector.create({
      providers: [provideMockStore({ initialState })],
    });
    store = injector.get(MockStore);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendingViewComponent],
      providers: provideMockStore({ initialState }),
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
