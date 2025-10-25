import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { NavbarComponent } from './shared/components/navbar/navbar.component';
//import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-root',
  // Imports FontAwesomeModule (only if you use <fa-icon> in app.html)
  imports: [CommonModule, RouterOutlet, /*NavbarComponent, FooterComponent,*/ FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  protected readonly title = signal('FrontEnd');

  constructor() {}
}
