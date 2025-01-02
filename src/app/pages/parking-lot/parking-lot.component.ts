import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parking-lot',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './parking-lot.component.html',
  styleUrl: './parking-lot.component.css'
})
export class ParkingLotComponent implements OnInit {
redirectToAddParkingSpot() {
  window.location.href = '/add-parking-spot';
}

parkingSpots: any[] = []; // Store the parking spot data
  totalSpots: number = 0;
  totalOccupied: number = 0;
  totalAvailable: number = 0;

  constructor(private parkingSpotService: MasterService) {}

  ngOnInit(): void {
    this.fetchParkingSpots(); // Fetch data when component initializes
  }

  fetchParkingSpots() {

    const token = localStorage.getItem('authToken');

    if (!token) {
      // Handle the case where the token is not found
      console.error('Token not found. Please log in.');
      return;
    }
    this.parkingSpotService.getParkingSpotStats(token).subscribe({
      next: (response) => {
        this.parkingSpots = response.parkingSpotDtoList;  // Store the fetched parking spots
        this.totalSpots = response.totalElement;  // Total spots
        this.totalOccupied = this.parkingSpots.filter(spot => spot.isOccupied).length;  // Count occupied spots
        this.totalAvailable = this.totalSpots - this.totalOccupied;  // Count available spots
      },
      error: (err) => {
        console.error('Error fetching parking spot data:', err);
      }
    });
  }

  deleteParkingSpot(spotId: number) {
    const token ='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWhhYUBoYW1kaS5jb20iLCJpYXQiOjE3MzU4MzczMDYsImV4cCI6MTczNjQ4NTMwNn0.5vSarrpeKjfbHXlNNDtLSsiwoIQqGFpIPE-WrJObpzs'; // Replace with logic to get a real token
    this.parkingSpotService.deleteParkingSpot(spotId, token)
      .subscribe({
        next: (response) => {
          console.log('Parking spot deleted successfully', response);
          alert('Parking spot deleted successfully!');
          this.fetchParkingSpots(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting parking spot:', err);
          alert('Failed to delete parking spot');
        }
      });
  }

}
