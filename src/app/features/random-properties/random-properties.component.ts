import { Component, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { PropertiesService } from '../../core/services/properties/properties.service';
import { Property } from '../../shared/interfaces/property.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button'; // 1. Import the module of PrimeNG
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  selector: 'app-random-properties',
  imports: [CommonModule, SlicePipe, RouterLink, ButtonModule, CardModule], // 2. Add it to the imports array
  templateUrl: './random-properties.component.html',
  styleUrl: './random-properties.component.css'
})

export class RandomPropertiesComponent implements OnInit {
  properties: Property[] = [];

  constructor(
    private propertyService: PropertiesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.loadRandomProperties();
    });
  }

  loadRandomProperties() {
    this.propertyService.getRandomProperties(3).subscribe({
      next: (data: Property[]) => this.properties = data,
      error: (err: any) => console.error('Error cargando propiedades aleatorias', err)
    });
  }
}
