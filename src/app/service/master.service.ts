import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Vehicle } from '../pages/models/Vehicle';
import { ParkingSpot } from '../pages/models/ParkingSpot';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/ParkingSpotBooking/';

  constructor(private http:HttpClient) { }

  getAllParkingLots() {
    return this.http.get(`${this.apiUrl}GetAllParkingLots`)
  }

  bookSpot(obj: any) {
    return this.http.post(`${this.apiUrl}bookSpot`,obj)
  }

  releaseSpot(obj: any) {
    return this.http.put(`${this.apiUrl}ReleaseSpot`,obj)
  }

  getActiveParkingByParkingLotId(parkingLotId: number) {
    return this.http.get(`${this.apiUrl}GetActiveParkingByPrakingLotId?parkingLotId=${parkingLotId}`)
  }


  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('http://localhost:8080/auth/login', loginData, { headers });
  }


  private baseUrl = 'http://localhost:8080/parkingSpot/add'; // API endpoint


  addParkingSpot(spotData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(this.baseUrl, spotData, { headers });
  }

  private apiUrl2 = 'http://localhost:8080/management/parkingSpotsStat'; // API URL


  getParkingSpotStats(token : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add the token to the Authorization header
    });
    return this.http.get<any>(this.apiUrl2, { headers });
  }

  deleteParkingSpot(spotId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`http://localhost:8080/parkingSpot/delete/${spotId}`, { headers });
  }

  /// IOT RELATION
  private apiUrl3 = 'http://localhost:8080/parkingLot/registerVehicle'
  registerVehicle(vehicle: Vehicle, token : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add the token to the Authorization header
    });
    return this.http.post<any>(this.apiUrl3, vehicle,{headers});
  }


  getAvailableParkingSpots(token : string): Observable<ParkingSpot[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add the token to the Authorization header
    });
    return this.http.get<any>(this.apiUrl2, {headers}).pipe(
      map(response => response.parkingSpotDtoList.filter((spot: { isOccupied: any; }) => !spot.isOccupied))
    );
  }
}
