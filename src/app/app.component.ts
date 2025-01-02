import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'car_parking_angular_17_local-storage';

  constructor(public router: Router) {}



  shouldShowSidebar(): boolean {
    // Return true if the current route is NOT login or register
    return !['/login', '/register'].includes(this.router.url);
  }
  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if no token
    }
  }
}
