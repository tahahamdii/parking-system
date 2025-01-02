import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkedVehiclesComponent } from './parked-vehicles.component';

describe('ParkedVehiclesComponent', () => {
  let component: ParkedVehiclesComponent;
  let fixture: ComponentFixture<ParkedVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkedVehiclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkedVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
