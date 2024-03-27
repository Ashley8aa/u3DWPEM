import { Component, inject } from '@angular/core';
import { LandingComponent } from '../landing/landing.component';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LandingComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    private router: Router // Inject the Router service
  ) {}
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
    console.log("Logged out");

  }
}
