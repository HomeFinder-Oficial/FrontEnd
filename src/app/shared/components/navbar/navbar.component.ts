import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, NgOptimizedImage, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
    host: {
    class: '[&_.p-button_.p-button-label]:font-bold'
  }
})
export class NavbarComponent {

}
