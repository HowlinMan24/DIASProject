import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/routes/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.success) {
          // Navigate to dashboard or any protected route
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials!');
        }
      },
      error => {
        console.error('Login failed', error);
        alert('An error occurred!');
      }
    );
  }
}
