import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingViewComponent } from './vending-view.component';

describe('VendingViewComponent', () => {
  let component: VendingViewComponent;
  let fixture: ComponentFixture<VendingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
