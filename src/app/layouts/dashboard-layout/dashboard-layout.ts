import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoles } from '../../shared/constants/roles.constant';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})

export class DashboardLayout implements OnInit {

  //loginService = inject(LoginService);

  role = '';
  isAdmin = false;
  isOwner = false;
  isUser = false;

  ngOnInit() {
    // Get the current role of the login service
    //this.role = this.loginService.getUserRole() ?? '';

    // We use centralized constants for comparisons
    this.isAdmin = this.role === AppRoles.ADMIN;
    this.isOwner = this.role === AppRoles.OWNER;
    this.isUser = this.role === AppRoles.USER;
  }
}
