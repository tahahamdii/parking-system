import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: MasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // Submit the form
  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    // Call AuthService to authenticate the user
    this.authService.login(email, password).subscribe(
      (response: any) => {
        if (response.status === 200 && response.token) {
          // Save token in localStorage
          localStorage.setItem('authToken', response.token);

          // Redirect to home or dashboard
          alert('Login successful');
          this.router.navigate(['/parking-lot']);
        } else {
          this.errorMessage = response.message || 'Authentication failed';
        }
      },
      (error) => {
        this.errorMessage = error.message || 'Something went wrong';
      }
    );
  }
}