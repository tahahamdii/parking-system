import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkingSpotComponent } from './add-parking-spot.component';

describe('AddParkingSpotComponent', () => {
  let component: AddParkingSpotComponent;
  let fixture: ComponentFixture<AddParkingSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParkingSpotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddParkingSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
