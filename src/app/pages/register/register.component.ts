import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ADMIN', Validators.required]  // Default role as ADMIN
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  // On submit
  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const userData = {
      name: this.f['name'].value,  // Accessing with ['name']
      email: this.f['email'].value,
      password: this.f['password'].value,
      role: this.f['role'].value
    };

    // const token = 'your_token_here';  // Replace with the actual token

    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`,
    // });

    // Send POST request to register user
    this.http.post('http://localhost:8080/auth/register', userData)
      .subscribe({
        next: (response) => {
          if (response) {
            // On success, redirect to login page
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
  }
}