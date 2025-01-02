import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitVehiclesComponent } from './exit-vehicles.component';

describe('ExitVehiclesComponent', () => {
  let component: ExitVehiclesComponent;
  let fixture: ComponentFixture<ExitVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitVehiclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExitVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
