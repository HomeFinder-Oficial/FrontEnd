import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { UserSidebar } from '../user-sidebar/user-sidebar';
import { AppRoles } from '../../constants/roles.constants';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, AdminSidebar, UserSidebar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  authService = inject(AuthService);
  appRoles = AppRoles;
}
