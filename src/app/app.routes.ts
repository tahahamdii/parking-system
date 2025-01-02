import { Routes } from '@angular/router';
import { ParkingComponent } from './pages/parking/parking.component';
import { ParkingLotComponent } from './pages/parking-lot/parking-lot.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddParkingSpotComponent } from './pages/add-parking-spot/add-parking-spot.component';
import { ParkCarComponent } from './pages/park-car/park-car.component';
import { ParkedVehiclesComponent } from './pages/parked-vehicles/parked-vehicles.component';
import { ExitVehiclesComponent } from './pages/exit-vehicles/exit-vehicles.component';
import { AuthGuard } from './guards/auth.guard'; // Import the guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'parking-lot',
    pathMatch: 'full',
  },
  
  {
    path: 'parking-lot',
    component: ParkingLotComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add-parking-spot',
    component: AddParkingSpotComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: 'park-car',
    component: ParkCarComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: 'parked-cars',
    component: ParkedVehiclesComponent,
    canActivate: [AuthGuard], // Protect this route
  },
  {
    path: 'exit',
    component: ExitVehiclesComponent,
    canActivate: [AuthGuard], // Protect this route
  },
];
