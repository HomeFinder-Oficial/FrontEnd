import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  @Input() isCollapsed = false;
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  menuItems = [
    {
      icon: 'pi pi-star-fill',
      label: 'Publicaciones',
      route: '/publicaciones',
      active: false,
    },
    {
      icon: 'pi pi-user',
      label: 'Usuarios',
      route: '/usuarios',
      active: true,
    },
    {
      icon: 'pi pi-cog',
      label: 'Configuración',
      route: '/settings',
      active: false,
    },
  ];

  userInfo = {
    name: 'Juan Hoyos',
    role: 'Administrador',
    avatar: '../../../../assets/fotos/avatar.png',
  };

  getSidebarClasses(): string {
    return this.isCollapsed ? 'w-16' : 'w-64';
  }

  getMenuItemClasses(item: any): string {
    const baseClasses = 'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200';
    return item.active 
      ? `${baseClasses} bg-violet-400 text-gray-600`
      : `${baseClasses} text-gray-600 hover:bg-gray-50 hover:text-gray-900`;
  }

  toggleSidebar(): void {
    this.toggleSidebarEvent.emit();
  }

  setActiveItem(item: any): void {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
  }
}
