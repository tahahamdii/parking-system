import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { ParkingSpot } from '../models/ParkingSpot';
import { Vehicle } from '../models/Vehicle';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-park-car',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './park-car.component.html',
  styleUrl: './park-car.component.css'
})
export class ParkCarComponent implements OnInit {
  private idCounter: number = 6;

  parkCarForm!: FormGroup;
  parkingSpots: ParkingSpot[] = [];
  vehicleTypes: string[] = ['CAR', 'MOTORCYCLE', 'TRUCK']; // Add more vehicle types if needed
  token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWhhYUBoYW1kaS5jb20iLCJpYXQiOjE3MzU4MzczMDYsImV4cCI6MTczNjQ4NTMwNn0.5vSarrpeKjfbHXlNNDtLSsiwoIQqGFpIPE-WrJObpzs'

  constructor(
    private fb: FormBuilder,
    private parkingSpotService: MasterService,
    private vehicleService: MasterService,
    private router: Router

  ) { }

  ngOnInit(): void {
    // Fetch available parking spots
    this.parkingSpotService.getAvailableParkingSpots(this.token).subscribe(spots => {
      this.parkingSpots = spots;
    });

    // Initialize the form
    this.parkCarForm = this.fb.group({
      id: this.idCounter, // Set the initial ID from idCounter

      licensePlate: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+')]],
      vehicleType: ['', Validators.required],
      entryTime: ['', Validators.required],
      exitTime: ['', Validators.required],
      assignedSpot: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.parkCarForm.valid) {
      const formValue = this.parkCarForm.value;

      // Prepare the vehicle data
      const vehicleData: Vehicle = {
        id: this.idCounter, // Set the initial ID from idCounter
        licensePlate: formValue.licensePlate,
        vehicleType: formValue.vehicleType,
        entryTime: formValue.entryTime,
        exitTime: formValue.exitTime,
        assignedSpot: {
          spotId: formValue.assignedSpot // Only send the spotId
        }
      };

      // Call the vehicle service to register the vehicle
      this.vehicleService.registerVehicle(vehicleData, this.token).subscribe(response => {
        console.log('Vehicle parked:', response);
        alert('Car Parked successfully!');
        this.router.navigate(['/parking-lot']);

      }, error => {
        console.error('Error parking vehicle:', error);
        console.log(vehicleData);
      });
    }
  }
}