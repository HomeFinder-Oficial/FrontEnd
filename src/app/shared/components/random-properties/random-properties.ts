import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesService } from '../../../core/services/properties/properties.service';
import { Property } from '../../interfaces/property.interface';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button'; // 1. Import the module of PrimeNG
import { CardModule } from 'primeng/card';
import { HttpErrorResponse } from '@angular/common/http';
// Deleted import for SlicePipe

@Component({
  standalone: true,
  selector: 'app-random-properties',
  imports: [CommonModule, RouterLink, ButtonModule, CardModule], // 2. Add it to the imports array
  templateUrl: './random-properties.html',
  styleUrl: './random-properties.css'
})

export class RandomPropertiesComponent implements OnInit {
  
  properties: Property[] = [];
  public isLoading = true;
  public errorLoading = false;

  private propertyService = inject(PropertiesService);

  constructor() {}

  ngOnInit(): void {
    this.loadRandomProperties();
  }

  loadRandomProperties() {
    this.isLoading = true;
    this.errorLoading = false;
    
    this.propertyService.getRandomProperties(3).subscribe({
      next: (data: Property[]) => {
        this.properties = data;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => { // Handle error response improved
        console.error('Error loading random properties', err);
        this.isLoading = false;
        this.errorLoading = true;
      }
    });
  }
}
