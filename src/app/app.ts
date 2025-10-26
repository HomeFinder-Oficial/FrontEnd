import { Component, signal } from '@angular/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('FrontEnd');

  constructor() {}
}
