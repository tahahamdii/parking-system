import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-parked-vehicles',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './parked-vehicles.component.html',
  styleUrl: './parked-vehicles.component.css'
})
export class ParkedVehiclesComponent {
  parkedVehicles: any[] = [];  // To store the fetched vehicles

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchParkedVehicles();
  }

  // Method to fetch the parked vehicles
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
      .subscribe(response => {
        if (response.status === 200) {
          this.parkedVehicles = response.vehicleDtoList;
        } else {
          console.error('Failed to fetch parked vehicles', response.message);
        }
      });
  }
}