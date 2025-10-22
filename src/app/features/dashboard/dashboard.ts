import { Component, inject, OnInit } from '@angular/core';
//import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { AppRoles } from '../../shared/constants/roles.constants';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { LoginService } from '../../core/services/login.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, /*SidebarComponent,*/ RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  
  //loginService = inject(LoginService);

  role = '';
  isAdmin = false;
  isOwner = false;
  isUser = false;

  ngOnInit(): void {
    
    // Get the current role of the login service
    //this.role = this.loginService.getUserRole() ?? '';
    
    // We use centralized constants for comparisons
    this.isAdmin = this.role === AppRoles.ADMIN;
    this.isOwner = this.role === AppRoles.OWNER;
    this.isUser = this.role === AppRoles.USER;
  }
}
