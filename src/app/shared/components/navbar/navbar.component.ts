import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, NgOptimizedImage, ButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
    host: {
    class: '[&_.p-button_.p-button-label]:font-bold'
  }
})
export class NavbarComponent {
 constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
