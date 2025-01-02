import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-exit-vehicles',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './exit-vehicles.component.html',
  styleUrl: './exit-vehicles.component.css'
})
export class ExitVehiclesComponent implements OnInit {
  parkedVehicles: any[] = [];  // List to store parked vehicles
  selectedVehicleId: string = '';  // Store selected vehicle ID

  constructor(private http: HttpClient, router: Router) {}

  ngOnInit(): void {
    this.fetchParkedVehicles();
  }

  // Fetch parked vehicles from the API
  fetchParkedVehicles(): void {
    const token = localStorage.getItem('authToken');

    if (!token) {
      // Handle the case where the token is not found
      console.error('Token not found. Please log in.');
      return;
    }    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    this.http.get<{ status: number, message: string, vehicleDtoList: any[] }>('http://localhost:8080/reports/parkedVehicles', { headers })
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.parkedVehicles = response.vehicleDtoList;
        } else {
          console.error('Failed to fetch parked vehicles', response.message);
        }
      });
  }

  // Call the registerVehicleExit API when the exit button is clicked
  registerExit(): void {
    if (!this.selectedVehicleId) {
      console.error('No vehicle selected');
      return;
    }

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWhhYUBoYW1kaS5jb20iLCJpYXQiOjE3MzU4MzczMDYsImV4cCI6MTczNjQ4NTMwNn0.5vSarrpeKjfbHXlNNDtLSsiwoIQqGFpIPE-WrJObpzs';  // Replace with the actual token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    // Make API call to register vehicle exit
    this.http.post(`http://localhost:8080/parkingLot/registerVehicleExit/${this.selectedVehicleId}`, {}, { headers })
      .subscribe((response: any) => {
        if (response && response.status === 200) {
          console.log('Vehicle exit registered successfully');
          alert('Vehicle exit registered successfully');
          // this.router.navigate(['/parked-vehicles']);
        } else {
          console.error('Failed to register vehicle exit', response.message);
        }
      });
  }
}