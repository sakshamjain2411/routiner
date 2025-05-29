import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeToActionComponent } from './swipe-to-action.component';

describe('SwipeToActionComponent', () => {
  let component: SwipeToActionComponent;
  let fixture: ComponentFixture<SwipeToActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwipeToActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipeToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
