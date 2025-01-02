import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-parking-spot',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-parking-spot.component.html',
  styleUrl: './add-parking-spot.component.css'
})
export class AddParkingSpotComponent {

  private idCounter: number = 6;

  parkingSpot = {
    id: this.idCounter, // Set the initial ID from idCounter
    spotId: '',
    spotSize: 'SMALL',
    isOccupied: false,  // Default to false
    currentVehicle: {
      id: null,
      licensePlate: null,
      vehicleType: null,
      entryTime: new Date().toISOString(),
      exitTime: new Date().toISOString(),
      assignedSpot: null
    },
    spotStatus: 'EMPTY'
  };

  constructor(private parkingSpotService: MasterService, private router: Router) {}

  addParkingSpot() {
    this.parkingSpot.id = this.idCounter++;

    const token = localStorage.getItem('authToken');

    if (!token) {
      // Handle the case where the token is not found
      console.error('Token not found. Please log in.');
      return;
    }    
    this.parkingSpotService.addParkingSpot(this.parkingSpot, token)
      .subscribe({
        next: (response) => {
          console.log('Parking spot added successfully', response);
          alert('Parking spot added successfully!');
          this.router.navigate(['/parking-lot']);
        },
        error: (err) => {
          console.error('Error adding parking spot:', err);
          alert('Failed to add parking spot');
          console.log(this.parkingSpot);
        }
      });
  }
}